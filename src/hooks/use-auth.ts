import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { getMe, loginUser, logoutUser, registerUser } from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import { QUERY_KEYS } from "@/constants/query-keys";
import { getErrorMessage } from "@/lib/error";
import type { LoginPayload, RegisterPayload } from "@/types/auth.types";

export function useLogin() {
  const router = useRouter();
  const setSession = useAuthStore((s) => s.setSession);

  return useMutation({
    mutationFn: (payload: LoginPayload) => loginUser(payload),
    onSuccess: (data) => {
      setSession(data);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useRegister() {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: RegisterPayload) => registerUser(payload),
    onSuccess: () => {
      toast.success("Account created. Please log in.");
      router.push("/login");
    },
    onError: (error) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const refreshToken = useAuthStore((s) => s.refreshToken);
  const clearSession = useAuthStore((s) => s.clearSession);

  return useMutation({
    mutationFn: async () => {
      if (refreshToken) {
        await logoutUser(refreshToken);
      }
    },
    onSettled: () => {
      clearSession();
      queryClient.clear();
      router.push("/login");
    },
  });
}

export function useCurrentUser() {
  const isHydrated = useAuthStore((s) => s.isHydrated);
  const refreshToken = useAuthStore((s) => s.refreshToken);

  return useQuery({
    queryKey: QUERY_KEYS.auth.me,
    queryFn: getMe,
    enabled: isHydrated && !!refreshToken,
    retry: false,
  });
}
