export interface VehicleData {
  internalId: string; 
  brand: {
    name: string;
  };
  model: {
    name: string;
  };
  cylindersCapacity: {
    value: number;
  };
  city: {
    name: string;
  };
  images: {
    url: string;
  }[];
  discounts: {
    netValue: number;
    percentageValue: number;
    status: string;
    type: string;
  }[];
  salePrices: {
    weeks52: {
      paymentWeek: number;
      weeks: number;
    };
    weeks78: {
      paymentWeek: number;
      weeks: number;
    };
    weeks104: {
      paymentWeek: number;
      weeks: number;
    };
  };
  details: {
    year: number;
    milage: number;
  };
  suffix: string;
  creditTime: number[];
}

export interface AllData {
  pages: number;
  page: number;
  count: number;
  data: VehicleData[];
}

export interface VehiclesQueryData {
  getAll: AllData;
}
