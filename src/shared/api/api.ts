import axios, { type AxiosRequestConfig, type Method } from "axios";

export const apiRequest = async <Req = any, Res = any>(
  method: Method,
  url: string,
  data?: Req,
  config?: AxiosRequestConfig
): Promise<Res> => {
  const token = sessionStorage.getItem("token");

  const headers = {
    ...(config?.headers || {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await axios.request<Res>({
    method,
    url,
    data,
    ...config,
    headers,
  });

  return response.data;
};
