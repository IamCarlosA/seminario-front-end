import { PandaboardApiInstance } from "./api";

// eslint-disable-next-line camelcase
export const fetchRefreshToken = (refresh_token: string) =>
  PandaboardApiInstance.post(
    "/auth-client/refresh",
    // eslint-disable-next-line camelcase
    { refresh_token },
    {
      headers: { refreshRequest: true },
    }
  );
