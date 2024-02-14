export class ErrorHandler extends Error {
  constructor (statusCode, message, details = null) {
    super()
    this.statusCode = statusCode
    this.message = message
    this.details = details
  }
}
