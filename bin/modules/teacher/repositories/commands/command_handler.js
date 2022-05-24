
const User = require('./domain');
const Mongo = require('../../../../helpers/databases/mongodb/db');
// const minio = require('../../../../helpers/components/minio/minio');
const config = require('../../../../infra/configs/global_config');

const addTeacher = async (payload,user) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}?authSource=admin`, 'GalaxyUniversity');
  const Teacher = new User(db);
  const postCommand = async () => await Teacher.addTeacher(payload,user);
  return await postCommand();
};

const deleteTeacher = async (payload,user) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}?authSource=admin`, 'GalaxyUniversity');
  const Teacher = new User(db);
  const postCommand = async () => await Teacher.deleteTeacher(payload,user);
  return await postCommand();
};

const updateAdmin = async (payload,user) => {
  const db = new Mongo(`${config.get('/mongoDbUrl')}?authSource=admin`, 'GalaxyUniversity');
  const Teacher = new User(db);
  const postCommand = async () => await Teacher.updateAdmin(payload,user);
  return await postCommand();
};



module.exports = {
  addTeacher,
  deleteTeacher,
  updateAdmin
};
