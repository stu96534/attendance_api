const fs = require('fs');

module.exports = {
  development: {
    username: "root",
    password: "password",
    database: "attendance_api",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  test: {
    username: "root",
    password: "password",
    database: "attendance_api_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: "CLEARDB_DATABASE_URL",
    dialectOptions: {
      ssl: {
        ca: fs.readFileSync(__dirname + '/DigiCertGlobalRootCA.crt.pem')
      }
    },
    pool: {
      max: 15,
      min: 0,
      idle: 10000,
      acquire: 100000
    }
  }
}