import { axiosClient } from "@/services/axiosClient";
import { jwtDecode } from "jwt-decode";

export type UserJwtPayload = {
  id: number;
  name: string;
  email: string;
  tipo: string;
  isActive: boolean;
};

export interface LoginResult {
  success: boolean;
  acessToken?: string;
  message?: string;
}

export async function login(email: string, senha: string): Promise<LoginResult> {
  try {
    const response = await axiosClient.post("/auth/signin", { email, senha });

    if (response.data?.acessToken) {
      localStorage.setItem("token", response.data.acessToken);
      return { success: true, acessToken: response.data.acessToken };
    }

    return { success: false, message: "Token não recebido." };
  } catch (error: unknown) {
    const err = error as { response?: { data?: { message?: string } } };
    return {
      success: false,
      message: err?.response?.data?.message || "Erro ao fazer login.",
    };
  }
}

export function getUserFromToken(): UserJwtPayload | null {
  if (typeof window === "undefined") return null;
  const token = localStorage.getItem("token");
  if (!token) return null;
  try {
    return jwtDecode<UserJwtPayload>(token);
  } catch {
    return null;
  }
}

export function logout() {
  localStorage.removeItem("token");
  window.location.href = "/auth/signin";
}
