import { api } from "@/lib/axios";
import { ENDPOINTS } from "@/constants/endpoints";
import type { ApiSuccess } from "@/types/api.types";
import type {
  AuthUser,
  LoginPayload,
  LoginResponseData,
  RegisterPayload,
} from "@/types/auth.types";

export async function registerUser(payload: RegisterPayload) {
  const { data } = await api.post<ApiSuccess<AuthUser>>(
    ENDPOINTS.auth.register,
    payload,
  );
  return data.data;
}

export async function loginUser(payload: LoginPayload) {
  const { data } = await api.post<ApiSuccess<LoginResponseData>>(
    ENDPOINTS.auth.login,
    payload,
  );
  return data.data;
}

export async function logoutUser(refreshToken: string) {
  await api.post(ENDPOINTS.auth.logout, { refreshToken });
}

export async function getMe() {
  const { data } = await api.get<ApiSuccess<AuthUser>>(ENDPOINTS.auth.me);
  return data.data;
}
