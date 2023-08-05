import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "../store";
import { local, setUserAuthTokens } from "../store/actions/user";
import { fetchRefreshToken } from "./fetchRefreshToken";

declare module "axios" {
  // eslint-disable-next-line no-shadow
  export interface AxiosRequestConfig {
    requireAuth?: boolean;
  }
}

const onRequest = (config: AxiosRequestConfig) => {
  const token = store.getState().userReducer.jwt;
  if (token && config.requireAuth) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

const onResponse = (response: AxiosResponse) => {
  if (response.data.jwt || response.data.token) {
    store.dispatch(
      setUserAuthTokens(
        response.data.jwt || response.data.token,
        response.data.refresh_token
      )
    );
    store.dispatch(local(response.data.user));
  }
  return response;
};

const onResponseError = (instance: AxiosInstance) => async (error: any) => {
  try {
    const originalRequest = error.config;

    if (originalRequest.headers && originalRequest.headers.refreshRequest) {
      // if the failed request was a refresh request, do not attempt to refresh token
      throw error;
    }

    const { refreshToken } = store.getState().userReducer;

    if (error.response.status === 401 && !originalRequest._retry) {
      // try to refresh token
      originalRequest._retry = true;
      await fetchRefreshToken(refreshToken);
      return instance(originalRequest);
    }

    throw error;
  } catch (e) {
    return Promise.reject(error);
  }
};

const WebApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

WebApiInstance.interceptors.request.use(onRequest);
WebApiInstance.interceptors.response.use(
  onResponse,
  onResponseError(WebApiInstance)
);

const PandaboardApiInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL_PA, // "https://api-pandaboard.dev.ozon.mobi/v1/"
});

PandaboardApiInstance.interceptors.request.use(onRequest);
PandaboardApiInstance.interceptors.response.use(
  onResponse,
  onResponseError(PandaboardApiInstance)
);

const KushkiApiInstance = axios.create({
  headers: { "Public-Merchant-Id": process.env.REACT_APP_KUSHKI_CO },
  baseURL: "https://api-uat.kushkipagos.com/transfer/v1/",
});

export { WebApiInstance, PandaboardApiInstance, KushkiApiInstance };
