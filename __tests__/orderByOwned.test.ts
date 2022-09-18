import { orderByOwned } from "../backend/utils/orderByOwned";

describe("orderByOwned", () => {
  test("orderByOwned 1", () => {
    const response = orderByOwned([],[]);
    expect(response).toEqual(false);
  });
});
