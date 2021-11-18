
import log4js from 'log4js';

export const log = log4js.configure({
    appenders: { logs: { type: 'file', filename: '/home/ubuntu/webapp/logs/csye6225.log' }},
    categories: { default: { appenders: ['logs'], level: 'info' }}
});
