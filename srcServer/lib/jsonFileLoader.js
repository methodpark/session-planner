const fs = require('fs');

async function loadJsonFile(filePath){
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, data) => {
      console.log(filePath);
      if (err) {
        return reject(err);
      }
      try {
        data = JSON.parse(data);        
        console.log('successfully file reloaded');
        resolve(data);
      }
      catch (e) {
        reject(e);
      }
    });
  });
}

module.exports.loadJsonFile = loadJsonFile;