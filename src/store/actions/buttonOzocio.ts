import { types } from "../types/types";

export const buttonozocio = (loading: boolean) => ({
  type: types.ozocioLoading,
  payload: {
    loading,
  },
});
