
const assert = require('assert');
const sinon = require('sinon');

const Query = require('../../../../../../bin/modules/user/repositories/queries/query');
const Redis = require('../../../../../../bin/helpers/cache/redis/common');

describe('findById', () => {
  const redisConfig = {
    host: 'localhost',
    port: 6379,
    db: 0,
  };
  const redis = new Redis(redisConfig);

  const rds = {
    setCollection: sinon.stub(),
    get: sinon.stub().resolves({
      'err': null,
      'data': {
        '_id': '5bac53b45ea76b1e9bd58e1c',
        'username': 'alifsndev',
        'password': '8789ad457ac341e4fc4cad32'
      }
    })
  };

  it('should return success', async() => {
    const query = new Query(rds);
    sinon.stub(redis, 'get').resolves({err: null, data: {username: 'alifsndev'}});
    const result = await query.findById('5bac53b45ea76b1e9bd58e1c');
    redis.get.restore();
    assert.notEqual(result.data, null);
    assert.equal(result.data.username, 'alifsndev');
  });

});
