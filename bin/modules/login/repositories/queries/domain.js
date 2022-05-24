
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { UnauthorizedError } = require('../../../../helpers/error');
const _ = require('lodash');
const common = require('../../../../helpers/utils/common');
// const apmService = require('../../../../helpers/utils/apm');
// const { NotFoundError } = require('../../../../helpers/error');

class Teacher {

  constructor(http, redis,db) {
    this.query = new Query(http, redis, undefined,db);
    this.ctx = 'Teacher::query-domain';
  }

  async getCached(cacheKey) {
    const result = await this.query.getCached(cacheKey);
    if (result.err) {
      // apmService.captErr(result.err);
      logger.error(this.ctx, 'Failed to get teacher', 'getCached::query.getCached', result.err);
      return wrapper.error(result.err);
    }

    return wrapper.data(result.data);
  }

  async checkStatus(payload) {
    const checkToken = common.parseString(payload.token);
    if (checkToken.err) {
      // apmService.captErr(checkToken.err);
      return wrapper.error(new UnauthorizedError('Token Invalid!'));
    }
    const result = await this.query.getKeys(`*${checkToken.data.token}*`);
    delete checkToken.data.token;
    if (result.err) {
      // apmService.captErr(result.err);
      logger.log('check token', 'failed check status', result.err);
      return wrapper.error(result.err, checkToken);
    }

    if (_.isEmpty(result.data)) {
      // apmService.captErr(new UnauthorizedError('Token Expired'));
      return wrapper.error(new UnauthorizedError('Token Expired !'), checkToken.data);
    }

    return wrapper.data(checkToken.data);
  }

  async getKeys(payload) {
    const mappedKey = payload.nis.map((value) => (`*${value}*`));
    const keys = await this.query.getKeys(mappedKey);
    if (keys.err) {
      logger.log(this.ctx, 'Failed to get keys redis', 'GetTeacher::query.getKeys', keys.err);
      return wrapper.error(keys.err);
    }
    const unset = await this.query.unsetKey(keys.data);
    if (unset.err) {
      logger.log(this.ctx, 'Failed to get keys redis', 'GetTeacher::query.getKeys', keys.err);
      return wrapper.error(keys.err);
    }
    return wrapper.data(unset.data);
  }
  async getTeacherInfo(payload){
    const teacher = await this.query.findOne({_id: payload.id});

    if (teacher.err) {
      // apmService.captErr(teacher.err);
      logger.info('getTeacherInfo', teacher.err, 'Status');
      return wrapper.error(teacher.err);
    }

    teacher.data.id = teacher.data._id;
    teacher.data.school = common.setDomain(payload);
    delete teacher.data._id;
    delete teacher.data.password;
    delete teacher.data.createdAt;
    delete teacher.data.updatedAt;
    return wrapper.data(teacher.data);
  }
}

module.exports = Teacher;
