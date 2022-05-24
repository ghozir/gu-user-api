
const ObjectID = require('mongodb').ObjectID;
const config = require('../../../../infra/configs/global_config');

class Command {

  constructor(http, redis, db) {
    /**
     * @typedef {import('../../../../helpers/components/axios/http')} Http
     * @type {Http}
     */
    this.http = http;
    /**
     * @typedef {import('../../../../helpers/cache/redis/common')} Redis
     * @type {Redis}
     */
    this.redis = redis;
    /**
     * @typedef {import('../../../../helpers/databases/mongodb/db')} MongoDB
     * @type {MongoDB}
     */
    this.db = db;
  }

  async insertOneUser(document) {
    this.db.setCollection('user');
    const result = await this.db.insertOne(document);
    return result;
  }

}

module.exports = Command;
