import { orderByOwned } from "../backend/utils/orderByOwned";
import nftList from "./testData/nftList.json";

describe("orderByOwned", () => {
  test("orderByOwned 1", () => {
    const response = orderByOwned(nftList,[
      {
        address: "0x1",
        tokenAddressTokenId: "0x2_1",
        amount: 1
      },
      {
        address: "0x1",
        tokenAddressTokenId: "0x2_2",
        amount: 1
      }
    ]);
    expect(response).toEqual({
      owned: nftList,
      notOwned: [],
    });
  });

  test("orderByOwned 2", () => {
    const response = orderByOwned(nftList,[
      {
        address: "0x1",
        tokenAddressTokenId: "0x2_3",
        amount: 1
      },
      {
        address: "0x1",
        tokenAddressTokenId: "0x2_2",
        amount: 1
      }
    ]);
    expect(response).toEqual({
      owned: [nftList[1]],
      notOwned: [nftList[0]],
    });
  });
});
