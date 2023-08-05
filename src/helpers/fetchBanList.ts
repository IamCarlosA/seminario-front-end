import { KushkiApiInstance } from "./api";

export const bankList = () => KushkiApiInstance
    .get("https://api-uat.kushkipagos.com/transfer/v1/bankList")
    .then((res) => res.data)
    .catch(() => null);
