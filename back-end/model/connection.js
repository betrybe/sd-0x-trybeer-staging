const mysqlx = require('@mysql/xdevapi');
require("dotenv").config();
/* 
const connection = () => mysqlx.getSession({
  user: 'root',
  password: '12345678',
  host: '127.0.0.1',
  port: 33060,
  schema: 'Trybeer',
}); */

let schema = null;

function connection () {
  if (schema) return Promise.resolve(schema);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.HOSTNAME);
  return mysqlx
    .getSession({
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      host: process.env.HOSTNAME,
      port: 33060,
      schema: 'Trybeer',
    })
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection;


/* const mysqlx = require('@mysql/xdevapi');

let schema = null;

const config = {
  user: 'root',
  password: '12345678',
  host: '127.0.0.1',
  port: 33060,
  socketPath: '/var/run/mysqld/mysqld.sock',
};

function connection () {
  if (schema) return Promise.resolve(schema);

  return mysqlx
    .getSession(config)
    .then((session) => session.getSchema('Trybeer'))
    .then((dbSchema) => {
      schema = dbSchema;
      return schema;
    })
    .catch((err) => {
      console.error(err);
      process.exit(1);
    });
}

module.exports = connection; */
