const pino = require('pino');
const {log} = require('../../config/config');

module.exports = pino({
    level: log.level,
    formatters: {
        level: (label) => {
            return {level: label.toUpperCase() }
        }
    },
    timestamp: pino.stdTimeFunctionsisoTime
})