const winston = require('winston');
const config = require('../../infra/configs/global_config');
const WinstonLogStash = require('winston3-logstash-transport');

let logger = new winston.createLogger({
  transports: [
    new winston.transports.Console({
      level: 'debug',
      colorize: true,
      timestamp: function () {
        return (new Date()).toLocaleTimeString();
      },
      prettyPrint: true
    }),
  ],
  exitOnError: false,
});

// const a = () => {
//   if (config.get('/logstash')) {
//     logger.add(new WinstonLogStash(config.get('/logstash')));
//   }
// };

const log = (context, message, scope) => {
  if (config.get('/logstash')) {
    logger.add(new WinstonLogStash(config.get('/logstash')));
  }
  const obj = {
    context,
    scope,
    message: message
  };
  logger.info(obj);
};

const info = (context, message, scope, meta = undefined) => {
  if (config.get('/logstash')) {
    logger.add(new WinstonLogStash(config.get('/logstash')));
  }
  const obj = {
    context,
    scope,
    message: message,
    meta
  };
  logger.info(obj);
};

const error = (context, message, scope, meta = undefined) => {
  if (config.get('/logstash')) {
    logger.add(new WinstonLogStash(config.get('/logstash')));
  }
  const obj = {
    context,
    scope,
    message: message,
    meta
  };
  logger.error(obj);
};

module.exports = {
  log,
  info,
  error,
};




// const winston = require('winston');
// require('winston-logstash');
// const config = require('../../infra/configs/global_config');

// const logger = new winston.Logger({
//   transports: [
//     new winston.transports.Console({
//       level: 'debug',
//       handleExceptions: true,
//       json: false,
//       colorize: true
//     }),
//     new winston.transports.Logstash(config.get('/logstash'))
//   ],
//   exitOnError: false
// });

// const info = (context, message, scope) => {
//   logger.info({ context, scope, message });
// };

// const warn = (context, message, scope) => {
//   logger.warn({ context, scope, message });
// };

// const error = (context, message, scope) => {
//   logger.error({ context, scope, message });
// };

// const log = (context, message, scope) => {
//   logger.debug({ context, scope, message });
// };


// module.exports = {
//   info,
//   warn,
//   error,
//   log
// };
