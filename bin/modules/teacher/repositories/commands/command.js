const ObjectId = require('mongodb').ObjectId;
class Command {

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

  // async bufferUpload(bucket, fileName, path, meta, connection) {
  //   this.minio.init(connection);
  //   const upload = await this.minio.objectUpload(bucket, fileName, path, meta);
  //   return upload;
  // }

  async insertOne(document) {
    this.db.setCollection('user');
    const result = await this.db.insertOne(document);
    return result;
  }

  // async removeFile(bucket, document, connection) {
  //   this.minio.init(connection);
  //   const remove = await this.minio.objectRemove(bucket, document);
  //   return remove;
  // }

  async upsert(id, body) {
    this.db.setCollection('user');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.upsertOne(parameter, body);
    return result;
  }

  async deleteOne(id) {
    this.db.setCollection('user');
    const parameter = {
      _id: ObjectId(id)
    };
    const result = await this.db.deleteOne(parameter);
    return result;
  }
}

module.exports = Command;
