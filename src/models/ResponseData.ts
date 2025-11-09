export class ResponseData<T> {
    private constructor(data: T[], message: string | undefined) {
        this.message = message;
        this.data = data;
    }
    message?: string;
    data: T[];

    static success<T>(data: T[], message?: string): ResponseData<T> {
        return new ResponseData(data,  message);
    }
    static error<T>(message: string): ResponseData<T> {
        return new ResponseData([], message);
    }
}