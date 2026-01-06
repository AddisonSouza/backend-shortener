export class ApiResponse<T> {
    success: boolean;
    data: T | null;
    message: string | null;

    constructor(success: boolean, data: T | null = null, message: string | null = null) {
        this.success = success;
        this.data = data;
        this.message = message;
    }

    static success<T>(data: T, message: string): ApiResponse<T> {
        return new ApiResponse<T>(true, data, message);
    }

    static failure<T>(message: string): ApiResponse<T> {
        return new ApiResponse<T>(false, null, message);
    }
}
