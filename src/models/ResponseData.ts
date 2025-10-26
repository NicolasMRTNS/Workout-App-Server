export class ResponseData<T> {
    private constructor(data: T[], success: boolean, message: string | undefined) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
    success: boolean;
    message?: string;
    data: T[];

    static success<T>(data: T[], message?: string): ResponseData<T> {
        return new ResponseData(data, true, message);
    }
    static error<T>(message: string): ResponseData<T> {
        return new ResponseData([], false, message);
    }
}