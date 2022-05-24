
class Query {

  constructor(http, redis, config, db, dbMaster) {
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
     * @typedef {import('../../../../infra/configs/global_config')} Config
     * @type {Config}
     */
    this.config = config;
    /**
     * @typedef {import('../../../../helpers/databases/mongodb/db')} MongoDB
     * @type {MongoDB}
     */
    this.db = db;
    /**
     * @typedef {import('../../../../helpers/databases/mongodb/db')} MongoDB
     * @type {MongoDB}
     */
    this.dbContent = dbMaster;
    /**
     * @typedef {import('../../../../helpers/databases/mongodb/db')} MongoDB
     * @type {MongoDB}
     */
  }

  async upstreamGetCredential(payload) {
    const url = this.config.get('/upstreamUrl/teacher');
    this.http.basicAuth = this.config.get('/basicAuthApi')[1];
    const res = this.http.get(`${url}/auth/v2/check/by/email-password`, payload);
    return res;
  }

  async upstreamGetTeacher(payload){
    const url = this.config.get('/upstreamUrl/teacher');
    this.http.basicAuth = this.config.get('/basicAuthApi')[1];
    const res = this.http.get(`${url}/auth/v2/check/by/email`, payload);
    return res;
  }

  async upstreamGetPaginated(page, size, params) {
    const recordset = await this.http.get('/users', { page, per_page: size, ...params });
    return recordset;
  }

  async findOneUserPesona(params) {
    this.dbContent.setCollection('pesonaEduAccounts');
    const recordset = await this.dbContent.findOne(params);
    return recordset;
  }

  async findOne(payload) {
    this.db.setCollection('user');
    const recordset = await this.db.findOne(payload);
    return recordset;
  }

  async findOneAdmin(payload) {
    this.dbAdmin.setCollection('adminUsers');
    const recordset = await this.dbAdmin.findOne(payload);
    return recordset;
  }

  async upstreamGetOneById(id) {
    const recordset = await this.http.get(`/users/${id}`);
    return recordset;
  }

  async getCached(key) {
    const cachedData = this.redis.get(key);
    return cachedData;
  }

  async getCachedTtl(key) {
    const ttl = this.redis.ttl(key);
    return ttl;
  }
  async unsetKey(key) {
    const unsetCache = this.redis.del(key);
    return unsetCache;
  }
  async getKeys(key) {
    const keys = this.redis.getKey(key);
    return keys;
  }
  async getCacheds(key) {
    const cachedData = this.redis.mget(key);
    return cachedData;
  }
}

module.exports = Query;
