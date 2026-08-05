import { ApiSuccess, ApiError } from "@/types/api.types";
import { ErrorCode } from "@/constants/error-codes";

export function successResponse<T>(data: T): ApiSuccess<T> {
  return {
    success: true,
    data,
  };
}

export function errorResponse(
  code: ErrorCode | string,
  message: string,
  details?: unknown
): ApiError {
  return {
    success: false,
    error: {
      code,
      message,
      ...(details !== undefined && { details }),
    },
  };
}
