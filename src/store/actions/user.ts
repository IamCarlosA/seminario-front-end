import { types } from "../types/types";

export const setUserAuthTokens = (jwt: string, refreshToken?: string) => {
  return {
    type: types.user,
    payload: {
      jwt,
      refreshToken,
    },
  };
};

export const local = (user: any) => {

  // eslint-disable-next-line no-param-reassign
  delete user.password;
  return {
    type: types.userDt,
    payload: {
      user,
    },
  };
};
