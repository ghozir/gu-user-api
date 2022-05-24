const Query = require('../queries/query');
const Command = require('./command');
const ObjectId = require('mongodb').ObjectId;
const commonUtil = require('../../../../helpers/utils/common');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const { ForbiddenError, ConflictError, NotFoundError, InternalServerError } = require('../../../../helpers/error');
const ctx = 'Teacher-Domain';
const moment = require('moment');
// const _ = require('lodash');

class User {

  constructor(db, minio){
    this.command = new Command(db, minio);
    this.query = new Query(db, minio);
  }


  async addTeacher(payload,user) {

    if (user.role !== 'admin') {
      return wrapper.error(new ForbiddenError('This user is not an admin'));
    }

    const existingTeacher = await this.query.findByUsername(payload.username);

    if (existingTeacher.err) {
      logger.error(ctx, 'failed to check data existence', 'createTeacher::command.findOneTeacher', existingTeacher.err);
      return wrapper.error(new NotFoundError('Gagal mengecek data'));
    }

    if(existingTeacher.data){
      logger.error(ctx, 'username already exist', 'createTeacher::command.findOneTeacher', existingTeacher.err);
      return wrapper.error(new ConflictError('username sudah digunakan'));
    }

    payload.subject = payload.subject.map((id)=>{
      return ObjectId(id);
    });

    const hash = await commonUtil
      .getHash(
        moment(payload.birthDate).format('DDMMYY')
      );
    if (hash.err) wrapper.error(hash.err);

    payload.birthDate = new Date(payload.birthDate);
    payload.password = hash.data;
    payload.role = 'teacher';
    payload.status = 'active';
    payload.createdAt = new Date(Date.now());
    payload.updatedAt = new Date(Date.now());


    const result = await this.command.insertOne(payload);
    if (result.err) {
      logger.error(ctx, 'Failed to create teacher', 'createTeacher::command.insertOneTeacher', result.err);
      return wrapper.error(new InternalServerError('Gagal insert data'));
    }

    return wrapper.data(null);
  }

  async deleteTeacher(payload,user) {

    if (user.role !== 'admin' && user.code !== 'TC-001') {
      return wrapper.error(new ForbiddenError('This user is not an super admin'));
    }

    const result = await this.command.deleteOne(payload.id);

    if (result.err) {
      logger.error(this.ctx, 'Failed to delete teacher', 'deleteTeacher::command.deleteOneTeacher', result.err);
      return wrapper.error(result.err);
    }

    return wrapper.data(null);
  }


  async updateAdmin(payload,user) {

    if (user.role !== 'admin' && user.code !== 'TC-001') {
      return wrapper.error(new ForbiddenError('This user is not an super admin'));
    }


    const existingTeacher = await this.query.findById(payload.id);

    if (existingTeacher.err) {
      logger.error(ctx, 'failed to check data existence', 'updateAdmin::command.findOneTeacher', existingTeacher.err);
      return wrapper.error(new NotFoundError('Gagal mengecek data'));
    }

    if(!existingTeacher.data){
      logger.error(ctx, 'Data not found', 'updateAdmin::command.findOneTeacher', existingTeacher.err);
      return wrapper.error(new NotFoundError('Data tida ditemukan'));
    }


    existingTeacher.data.updatedAt = moment().toDate();
    existingTeacher.data.role = 'admin';


    const result = await this.command.upsert(payload.id,existingTeacher.data);

    if (result.err) {
      logger.error(this.ctx, 'Failed to update to admin', 'updateAdmin::command.upsert', result.err);
      return wrapper.error(result.err);
    }

    return wrapper.data(null);
  }

}

module.exports = User;
