import buildVehicleMock from "./mocks/vehicle.mock";

describe("Vehicle Weekly price calculation", () => {
  it("should calculate the weekly price correctly without discounts", () => {
    const vehicle = buildVehicleMock({
      purchaseCost: 33901,
      maintenanceCost: 34019,
      discounts: []
    });
    expect(vehicle.getWeeklyPrice()).toBe(1986);
  });
  it("should calculate the weekly price correctly with a net discount of $780", () => {
    const vehicle = buildVehicleMock({
      purchaseCost: 33901,
      maintenanceCost: 34019,
      discounts: [{
        id: "5e8f8f8f8f8f8f8f8f8f8f8",
        type: "net",
        netValue: 780,
        percentageValue: 0,
        status: "active",
        createdAt: "2020-01-01T00:00:00.000Z",
      }]
    });
    expect(vehicle.getWeeklyPrice()).toBe(1986 - 780);
  });
  it("should calculate the weekly price correctly with a percentage discount of 15%", () => {
    const vehicle = buildVehicleMock({
      purchaseCost: 33901,
      maintenanceCost: 34019,
      discounts: [{
        id: "5e8f8f8f8f8f8f8f8f8f8f8",
        type: "percentage",
        netValue: 0,
        percentageValue: 0.15,
        status: "active",
        createdAt: "2020-01-01T00:00:00.000Z",
      }]
    });
    expect(vehicle.getWeeklyPrice()).toBe(Math.ceil(1986 - (1986 * 0.15)));
  });
  it("should calculate the weekly price correctly with an inactive discount (without applying it)", () => {
    const vehicle = buildVehicleMock({
      purchaseCost: 33901,
      maintenanceCost: 34019,
      discounts: [{
        id: "5e8f8f8f8f8f8f8f8f8f8f8",
        type: "net",
        netValue: 780,
        percentageValue: 0,
        status: "inactive",
        createdAt: "2020-01-01T00:00:00.000Z",
      }]
    });
    expect(vehicle.getWeeklyPrice()).toBe(1986);
  });
});
