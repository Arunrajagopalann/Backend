const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

// Define the custom format
const myFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

// Create the logger
const logger = createLogger({
  level: 'info', // Log only if info level or higher
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new transports.Console(),
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    // new transports.MongoDB({
    //     db: 'mongodb://localhost:27017/logs',
    //     collection: 'log',
    //     level: 'error'
    //   })
  ]
});

module.exports = logger;

