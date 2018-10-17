const path = require('path');

class SessionProvider {
  constructor(basePath) {
    this._basePath = basePath;
  }

  async getSessions() {
    return require(path.join(this._basePath, 'sessionsData.json'));
  }
}

module.exports = SessionProvider;