
const Query = require('./query');
const wrapper = require('../../../../helpers/utils/wrapper');
const logger = require('../../../../helpers/utils/logger');
const common = require('../../../../helpers/utils/common');
const ctx = 'Pengumuman-Query-Domain';
const datefns = require('date-fns');
const _ = require('lodash');
const { ForbiddenError } = require('../../../../helpers/error');
class User {

  constructor(db, minio, config){
    this.query = new Query(db, minio);
    this.config = config;
  }

  checkRole (role) {
    let akses;
    switch (role) {
    case 'admin':
      akses = 'Semua';
      break;
    case 'teacher' :
      akses = 'Guru';
      break;
    default:
      akses = 'Siswa';
      break;
    }
    return akses;
  }

  async getAll(params) {
    const {page, size, search, role, school} = params;
    const patern = new RegExp(search, 'i');
    const query = role === 'admin' ? {
      $or : [
        {title: {$regex: patern}},
        {description: {$regex: patern}},
      ]
    } : {
      receiver: {$in: ['Semua', new RegExp(this.checkRole(role), 'i')]},
      $or : [
        {title: {$regex: patern}},
        {description: {$regex: patern}},
      ]};
    if(role === 'teacher'){
      delete query.$or;
      delete query.receiver;
      query.$and = [
        {$or: [{title: {$regex: patern}},{description: {$regex: patern}}]},
        {$or: [{receiver: {$in: ['Semua', new RegExp(this.checkRole(role), 'i')]}},{teacherId:params.userId}]}
      ];
    }
    let sDate;
    let eDate;
    if (params.startDate) sDate = {$gte: datefns.startOfDay(params.startDate)};
    if (params.endDate) eDate = {$lte: datefns.endOfDay(params.endDate)};
    let fDate = {date: {...sDate, ...eDate}};
    if(_.isEmpty(fDate.date)) fDate = undefined;
    const filter = {...query, ...fDate};
    const result = await this.query.getPaginate('createdAt', size, page, filter, school);
    if (result.err) {
      logger.error(ctx, 'failed get data', 'domain::getPaginate', result.err);
      return wrapper.error(result.err);
    }

    const wrapped = result.data.map((item) => ({
      id: common.hashEncode(item._id.toString()),
      receiver: item.receiver,
      title: item.title,
      description: item.description,
      date: common.dateFormat(item.date),
      teacherId:(!_.isEmpty(item.teacherId))? item.teacherId : null,
    }));
    let meta = {...result.meta, page: page, totalDataOnPage: result.data.length};
    logger.log(ctx, 'Success get Data', 'domain::getPaginate');
    return wrapper.data(wrapped, meta);
  }

  async getById(params) {
    const id = common.hashDecode(params.id);
    if (id === 'error') {
      logger.error(ctx, 'Failed encode id', 'domain::hashEncode', common);
      return wrapper.data(null);
    }

    const result = await this.query.findById(id);
    if (result.err) {
      logger.error(ctx, 'Failed find data', 'domain::findById', result.err);
      return wrapper.error(result.err);
    }

    let mConnect = this.config.get('/minio');
    let minioUrl = this.config.get('/minioAsset');
    mConnect.endPoint = minioUrl.split('://')[1];
    mConnect.port = minioUrl.includes('https://') ? 443 : 80;
    mConnect.useSSL = minioUrl.includes('https://');
    let file;
    let wrapped = null;
    if (result.data !== null) {

      if(result.data.receiver === 'Siswa' && params.role === 'teacher'){
        if(result.data.teacherId !== params.userId){
          logger.error(ctx, 'forbidden find data', 'domain::getData');
          return wrapper.error(new ForbiddenError('Access Denied'));
        }
      }

      if(result.data.receiver === 'Guru' && params.role === 'student'){
        logger.error(ctx, 'forbidden find data', 'domain::getData');
        return wrapper.error(new ForbiddenError('Access Denied'));
      }

      file = await this.query.getFile(this.config.get('/bucket'), result.data.file, mConnect);
      if (file.err) {
        logger.error(ctx, 'Failed find data', 'domain::getFile', file.err);
        return wrapper.error(file.err);
      }
      wrapped = {
        id: common.hashEncode(result.data._id.toString()),
        receiver: result.data.receiver,
        title: result.data.title,
        description: result.data.description,
        date: common.dateFormat(result.data.date),
        teacherId:(!_.isEmpty(result.data.teacherId))? result.data.teacherId : null,
        file: file.data || null,
        fileName: result.data.file.split('/')[1]
      };
    }

    return wrapper.data(wrapped);
  }

}

module.exports = User;
