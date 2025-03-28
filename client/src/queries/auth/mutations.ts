import { axiosClient } from "@/config/axios";
import { useMutation } from "@tanstack/react-query";
export interface RegisterRequest {
  email: string;
  password: string;
  name?: string;
  // Add other registration fields
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    // Other user fields
  };
  message: string;
  success: boolean;
}
export const useRegistrationMutation = () => {
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const response = await axiosClient.post<AuthResponse>(
        "/auth/register",
        data
      );
      return response.data;
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: async (data: Record<string, any>) => {
      const response = await axiosClient.post("/auth/login", data);
      return response.data;
    },
  });
};
