require('dotenv').config();
const confidence = require('confidence');

const config = {
  port: process.env.PORT,
  basicAuthApi: [
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_AUTH_PASSWORD
    },
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_PASSWORD_TEACHER
    },
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_PASSWORD_NOTIFICATION
    },
    {
      username: process.env.BASIC_AUTH_USERNAME,
      password: process.env.BASIC_PASSWORD_STUDENT
    },
    {
      username: process.env.BASIC_AUTH_USERNAME_TITIK_PINTAR,
      password: process.env.BASIC_PASSWORD_TITIK_PINTAR
    }
  ],
  // aws: {
  //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  //   region: process.env.AWS_REGION
  // },
  serviceName: process.env.APM_SERVICE_NAME,
  serverUrl: process.env.APM_SERVICE_URL,
  apmtransaction: process.env.APM_TRANSACTION,
  publicKey: process.env.PUBLIC_KEY_PATH,
  privateKey: process.env.PRIVATE_KEY_PATH,
  dsnSentryUrl: process.env.DSN_SENTRY_URL,
  mongoDbUrl: process.env.MONGO_DATABASE,
  // mysqlConfig: {
  //   connectionLimit: process.env.MYSQL_CONNECTION_LIMIT,
  //   host: process.env.MYSQL_HOST,
  //   user: process.env.MYSQL_USER,
  //   password: process.env.MYSQL_PASSWORD,
  //   database: process.env.MYSQL_DATABASE
  // },
  redisConfig: {
    host: process.env.REDIS_HOST,
    port: parseInt(process.env.REDIS_PORT || 6379),
    password: process.env.REDIS_PASSWORD || undefined,
    db: parseInt(process.env.REDIS_DB || 0),
  },
  minioAsset: process.env.MINIO_HOST_ASSET,
  bucketStudent: process.env.BUCKET_STUDENT,
  bucketTeacher: process.env.BUCKET_TEACHER,
  // postgreConfig:{
  //   host: process.env.POSTGRES_HOST,
  //   user: process.env.POSTGRES_USER,
  //   password: process.env.POSTGRES_PASSWORD,
  //   database: process.env.POSTGRES_DATABASE,
  //   port: process.env.POSTGRES_PORT,
  //   max:  process.env.POSTGRES_MAX,
  //   idleTimeoutMillis: process.env.POSTGRES_TIMEOUT
  // },
  // elasticsearch: {
  //   connectionClass: process.env.ELASTICSEARCH_CONNECTION_CLASS || '',
  //   apiVersion: process.env.ELASTICSEARCH_API_VERSION,
  //   host: process.env.ELASTICSEARCH_HOST ? [
  //     process.env.ELASTICSEARCH_HOST
  //   ] : null,
  //   maxRetries: process.env.ELASTICSEARCH_MAX_RETRIES,
  //   requestTimeout: process.env.ELASTICSEARCH_REQUEST_TIMEOUT
  // },
  logstash: {
    applicationName: process.env.APM_SERVICE_NAME,
    mode: process.env.LOGSTASH_MODE || 'tcp',
    host: process.env.LOGSTASH_HOST,
    port: parseInt(process.env.LOGSTASH_PORT) || 28777,
    maxConnectRetries: parseInt(process.env.LOGSTASH_MAX_CONNECT_RETRIES) || 5,
    timeoutConnectRetries: parseInt(process.env.LOGSTASH_TIMEOUT_CONNECT_RETRIES) || 200,
  },
  upstreamUrl: {
    usba: process.env.PS_USBA_URL,
    sim: process.env.PS_SIM_URL,
    teacher: process.env.TEACHER_URL,
    student: process.env.STUDENT_URL,
    studentWeb: process.env.STUDENT_WEB_URL,
    teacherForgot: process.env.TEACHER_FORGOT_PASS,
    studentForgot: process.env.STUDENT_FORGOT_PASS,
    email: process.env.EMAIL_URL,
  },
  cluster: process.env.CLUSTER_ECOSYSTEM || 3
};

const store = new confidence.Store(config);

exports.get = key => store.get(key);
