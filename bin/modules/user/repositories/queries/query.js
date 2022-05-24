class Query {

  constructor(http, redis, db, dbMaster) {
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
    /**
     * @typedef {import('../../../../helpers/databases/mongodb/db')} MongoDB
     * @type {MongoDB}
     */
    this.dbMaster = dbMaster;
  }

  async findManyUser(parameter, sortByfield) {
    if (parameter.search) {
      parameter.$or = [];
      parameter.$or[0] = { name: { $regex: new RegExp(parameter.search, 'i') } };
      delete parameter.search;
    }
    this.db.setCollection('user');
    const recordset = await this.db.findMany(parameter, sortByfield);
    return recordset;
  }
}

module.exports = Query;
