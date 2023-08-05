import { VehiclesFilters } from "../helpers/fetchVehicles";

export type TImages = {
  _id: string;
  name: string;
  url: string;
  size: number;
  path: string;
  hash: string;
  ext: string;
  mimeType: string;
  width: number;
  height: number;
  formats: {
    _id: string;
    thumbnail: {
      _id: string;
      name: string;
      url: string;
      size: number;
      path: string;
      hash: string;
      ext: string;
      mimeType: string;
      width: number;
      height: number;
    };
    small: {
      _id: string;
      name: string;
      url: string;
      size: number;
      path: string;
      hash: string;
      ext: string;
      mimeType: string;
      width: number;
      height: number;
    };
  };
};

export type TDetails = {
  size?: string;
  suspension?: boolean;
  note?: string;
  changes?: string;
  year: string;
  milage: number;
};

type TBrand = {
  _id: string;
  name: string;
};

type TCylindersCapacity = {
  _id: string;
  value: string;
};

type TModel = {
  _id: string;
  name: string;
  brand: string;
};

type TCity = {
  _id: string;
  name: string;
  country: string;
};

type TCountry = {
  _id: string;
  deliveryPrice: number;
  insurance: number;
  deposit: number;
  name: string;
  iso: string;
  currency: string;
  tax: number;
  tax_name: string;
};

export interface TDiscount {
  type: "net" | "percentage";
  netValue: number;
  percentageValue: number;
  createdAt: string;
  id: string;
  status: "active" | "inactive";
}

interface THub {
  _id: string;
  city: string;
  name: string;
}

export const statusVehicles = {
  available: {
    title: "Disponible",
    color: "green_300",
  },
  delivered: {
    title: "Entregada",
    color: "primary_200",
  },
  aside: {
    title: "Apartada",
    color: "secondary_500",
  },
  left: {
    title: "Quedada",
    color: "red_300",
  },
  underMaintenance: {
    title: "Mantenimiento",
    color: "neutral_600",
  },
};

export interface IDetailsData {
  year: string;
  milage: string;
  color: string;
  secondaryColor: string;
  yellow: string;
  pink: string;
  purple: string;
  blue: string;
  orange: string;
  green: string;
  white: string;
  gray: string;
  red: string;
  black: string;
  brakeType: string;
  disc: string;
  drum: string;
}

export const detailsData: IDetailsData = {
  year: "Año",
  milage: "Kilometraje",
  color: "Color",
  disc: "Disco",
  drum: "Tambor",
  secondaryColor: "Color secundario",
  yellow: "Amarillo",
  pink: "Rosa",
  purple: "Morado",
  blue: "Azul",
  orange: "Naranja",
  green: "Verde",
  white: "Blanco",
  gray: "Gris",
  red: "Rojo",
  black: "Negro",
  brakeType: "Tipo de frenos",
};

export interface ISalePrices {
  weeks: number;
  paymentWeek: number;
  interestRate: number;
  capital: number;
  interest: number;
}

export interface ITVehicle {
  _id: string;
  internalId: string;
  externalId?: string;
  status?: string;
  suffix?:string;
  oldPrice?: number;
  insurance?: boolean;
  deposit?: boolean;
  depositPrice?: number;
  discounts?: TDiscount[];
  forSale?: boolean;
  // salePrice: number;
  salePrices: ISalePrices[];
  insurancePrice?: number;
  engineSN: string;
  registrationCard: string;
  creditTime: number[];
  plate: string;
  score?: number;
  type?: string;
  owner?: string;
  maintenanceCost: number;
  vehicleSN: string;
  brakesCondition: string;
  tankSize: number;
  purchaseCost: number;
  condition: string;
  color: string;
  visible?: boolean;
  purchaseDate?: string;
  rentPrice?: number;
  details: TDetails;
  images?: TImages[];
  brand: TBrand;
  model: TModel;
  cylindersCapacity: TCylindersCapacity;
  country?: TCountry;
  city?: TCity;
  hub: THub;
  brakeType?: string;
  secondaryColor?: string;
  description?: string;
  detail?: string;
  warranty?: string;
  confirmationKM?:boolean;
}

export class TVehicle implements ITVehicle {
  static INTEREST_RATE = 0.52;

  _id: string;
  internalId: string;
  externalId?: string;
  status?: string;
  oldPrice?: number;
  suffix?: string;
  insurance?: boolean;
  deposit?: boolean;
  depositPrice?: number;
  discounts?: TDiscount[];
  forSale?: boolean;
  salePrice?: number;
  salePrices: ISalePrices[];
  insurancePrice?: number;
  engineSN: string;
  registrationCard: string;
  creditTime: number[];
  plate: string;
  score?: number;
  type?: string;
  owner?: string;
  maintenanceCost: number;
  vehicleSN: string;
  brakesCondition: string;
  tankSize: number;
  purchaseCost: number;
  condition: string;
  color: string;
  visible?: boolean;
  purchaseDate?: string;
  rentPrice?: number;
  details: TDetails;
  images?: TImages[];
  brand: TBrand;
  model: TModel;
  cylindersCapacity: TCylindersCapacity;
  country?: TCountry;
  city?: TCity;
  hub: THub;
  brakeType?: string;
  secondaryColor?: string;
  advancedMoney: number;
  description?: string;
  detail?: string;
  warranty?: string;
  confirmationKM?: boolean;


