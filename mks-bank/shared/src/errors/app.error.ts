export class AppError extends Error {
    public name: string;
    public message: string;
    public errors: string[] = [];
    public status: number; 

    constructor({
        message = 'An error ocurred on application',
        name = 'ApplicationError',
        errors = [],
        status = 500
    }) {
        super()
        this.name = name
        this.message = message
        this.errors = errors
        this.status = status
    }
}