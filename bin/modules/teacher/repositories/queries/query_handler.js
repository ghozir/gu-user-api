
const Pengumuman = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
const config = require('../../../../infra/configs/global_config');
const minio = require('../../../../helpers/components/minio/minio');

const getData = async (params) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}?authSource=admin`, `${params.school}_db`);
  const pengumuman = new Pengumuman(db, minio, config);
  const getData = async () => await pengumuman.getAll(params);
  return await getData();
};

const getDataById = async (params) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}?authSource=admin`, `${params.school}_db`);
  const pengumuman = new Pengumuman(db, minio, config);
  const getData = async () => await pengumuman.getById(params);
  return await getData();
};


module.exports = {
  getData,
  getDataById,
};
