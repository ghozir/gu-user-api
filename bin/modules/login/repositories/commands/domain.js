const Command = require('./command');
const Query = require('../queries/query');
const studentQueryHandler = require('../../../user/repositories/queries/query_handler');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const randomstring = require('randomstring');
const jwtAuth = require('../../../../auth/jwt_auth_helper');
const Unauthorized = require('../../../../helpers/error/unauthorized_error');
const config = require('../../../../infra/configs/global_config');
const common = require('../../../../helpers/utils/common');
const { UnprocessableEntityError, NotFoundError, UnauthorizedError } = require('../../../../helpers/error');
const _ = require('lodash');
const { isArray } = require('validate.js');
const crypto = require('crypto');
const apm = require('elastic-apm-node');
class Teacher {

  constructor (http, redis, config, db, dbMaster) {
    this.command = new Command(http, redis, db);
    this.ctx = 'User::command-domain';
    this.query = new Query(http, redis, config, db, dbMaster);
    this.config = config;
  }

  async login (payload) {
    const queryUser = {
      username: payload.username,
    };
    let user;
    const result = await this.query.findOne(queryUser);
    if (result.err && result.err.code != 404) {
      apm.captureError(result.err);
      logger.error(this.ctx, 'Failed to get user credential', 'login::query.findOne', result.err);
      return wrapper.error(result.err);
    }
    user = result.data;

    // if (_.isEmpty(user)) {
    //   const result = await this.query.findOneAdmin(queryUser);
    //   if (result.err) {
    //     apm.captureError(result.err);
    //     logger.error(this.ctx, 'Failed to get teacher credential', 'login::query.findOneAdmin', result.err);
    //     return wrapper.error(result.err);
    //   }
    //   user = result.data;
    // }

    if (_.isEmpty(user)) {
      return wrapper.error(new NotFoundError('email atau password salah !'));
    }
    
    const checkPassword = await common.verifyHash(user.password, payload.password);

    if (checkPassword.err) {
      apm.captureError(checkPassword.err);
      logger.log('login', 'error', checkPassword.err);
      return wrapper.error(checkPassword);
    }

    if (!checkPassword.data)
      return wrapper.error(new UnauthorizedError('email atau password salah !'));

    const now = Math.floor(Date.now() / 1000);

    const cacheKey = `gu-auth.${user.role}.${user._id}.${now}`;
    const time = payload.remember ? (2 * 24 * 60 * 60) : 7200;
    const cacheResult = await this.command.setCache(cacheKey, user, time);

    if (cacheResult.err) {
      apm.captureError(cacheResult.err);
      logger.error(this.ctx, 'Failed to set user cache', 'login::command.setCache', cacheResult.err);
      return wrapper.error(cacheResult.err);
    }

    const token = await jwtAuth.generateToken(
      { mappedUser: {id: user.id, role: user.role}, sub: cacheKey, iat: now },
      { expiresIn: time }
    );
    return wrapper.data(token);
  }

  async logout (cacheKey) {
    const cacheResult = await this.command.unsetCache(cacheKey);
    if (cacheResult.err) {
      logger.error(this.ctx, 'Failed to unset teacher cache', 'logout::command.unsetCache', cacheResult.err);
      return wrapper.error(cacheResult.err);
    }
    return wrapper.data(null);
  }
}

module.exports = Teacher;
