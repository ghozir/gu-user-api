const _ = require('lodash');
const crypto = require('crypto');
const argon2 = require('argon2');
const wrapper = require('../../helpers/utils/wrapper');

const getLastFromURL = async (url) => {
  let name = decodeURI(url).split('/').pop();
  name = name.replace(/(\r\n|\n|\r)/gm, '');
  return String(name);
};

const encrypt = async (text, algorithm, secretKey) => {
  const cipher = crypto.createCipher(algorithm, secretKey);
  let crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
};

const decrypt = async (text, algorithm, secretKey) => {
  const decipher = crypto.createDecipher(algorithm, secretKey);
  let dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
};

const getHash = async (text) => {
  try {
    const hash = await argon2.hash(text).catch((err) => {
      throw err;
    });
    return wrapper.data(hash);

  } catch (error) {
    return wrapper.error(error);
  }
};

const verifyHash = async (argon2Hash, text) => {
  try {
    const result = await argon2.verify(argon2Hash, text).catch((err) => {
      throw err;
    });
    return wrapper.data(result);
  } catch (error) {
    return wrapper.error(error);
  }
};

const setDomain = (payload) => {
  // const patern = new RegExp(/((https)|(http)):\/\/([a-z0-9A-Z]+\.pijarsekolah\.id)/g);
  const patern = new RegExp(/((https)|(http)):\/\/([a-z0-9A-Z-]+\.pijarsekolah\.id)/g);
  if (!_.isEmpty(payload.school.match(patern))) {
    // eslint-disable-next-line no-useless-escape
    let getSubDomain = payload.school.split(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/)[1];
    return getSubDomain.split('-')[0];
  }
  return 'devsekolah';
};

const parseString = (payload) => {
  try {
    const decodeToken = Buffer.from(payload, 'base64').toString('utf-8');
    const process = JSON.parse(decodeToken);
    return wrapper.data(process);
  } catch (error) {
    return wrapper.error(error);
  }
};

module.exports = {
  parseString,
  getLastFromURL,
  encrypt,
  decrypt,
  setDomain,
  getHash,
  verifyHash
};
