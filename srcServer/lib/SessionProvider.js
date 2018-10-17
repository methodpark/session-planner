const path = require('path');

const fs = require('fs');

const chokidar = require('chokidar');

class SessionProvider {
  constructor(basePath) {
    this._basePath = basePath;
    this._filePath = path.join(this._basePath, 'sessionsData.json');
    this._currentData = null;

    this.watchFileChange();
  }

  watchFileChange() {
    chokidar.watch(this._filePath).on('change', (event, path) => {
      console.log("file changed", event, path);
      this._loadData();
    });
  }

  async getSessions() {
    if (!this._currentData) {
      await this._loadData();
    }

    return this._currentData;
  }

  async _loadData() {
    return new Promise((resolve, reject) => {
      fs.readFile(this._filePath, "utf8", (err, data) => {
        if (err) {
          reject(err);
        }

        try {
          data = JSON.parse(data);
          data = this._validate(data);
          this._currentData = data;

          console.log('successfully file reloaded');

          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    });
  }

  _validate(data) {
    if (!Array.isArray(data)) {
      throw new Error('must be an array');
    }

    if (data.length === 0) {
      throw new Error('can not be empty');
    }

    return data;
  }
}

module.exports = SessionProvider;