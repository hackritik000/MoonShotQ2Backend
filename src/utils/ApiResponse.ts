export class ApiResponse {
  constructor(
    public readonly statusCode: number,
    public readonly data: any,
    public readonly message: string = "Success",
    public readonly success: boolean = statusCode < 400
  ) {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
  }
}
