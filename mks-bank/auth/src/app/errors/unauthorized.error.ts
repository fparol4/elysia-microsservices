import { AppError } from "./app.error";

export class UnauthorizedError extends AppError {
    constructor(
        message = 'The request is not authorized to be processed',
        name = 'Unauthorized',
        errors = [],
        status = 401, 
    ) {
      super({
        message, 
        name, 
        errors, 
        status
      })
    }
}