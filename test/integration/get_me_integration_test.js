const sinon = require('sinon');
const hippie = require('hippie');
const jwt = require('jsonwebtoken');
process.env.MONGO_DATABASE_URL='mongodb://localhost:27017';
process.env.PORT=9000;
process.env.BASIC_AUTH_USERNAME='telkom';
process.env.BASIC_AUTH_PASSWORD='da1c25d8-37c8-41b1-afe2-42dd4825bfea';
process.env.PUBLIC_KEY_PATH='public.pem';
process.env.PRIVATE_KEY_PATH='private.pem';
process.env.ELASTICSEARCH_CONNECTION_CLASS='http';
process.env.ELASTICSEARCH_API_VERSION='6.4';
process.env.ELASTICSEARCH_HOST='localhost:9200';
process.env.ELASTICSEARCH_MAX_RETRIES='10';
process.env.ELASTICSEARCH_REQUEST_TIMEOUT='30000';
const AppServer = require('../../bin/app/server');
describe('Get Me', () => {

  let appServer;

  let decodedToken = {
    'username': 'alifsn',
    'sub': '5bac53b45ea76b1e9bd58e1c',
    'iat': 1540469257,
    'exp': 1540475257,
    'aud': '97b33193-43ff-4e58-9124-b3a9b9f72c34',
    'iss': 'telkomdev'
  };

  beforeEach(function () {
    appServer = new AppServer();
    this.server = appServer.server;
    sinon.stub(jwt, 'verify').resolves(decodedToken);
  });

  afterEach(function () {
    this.server.close();
    jwt.verify.restore();
  });

  after(() => {
    delete process.env.MONGO_DATABASE_URL;
    delete process.env.PORT;
    delete process.env.BASIC_AUTH_USERNAME;
    delete process.env.BASIC_AUTH_PASSWORD;
    delete process.env.PUBLIC_KEY_PATH;
    delete process.env.PRIVATE_KEY_PATH;
    delete process.env.ELASTICSEARCH_CONNECTION_CLASS;
    delete process.env.ELASTICSEARCH_API_VERSION;
    delete process.env.ELASTICSEARCH_HOST;
    delete process.env.ELASTICSEARCH_MAX_RETRIES;
    delete process.env.ELASTICSEARCH_REQUEST_TIMEOUT;
  });

  it('Should error when view user for /api/v2/pengumuman', function (done) {
    hippie(this.server)
      .header('authorization','')
      .get('/api/v2/pengumuman')
      .expectStatus(401)
      .end((err, res, body) => {
        if(err){
          throw err;
        }
        done();
      });
  });

});
