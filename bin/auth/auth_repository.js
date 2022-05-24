const config = require('../infra/configs/global_config');
const _ = require('lodash');
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  isValidPassword(password) {
    let checkPass = this.password.find(element => element.password == password);
    return !_.isEmpty(checkPass);
  }
}

module.exports.findByUsername = (username, cb) => {
  const userDatas = config.get('/basicAuthApi');
  let userData;

  userData = userDatas.map((value) => {
    if (value.username === username) {
      return value;
    }
    return '';
  });
  const user = new User(userData[0].username, userData);
  cb(user);
};
