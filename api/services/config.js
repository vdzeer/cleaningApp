require('dotenv').config();

class Config {
  getValue(path, defVal = '') {
    return process.env[path] || defVal;
  }
}

module.exports = new Config();
