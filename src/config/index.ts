import dotenv from 'dotenv';
dotenv.config();

let config: any = {};
const defaultEnv = process.env.ENV || 'dev';

if (defaultEnv === 'dev') {
  config = {
    DB: {
      PORT: '3000',
      DB_HOST: 'localhost',
      DB_PORT: '5432',
      DB_USER: 'postgres',
      DB_PASSWORD: 'root',
      DB_NAME: 'anji',
      DB_SCHEMA: 'anji',
    },
    MAIL: {
      MAIL_HOST: 'smtp.gmail.com',
      MAIL_PORT: '465',
      MAIL_AUTH_USER: 'satishreddytarapareddy44@gmail.com',
      MAIL_AUTH_PASSWORD: 'tiqofikabucjraqp',
    },
    JWT: {
      JWT_SECRET_KEY: 'jncdjwndwjdnew',
      JWT_SECRET_EXP: '1h',
    },
    DEFAULT: {
      DHVANI_UI: 'http://localhost:3000',
    },
    PAYPAL: {
      MODE: 'sandbox',
      PAYPAL_CLIENT_ID:
        'AVnerhEJs4bawsKbvnde2iXaDBKvlQKJa2SfwEgvMkLRL4BrS2Nlr9jmwSUBcs7gFcOYNqAXhMZDQWmd',
      PAYPAL_CLIENT_SECRET:
        'EPmNlnqI-JhG-aCkKZsN8KIbNFknPSAUGVz5G_Wy41HmtcN6zKym_mFGlu5WoSTfh4VI7lAlz7gLRZNb',
    },
  };
}

export default config;
