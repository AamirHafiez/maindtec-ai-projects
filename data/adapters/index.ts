import AppConfig from "@/config/AppConfig";
import ApiAdapter from "./apiAdapter";

export const networkApiAdapter = ApiAdapter(AppConfig.NETWORK_BASE_URL);

networkApiAdapter.interceptors.request.use((config) => {
  return config;
});

networkApiAdapter.interceptors.response.use((config) => {
  return config;
});
