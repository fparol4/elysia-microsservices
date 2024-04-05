import { AppError } from "./app.error";

export class BadRequestError extends AppError {
    constructor(
        message = 'An error ocurred when trying to process request',
        name = 'BadRequest',
        errors = [],
        status = 400, 
    ) {
      super({
        message, 
        name, 
        errors, 
        status
      })
    }
}