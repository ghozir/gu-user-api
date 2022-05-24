const { findByUsername } = require('../../../bin/auth/auth_repository');
const config = require('../../../bin/infra/configs/global_config');
const sinon = require('sinon');
const assert = require('assert');

describe('Auth Repository', () => {

  describe('findByUsername', () => {
    it('should return data', () => {
      sinon.stub(config, 'get').returns([
        {
          username: 'asd',
          password: '123'
        },
        {
          username: 'efg',
          password: '546'
        }
      ]);
      findByUsername('asd', user => {
        assert.strictEqual(user.username, 'asd');
        // assert.equal(user.password, undefined);
      });
      config.get.restore();
    });
  });
});
