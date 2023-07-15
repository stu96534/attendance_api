
class ApiError extends Error {
constructor(message, status) {
  super(message)
  this.status = status
  Error.captureStackTrace(this, this.constructor)
}
}


const errStrategies = {
  errorMsg: (callback, message, code) => {
    if (callback) throw new ApiError(message, code)
  },
  minLength: (value, length, message) => {
    if (value.trim().length < length) throw new ApiError(message, 401)
  },
  maxLength: (value, length, message) => {
    if (value.trim().length > length) throw new ApiError(message, 401)
  },
}




module.exports = errStrategies