  constructor(data: ITVehicle) {
    this._id = data._id;
    this.internalId = data.internalId;
    this.externalId = data.externalId;
    this.status = data.status;
    this.oldPrice = data.oldPrice;
    this.insurance = data.insurance;
    this.deposit = data.deposit;
    this.depositPrice = data.depositPrice;
    this.discounts = data.discounts;
    this.suffix = data.suffix;
    this.forSale = data.forSale;
    // this.salePrice = data.salePrice;
    this.salePrices = data.salePrices;
    this.insurancePrice = data.insurancePrice;
    this.engineSN = data.engineSN;
    this.registrationCard = data.registrationCard;
    this.creditTime = data.creditTime;
    this.plate = data.plate;
    this.score = data.score;
    this.type = data.type;
    this.owner = data.owner;
    this.maintenanceCost = data.maintenanceCost;
    this.vehicleSN = data.vehicleSN;
    this.brakesCondition = data.brakesCondition;
    this.tankSize = data.tankSize;
    this.purchaseCost = data.purchaseCost;
    this.condition = data.condition;
    this.color = data.color;
    this.visible = data.visible;
    this.purchaseDate = data.purchaseDate;
    this.rentPrice = data.rentPrice;
    this.details = data.details;
    this.images = data.images;
    this.brand = data.brand;
    this.model = data.model;
    this.cylindersCapacity = data.cylindersCapacity;
    this.country = data.country;
    this.city = data.city;
    this.hub = data.hub;
    this.brakeType = data.brakeType;
    this.secondaryColor = data.secondaryColor;
    this.advancedMoney = 0;
    this.description = data.description;
    this.detail = data.detail;
    this.warranty = data.warranty;
    this.confirmationKM = data.confirmationKM;
  }

  getActiveDiscount(): TDiscount | undefined {
    return this.discounts?.find((discount) => discount.status === "active");
  }

  setAdvancedMoney(money: number) {
    this.advancedMoney = money;
  }

  calculatePrice(weeks: number = 52): number {
    // const totalCost = (Number(this.purchaseCost || 0 ) + Number(this.maintenanceCost || 0));
    const totalCost = Number(this.maintenanceCost || 0);
    let price = totalCost * (1 + TVehicle.INTEREST_RATE) ** (weeks / 52);
    if (this.advancedMoney !== 0) {
      price -= this.advancedMoney;
    }
    return Math.ceil(price / weeks);
  }

  getWeeklyPriceWithoutDiscount(weeks: number = 52): number {
    return this.calculatePrice(weeks);
  }

  // hasDiscount(): boolean {
  //   return this.getWeeklyPriceWithoutDiscount() !== this.getWeeklyPrice();
  // }

  getOldPrice(): number {
    return this.oldPrice !== undefined ? this.oldPrice : 0;
  }

  hasDiscountOldPrice(): boolean {
    return this.oldPrice !== undefined && this.oldPrice > this.getWeeklyPrice();
  }

  // getWeeklyPrice(weeks: number = 52): number {
  //   // TODO validar formula
  //   let price = this.calculatePrice(weeks);
  //   const discount = this.getActiveDiscount();

  //   if (discount) {
  //     if (discount.type === "net") {
  //       price -= discount.netValue;
  //     } else {
  //       price *= 1 - discount.percentageValue;
  //     }
  //   }

  //   return Math.ceil(price);
  // }

  // TODO: TRAER EL ULTIMO PARA VALIDAR
  hasDiscount(): boolean {
    if (this.discounts !== undefined) {
      const found = this.discounts.find(
        (discount) => discount.status === "active"
      );
      return !!found;
    }
    return false;
  }

  getDiscount(paymentWeek: number): number {
    if (this.discounts !== undefined) {
      const found = this.discounts.find(
        (discount) => discount.status === "active"
      );
      switch (found?.type) {
        case "percentage":
          return paymentWeek - paymentWeek * found.percentageValue;
        case "net":
          return paymentWeek - found.netValue;

        default:
          return paymentWeek;
      }
    }
    return paymentWeek;
  }

  getWeeklyPriceWithoutDescount(weeks: number = 52): number {
    let paymentWeek = 0;
    const found = this.salePrices.find((price) => price.weeks === weeks);
    if (found) {
      paymentWeek = Math.ceil(found.paymentWeek);
    }
    if (paymentWeek === 0 && this.salePrices.length > 0) {
      paymentWeek = Math.ceil(this.salePrices[0].paymentWeek);
    }
    return paymentWeek;
  }

  getWeeklyPrice(weeks: number = 52): number {
    const paymentWeek = this.getWeeklyPriceWithoutDescount(weeks);

    if (this.hasDiscount()) {
      return this.getDiscount(paymentWeek);
    }

    return paymentWeek;
  }
}

// export interface TVehicle {
//   _id: string;
//   id_internal: string;
//   id_external: string;
//   type: string;
//   rentPrice: number;
//   sellPrice: number;
//   insurance: boolean;
//   insurancePrice: number;
//   score: number;
//   status: string;
//   photos: TMedia[];
//   details: TDetails;
//   country: TCountry;
//   city: TCity;
//   brand: TBrand;
//   cylinder_capacity: TCylinder_capacity;
//   model: TModel;
//   forSell: boolean;
//   deposit: boolean;
//   depositPrice: number;
//   createdAt: Date;
//   km: number;
//   oldPrice: string;
// }
export interface ListVehicles {
  filters: Partial<VehiclesFilters>;
  vehicles: TVehicle[];
}

// type TDetails = {
//     id: string;
//     talla: string;
//     suspencion: boolean;
//     tamanoRueda: string;
//     tipo: string;
//     marco: string;
//     platos: number;
//     cambios: number;
// }
