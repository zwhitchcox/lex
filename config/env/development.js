'use strict';

module.exports = {
  db: 'mongodb://' + (process.env.DB_PORT_27017_TCP_ADDR || 'localhost') + '/mean-dev',
  debug: true,
  //  aggregate: 'whatever that is not false, because boolean false value turns aggregation off', //false
  aggregate: false,
  mongoose: {
    debug: false
  },
  secret:'balloon',
  app: {
    name: 'MEAN - FullStack JS - Development'
  },
  facebook: {
    clientID: '1446047538997456',
    clientSecret: '2755d91c98f6ccd91f7190fb268d2c97',
    callbackURL: 'http://localhost:3000/api/auth/facebook/callback'
  },
  twitter: {
    clientID: 'DEFAULT_CONSUMER_KEY',
    clientSecret: 'CONSUMER_SECRET',
    callbackURL: 'http://localhost:3000/api/auth/twitter/callback'
  },
  github: {
    clientID: '4c37cddb2e9317bcd883',
    clientSecret: '6d97a3e18fe94dfe4fbd3cfbbc3701ba146ba054',
    callbackURL: 'http://localhost:3000/api/auth/github/callback'
  },
  google: {
    clientID: 'DEFAULT_APP_ID',
    clientSecret: 'APP_SECRET',
    callbackURL: 'http://localhost:3000/api/auth/google/callback'
  },
  linkedin: {
    clientID: 'DEFAULT_API_KEY',
    clientSecret: 'SECRET_KEY',
    callbackURL: 'http://localhost:3000/api/auth/linkedin/callback'
  },
  emailFrom: 'SENDER EMAIL ADDRESS', // sender address like ABC <abc@example.com>
  mailer: {
    service: 'SERVICE_PROVIDER', // Gmail, SMTP
    auth: {
      user: 'EMAIL_ID',
      pass: 'PASSWORD'
    }
  }
};
