const ObjectId = require('mongodb').ObjectId;
class Query {

  constructor(db, minio) {
    /**
     * @typedef {import('../../../../helpers/databases/mongodb/db')} MongoDb
     * @type {MongoDb}
     */
    this.db = db;
    /**
     * @typedef {import('../../../../helpers/components/minio/minio')} minio
     * @type {minio}
     */
    this.minio = minio;
  }

  async getPaginate(sorting, size, page, params, school) {
    this.db.setCollection('pengumuman');
    const recordset = await this.db.findPaginated(sorting, size, page, params);
    return recordset;
  }

  async findByUsername(username) {
    this.db.setCollection('user');
    const parameter = {
      username: username
    };
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async findById(id) {
    this.db.setCollection('user');
    const parameter = {
      _id: ObjectId(id)
    };
    const recordset = await this.db.findOne(parameter);
    return recordset;
  }

  async getFile(bucket, nameFile, config) {
    this.minio.init(config);
    const res = await this.minio.objectGetUrl(bucket, nameFile, 120);
    return res;
  }

}

module.exports = Query;
