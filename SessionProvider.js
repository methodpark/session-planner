const path = require('path');

class SessionProvider {
  constructor(basePath) {
    this._basePath = basePath;
  }

  async getSessions() {
    console.log(path.join(this._basePath, 'sessionsData.json'))
    return require(path.join(this._basePath, 'sessionsData.json'));
  }
}

module.exports = SessionProvider;