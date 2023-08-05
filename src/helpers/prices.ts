/* eslint-disable no-shadow */
import { formatPrice } from "./formatPrice";

export const prices = (price: number = 0, iva: number = 0): number =>
  price * iva + price;

export const insurance = (price: number = 0, insurance: number = 0): number =>
  price * insurance;

export const getPriceFinan = ({ price  = 0, country = "CO" } : {price?: number, weeks?: number, country?: string}) => `${formatPrice(prices(price), country)}`;


export const priceFormatFinancial = (price: any, decimals?: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: decimals === null ? 2 : decimals,
  });
  const priceFormat = formatter.format(price);
  return `${priceFormat}`;
};
