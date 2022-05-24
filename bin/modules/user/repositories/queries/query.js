class Query {

  constructor(redis) {
    /**
     * @typedef {import('../../../../helpers/cache/redis/common')} Redis
     * @type {Redis}
     */
    this.redis = redis;
  }

  async findById(id) {
    const recordset = await this.redis.get(id);
    return recordset;
  }

}

module.exports = Query;
