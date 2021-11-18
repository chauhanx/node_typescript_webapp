
import {  appConfigs }  from '../src/config/config';
import winston from 'winston';
import CloudWatchTransport from 'winston-aws-cloudwatch';

var options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        json: false,
        colorize: true,
        timestamp:true
    },
};


export const logger =  winston.createLogger({
  transports: [
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
            region: `us-east-1`
        },
        formatLog: item =>
          `${item.level}: ${item.message} ${JSON.stringify(item.meta)}`
    }),
    new winston.transports.Console(options.console)
  ]
});

logger.level = process.env.LOG_LEVEL || "silly";

logger.stream({
  write: function(message, encoding) {
    logger.info(message);
  }
});
