import { TVehicle } from "../vehicle.interface";

export default (data?: Partial<TVehicle>) =>
  new TVehicle({
    details: {
      year: "2021",
      milage: 11139,
    },
    discounts: [],
    _id: "62bb6dcbc265344bda08e045",
    internalId: "OMX989",
    brand: {
      _id: "61a09b616ce70c000afef618",
      name: "ITALIKA",
    },
    model: {
      _id: "61a09b7d6ce70c000afef619",
      brand: "61a09b616ce70c000afef618",
      name: "FT",
    },
    cylindersCapacity: {
      _id: "6236f079e7eec56046d92e37",
      value: "200",
    },
    color: "yellow",
    engineSN: "RW167FML2100000196",
    registrationCard: "41655338187",
    plate: "6K4ZL",
    purchaseCost: 22551,
    status: "available",
    country: {
      _id: "60247963b88ce81d7ea7a272",
      tax_name: "IVA",
      tax: 0.16,
      currency: "MXN",
      iso: "MX",
      deposit: 150,
      insurance: 0.2,
      deliveryPrice: 150,
      name: "México",
    },
    city: {
      _id: "602479bab88ce81d7ea7a275",
      country: "60247963b88ce81d7ea7a272",
      name: "Ciudad de México",
    },
    visible: true,
    salePrices: [
      {
        weeks: 52,
        paymentWeek: 731.62,
        interestRate: 52,
        capital: 481.33,
        interest: 250.29,
      },
    ],
    oldPrice: 0,
    images: [],
    creditTime: [52, 78],
    brakesCondition: "good",
    tankSize: 40,
    condition: "good",
    maintenanceCost: 3000,
    purchaseDate: "2022-08-25T00:00:00.000Z",
    vehicleSN: "41655338187",
    hub: {
      _id: "62c86779af7d182793b9dd48",
      city: "602479bab88ce81d7ea7a275",
      name: "Anahuac",
    },
    ...data,
  });
