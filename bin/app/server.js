const restify = require('restify');
const corsMiddleware = require('restify-cors-middleware');
const project = require('../../package.json');
const basicAuth = require('../auth/basic_auth_helper');
const jwtAuth = require('../auth/jwt_auth_helper');
const wrapper = require('../helpers/utils/wrapper');
const config = require('../infra/configs/global_config');
// const apmService = require('../helpers/utils/apm');
const userAuth = require('./routes/login');
const userData = require('./routes/user');
const mongodbPooling = require('../helpers/databases/mongodb/connection');
const apm = require('elastic-apm-node');
class AppServer {
  constructor() {
    this.server = restify.createServer({
      name: `${project.name}-server`,
      version: project.version
    });

    this.server.serverKey = '';
    this.server.use(restify.plugins.acceptParser(this.server.acceptable));
    this.server.use(restify.plugins.queryParser());
    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.authorizationParser());

    // required for CORS configuration
    const corsConfig = corsMiddleware({
      preflightMaxAge: 5,
      origins: [
        'http://localhost:400*',
        'https://*.pijarsekolah.id',
        'http://*.pijarsekolah.id',
        'http://*.playcourt.id'
      ],
      // ['*'] -> to expose all header, any type header will be allow to access
      // X-Requested-With,content-type,GET, POST, PUT, PATCH, DELETE, OPTIONS -> header type
      allowHeaders: ['Authorization'],
      exposeHeaders: ['Authorization']
    });
    this.server.pre(corsConfig.preflight);
    this.server.use(corsConfig.actual);
    this.server.on('InternalServer', (req, res, err, next) => {
      apm.captureError(err);
      next();
    });
    // // required for basic auth
    this.server.use(basicAuth.init());
    mongodbPooling.init(config.get('/mongoDbUrl')+'?authSource=admin');
    // mongodbPooling.init(config.get('/mongoDbUrlStudent')+'?authSource=admin');
    // mongodbPooling.init(config.get('/mongoDbUrlActivation')+'?authSource=admin');

    // anonymous can access the end point, place code bellow
    this.server.get('/', (req, res) => {
      wrapper.response(res, 'success', wrapper.data(null), 'This service is running properly');
    });

    // apmService.init();
    // routes
    userAuth.init(this.server, jwtAuth, basicAuth);
    userData.init(this.server, jwtAuth, basicAuth);
  }
}
module.exports = AppServer;
