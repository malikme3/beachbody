export class ErrorUtils {
  static notFoundError(entity: string) {
    const error: any = new Error();
    error["statusCode"] = 404;
    error["message"] = `${entity} not found`;
    throw error;
  }

  static serverError(error: string) {
    const err: any = new Error();
    err["message"] = `request failed due to ${error}`;
    err["statusCode"] = 500;
    throw err;
  }

  static badRequest(api: string) {
    const err: any = new Error();
    err["message"] = `one or more params are missing for ${api}`;
    err["statusCode"] = 500;
    throw err;
  }
}
