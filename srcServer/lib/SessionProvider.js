const fs = require('fs');
const {EventEmitter} = require('events');

const chokidar = require('chokidar');

const sessionComparator = require('./sessionsComparator');

class SessionProvider extends EventEmitter {
  constructor(filePath) {
    super();
    this._filePath = filePath;
    this._currentData = [];

    this._watchFileChange();
    this._loadData().then(() => this.emit('initialized'));
  }

  _watchFileChange() {
    chokidar.watch(this._filePath).on('change', async (event, path) => {
      const oldList = this._currentData;
      await this._loadData();
      
      sessionComparator(oldList, this._currentData)
        .forEach(change => this.emit('sessionUpdate', change));
    });
  }

  async getSessions() {
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