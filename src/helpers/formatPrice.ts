// eslint-disable-next-line default-param-last
export const formatPrice = (value: number = 0, country: string = "") => {
  switch (country) {
    case "CO":
      return new Intl.NumberFormat("es-CO").format(Math.trunc(value));

    default:
      return `${Math.trunc(value)}`;
    // return (
    //   new Intl.NumberFormat("es-MX", { minimumFractionDigits: 2 }).format(
    //     value
    //   )+ " MXN"
    // );
  }
};
