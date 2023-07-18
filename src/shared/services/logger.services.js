const winston = require("winston");

const loggerServices = {};

// below class is created to push logs to an API end point
class LoggerAPITransport extends winston.Transport {
    constructor(options) {
        super(options);
        this.apiEndpoint = options.apiEndpoint;
    }

    log(info, callback) {
        fetch(this.apiEndpoint, {
            body: JSON.stringify(info),
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(() => callback(null, true))
            .catch((err) => callback(err));
    }
}

// service_name: alert
// service_description:
//      logger service to log messages in alert log file
loggerServices.alert = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "log/alert.log",
            level: "info",
        }),
        new LoggerAPITransport({
            apiEndpoint: "http://127.0.0.1:3001/log/alert",
        }),
    ],
});
// loggerServices.alert = loggerServices.alert;

// service_name: success
// service_description:
//      logger service to log messages in success log file
loggerServices.success = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.printf((info) => {
            const { timestamp, level, message, ...meta } = info;
            const metaString = JSON.stringify(meta, null, 2);
            return `${timestamp} ${level}: ${message}\n${metaString}`;
        })
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "log/success.log",
            level: "info",
        }),
    ],
});

// service_name: error
// service_description:
//      logger service to log messages in error log file
loggerServices.error = winston.createLogger({
    level: "info",
    format: winston.format.combine(
        winston.format.splat(),
        winston.format.simple(),
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: "log/error.log",
            level: "info",
        }),
    ],
});

module.exports = loggerServices;
