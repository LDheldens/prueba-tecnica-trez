import { ENV } from "@/config/env";

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${ENV.API_BASE_URL}/auth/login`,
    REGISTER: `${ENV.API_BASE_URL}/auth/register`,
    LOGOUT: `${ENV.API_BASE_URL}/auth/logout`,
  },
} as const;