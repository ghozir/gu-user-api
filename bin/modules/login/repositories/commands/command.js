
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

  async setCache(key, value, expires = 3600) {
    const setCache = this.redis.setex(key, value, expires);
    return setCache;
  }

  async unsetCache(key) {
    const unsetCache = this.redis.del(key);
    return unsetCache;
  }
  async updatePass(id, params){
    this.db.setCollection('teachers');
    const res = await this.db.updateOne(id, params);
    return res;
  }

  async sendEmail(params) {
    const url = config.get('/upstreamUrl/email');
    this.http.basicAuth = config.get('/basicAuthApi')[2];
    const res = this.http.post(`${url}/admin/v2/notif/cloud-forgot-password`, params);
    return res;
  }
  async sendEmailSuccessPwd(params) {
    const url = config.get('/upstreamUrl/email');
    this.http.basicAuth = config.get('/basicAuthApi')[2];
    const res = this.http.post(`${url}/admin/v2/notif/cloud-password-changed`, params);
    return res;
  }

  async titikPintarRegistration(payload) {
    const url = config.get('/titikPintarUrl');
    const res = await this.http.post(`${url}/v1/registration`, payload, {'X-Pijar': config.get('/titikPintarHeader')});
    return res;
  }

  async updateTeacher(params, payload) {
    this.db.setCollection('teachers');
    const res = await this.db.updateOne(params, payload);
    return res;
  }

  async titikPintarLogin(payload) {
    const url = config.get('/titikPintarUrl');
    const res = await this.http.post(`${url}/v1/login`, payload, {'X-Pijar': config.get('/titikPintarHeader')});
    return res;
  }
}

module.exports = Command;
