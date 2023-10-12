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
    requestPublicKey: process.env.APP_REQUEST_PUBLIC_KEY_PATH,
    requestPrivateKey: process.env.APP_REQUEST_PRIVATE_KEY_PATH,
    responsePublicKey: process.env.APP_RESPONSE_PUBLIC_KEY_PATH,
    responsePrivateKey: process.env.APP_RESPONSE_PRIVATE_KEY_PATH,
    failedLoginAttemptLimit: process.env.FAILED_LOGIN_ATTEMPT_LIMIT,
    loginBlockedTime: process.env.LOGIN_BLOCKED_TIME,
    isEncrypt: process.env.IS_ENCRYPT,
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
  },
  tradingPlatform: {
    trading_platform_url: process.env.TRADING_PLATFORM_URL,
    trading_platform_api_key: process.env.TRADING_PLATFORM_API_KEY,
    trading_platform_source: process.env.TRADING_PLATFORM_SOURCE,
  },
};

module.exports = config;
