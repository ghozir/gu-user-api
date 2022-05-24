const Hashids = require('hashids/cjs');
const hashids = new Hashids();
const crypto = require('crypto');
const dayjs = require('dayjs');
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

const hashEncode = (id) => {
  const hash = hashids.encodeHex(id);
  return hash;
};

const hashDecode = (id) => {
  const decode = hashids.decodeHex(id);
  if (decode === '') {
    return 'error';
  }
  return decode;
};
const dateFormat = (date, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(format);

module.exports = {
  getLastFromURL,
  encrypt,
  decrypt,
  hashDecode,
  getHash,
  hashEncode,
  dateFormat
};
