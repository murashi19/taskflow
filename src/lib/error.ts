import type { ApiError } from "@/types/api.types";
import { AxiosError } from "axios";

const GENERIC_MESSAGE = "Something went wrong. Please try again.";

const STATUS_FALLBACK: Record<number, string> = {
  401: "Your session has expired. Please log in again.",
  403: "You don't have permission to do that.",
  404: "The requested resource was not found.",
  422: "Please check the data you submitted.",
  500: GENERIC_MESSAGE,
};

export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const data = error.response?.data as ApiError | undefined;

    // Only status codes explicitly handled by the app are trusted to
    // surface the backend's own message; anything else falls back to a
    // generic message so raw backend errors are never exposed.
    if (status && [400, 401, 403, 404, 409, 422].includes(status) && data?.message) {
      return data.message;
    }

    if (status && STATUS_FALLBACK[status]) {
      return STATUS_FALLBACK[status];
    }

    if (error.code === "ERR_NETWORK") {
      return "Unable to reach the server. Check your connection.";
    }
  }

  return GENERIC_MESSAGE;
}
