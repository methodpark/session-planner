const { EventEmitter } = require('events');

const chokidar = require('chokidar');

const sessionComparator = require('./sessionsComparator');
const jsonFileLoader = require('./jsonFileLoader');

class SessionProvider extends EventEmitter {
  constructor(filePath) {
    super();
    this._filePath = filePath;
    this._currentData = [];

    this._installFileWatcher();
    jsonFileLoader.loadJsonFile(this._filePath).then((data) => {
      this.emit('initialized');
      this._currentData = data;
    })
      .catch(console.error);
  }

  _installFileWatcher() {
    chokidar.watch(this._filePath, { usePolling: true, interval: 500 })
      .on('change', () => this._handleFileUpdate())
      .on('error', error => console.error('Chokidar error: ', error));
  }

  async _handleFileUpdate() {
    const oldList = this._currentData;
    await jsonFileLoader.loadJsonFile(this._filePath)
      .then(data => this._currentData = data)
      .catch(console.error);

    sessionComparator(oldList, this._currentData)
      .forEach(change => this.emit('sessionUpdate', change));
  }

  async getSessions() {
    return this._currentData;
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
