class ErrorResponse {
  constructor(
    message = 'Server is facing difficulties at the moment, please try later',
    code = 422,
  ) {
    this.success = false;
    this.message = message;
    this.code = code;
  }

  getResource() {
    return {
      success: this.success,
      message: this.message,
    };
  }
}

export default ErrorResponse;
