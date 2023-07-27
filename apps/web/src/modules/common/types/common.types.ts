export type ApiResponseData<T = unknown> = { success: boolean; message: string } | { success: boolean; data: T };
