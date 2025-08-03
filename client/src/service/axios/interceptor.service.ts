import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import { authService } from "../auth.service";
import { stateManager } from "../stateManager";

function configureInterceptors(api: AxiosInstance) {
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest: InternalAxiosRequestConfig = error.config;

      if (error.response?.status === 401) {
        // Use dependency injection - pass state management callbacks
        const response = await authService.refreshTokens(
          stateManager.saveAccessToken,
          stateManager.clearAllStates
        );
        if (response && response.success) api.request(originalRequest);
      }

      return Promise.reject(error);
    }
  );
}

export const interceptorService = { configureInterceptors };
