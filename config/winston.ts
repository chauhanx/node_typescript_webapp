import appRoot from 'app-root-path';
import winston from 'winston';
var options = {
    file: {
        // level: 'info',
        filename: `logs/csye6225.log`
        // handleExceptions: true,
        // json: true,
        // maxsize: 4194304,
        // maxFiles: 5,
        // colorize: false,
    },
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true
    },
};

const logFormat = winston.format.combine(
    winston.format.timestamp(),
    winston.format.align(),
    winston.format.printf(
        info => `LABEL: ${info.label}, LEVEL:  ${info.level},TIMESTAMP: ${info.timestamp}, MESSAGE: ${info.message}`
    )
);

export const logger =  winston.createLogger({
    format: logFormat,
    transports: [
        new winston.transports.File({filename:"logs/csye6225.log"}),
        new winston.transports.Console(options.console)
    ],
    exitOnError: false,
});


logger.stream({
    write: (message, encoding) =>{
        logger.info(message); 
    }
});


// module.exports = logger;