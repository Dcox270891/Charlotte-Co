module.exports ={
    "development": {
      "username": "root",
      "password": process.env.DEV_PASSWORD,
      "database": "charlotte_co_development",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "test": {
      "username": "root",
      "password": process.env.DEV_PASSWORD,
      "database": "charlotte_co_test",
      "host": "127.0.0.1",
      "dialect": "mysql"
    },
    "production": {
      "username": "root",
      "password": process.env.DEV_PASSWORD,
      "database": "charlotte_co_production",
      "host": "127.0.0.1",
      "dialect": "mysql"
    }
  }