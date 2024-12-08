export class ApiError extends Error {
  constructor(
    public readonly statusCode: number,
    public readonly message: string = 'Something went wrong',
    public readonly errors: Error[] = [],
    public readonly stack?: string,
    public readonly data?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
