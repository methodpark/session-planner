const fs = require('fs');
const webpush = require('web-push');

const KEYS_FILE = "vapid-keys.json";

function writeKeysToFile(filename) {
  const keys = webpush.generateVAPIDKeys();
  fs.writeFileSync(filename, JSON.stringify(keys));
  console.log('Generated keys: ' + JSON.stringify(keys));
  console.log(`Wrote keys to ${filename}.`);
}

fs.access(KEYS_FILE, fs.constants.F_OK, (err) => {
  if (!err) {
    console.log(`'${KEYS_FILE}' exists, won't re-generate keys.`);
    console.log('If you really want to use new keys, manually delete the file.');
    process.exit(0);
  } else {
    writeKeysToFile(KEYS_FILE);
  }
});
