/* eslint-disable no-console */

const Query = require('../queries/query');
const Command = require('./command');
const wrapper = require('../../../../helpers/utils/wrapper');
const commonUtil = require('../../../../helpers/utils/common');
const logger = require('../../../../helpers/utils/logger');
const config = require('../../../../infra/configs/global_config');
const { ConflictError, ForbiddenError, NotFoundError, InternalServerError, UnprocessableEntityError } = require('../../../../helpers/error');
const uuidv4 = require('uuid/v4');
const moment = require('moment');
const _ = require('lodash');

class User {

  constructor (http, redis, db, dbMaster) {
    this.command = new Command(http, redis, db, dbMaster);
    this.query = new Query(http, redis, db, dbMaster);
    this.ctx = 'User::command-domain';
  }

  async createUser(payload) {
    const existingUser = await this.query.findManyUser({
      $or: [
        {
          'email': payload.email
        }
      ]
    });
    if (existingUser.err) {
      logger.error(this.ctx, 'failed to check data existence', 'createTeacher::command.findOneTeacher', existingUser.err);
      return wrapper.error(new NotFoundError('Gagal mengecek data'));
    }
    if (existingUser.data.length) {
      return wrapper.error(new ConflictError('Email sudah digunakan'));
    }

    const hash = await commonUtil
      .getHash(
        payload.password
      );
    if (hash.err) wrapper.error(hash.err);

    const document = {
      userId: uuidv4(),
      name: payload.name,
      password: hash.data,
      email:payload.email,
      company: payload.company,
      role:'user',
      profilePhoto:null,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
      activated:true,
      activationDate: new Date(Date.now()),
    };

    const result = await this.command.insertOneUser(document);
    if (result.err) {
      logger.error(this.ctx, 'Failed to create teacher', 'createTeacher::command.insertOneTeacher', result.err);
      return wrapper.error(new InternalServerError('Gagal insert data'));
    }
    console.log(result);
    return wrapper.data(null);
  }
}

module.exports = User;
