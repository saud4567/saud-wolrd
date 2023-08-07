const config = {
  app: {
    environment: process.env.APP_ENVIRONMENT,
    name: process.env.APP_NAME,
    host: process.env.APP_HOST,
    port: process.env.APP_PORT,
    userJWTSecret: process.env.APP_USER_JWT_SECRET,
    userJWTExpiresIn: process.env.APP_USER_JWT_EXPIRESIN,
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRET,
    resetRequestExpiry: process.env.RESET_REQUEST_EXPIRY,
  },
  database: {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    name: process.env.DATABASE_NAME,
    debug: process.env.DATABASE_DEBUG,
    timezone: process.env.DATABASE_TIMEZONE,
  },
  aws: {
    s3: {
      key: process.env.FL_STRG_KEY,
      secret: process.env.FL_STRG_SECRET,
      bucketName: process.env.FL_STRG_NAME,
      folder_prefix: process.env.FL_STRG_FLDR_PREFIX,
    },
  },
  encryption: {
    secretKey: process.env.ENCRYPTION_SECRET_KEY,
    secretIv: process.env.ENCRYPTION_SECRET_IV,
  }
};

module.exports = config;
