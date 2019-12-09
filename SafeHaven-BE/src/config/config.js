/* eslint-disable quotes */
/* eslint-disable quote-props */
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  development: {
    use_env_variable: 'DATABASE_URL_DEV',
    dialect: 'postgres',
    logging: false,
    "dialectOptions": {
      "ssl": true,
    },
  },
  test: {
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
    "dialectOptions": {
      "ssl": true,
    },
  },
  production: {
    use_env_variable: 'DATABASE_URL_PROD',
    dialect: 'postgres',
    "dialectOptions": {
      "ssl": true,
    },
  },
};
