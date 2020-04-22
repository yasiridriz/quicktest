require('dotenv').config()

module.exports = {
  env: {
    api_uri: process.env.api_uri,
    api_add: process.env.api_add,
    api_delete: process.env.api_delete,
    api_update: process.env.api_update,
    api_auth_signup: process.env.api_user_reg,
    api_auth_login: process.env.api_user_log,
    USER: process.env.USER,
    REGISTER: process.env.REGISTER,
    AUTHENTICATE: process.env.AUTHENTICATE,
    DEAUTHENTICATE: process.env.DEAUTHENTICATE
  },
}

