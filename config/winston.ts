// import appRoot from 'app-root-path';
// import winston from 'winston';

import {  appConfigs }  from '../src/config/config';
var options = {
    file: {
        // level: 'info',
        // filename: `${appRoot}/logs/csye6225.log`
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
        colorize: true,
        timestamp:true
    },
};

// const logFormat = winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.align(),
//     winston.format.printf(
//         info => `LABEL: ${info.label}, LEVEL:  ${info.level},TIMESTAMP: ${info.timestamp}, MESSAGE: ${info.message}`
//     )
// );

// export const logger =  winston.createLogger({
//     format: logFormat,
//     transports: [
//         new winston.transports.File({filename:`logs/csye6225.log`}),
//         new winston.transports.Console(options.console)
//     ],
//     exitOnError: false,
// });


// logger.stream({
//     write: (message, encoding) =>{
//         logger.info(message); 
//     }
// });


// module.exports = logger;


import winston from 'winston';
import CloudWatchTransport from 'winston-aws-cloudwatch';

export const logger =  winston.createLogger({
  transports: [
    // new (winston.transports.Console)({
    //   timestamp: true,
    //   colorize: true
    // })
    new CloudWatchTransport({
        logGroupName: 'csye6225', 
        logStreamName: 'webapp',
        createLogGroup: true,
        createLogStream: true,
        submissionInterval: 200,
        submissionRetryCount: 1,
        batchSize: 5,
        awsConfig: {
            accessKeyId: `${appConfigs.s3.ACCESS_KEY}`,
            secretAccessKey: `${appConfigs.s3.SECRET_KEY}`,
            region: process.env.CLOUDWATCH_REGION
        },
        formatLog: item =>
          `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
    }),
    new winston.transports.Console(options.console)
  ]
});

// var config = {
//   logGroupName: 'csye6225',
//   logStreamName: 'webapp',
//   createLogGroup: false,
//   createLogStream: true,
//   awsConfig: {
//     accessKeyId: process.env.CLOUDWATCH_ACCESS_KEY_ID,
//     secretAccessKey: process.env.CLOUDWATCH_SECRET_ACCESS_KEY,
//     region: process.env.CLOUDWATCH_REGION
//   },
//   formatLog: function (item) {
//     return item.level + ': ' + item.message + ' ' + JSON.stringify(item.meta)
//   }
// }

// logger.add(CloudWatchTransport, config);

logger.level = process.env.LOG_LEVEL || "silly";

logger.stream({
  write: function(message, encoding) {
    logger.info(message);
  }
});

// module.exports = logger;