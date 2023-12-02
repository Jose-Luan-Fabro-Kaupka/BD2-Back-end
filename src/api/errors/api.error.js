const ExtendableError = require('./extendable.error')

class APIError extends ExtendableError {
  constructor(status, message, errors) {
    super({
      message,
      errors,
      status
    })
  }
}

module.exports = APIError