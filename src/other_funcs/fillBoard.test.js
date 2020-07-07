import {fillBoard} from "./fillBoard.js";

describe("filling board with cells and their ids", () => {
  it("should properly fill the board", () => {
    expect(fillBoard()[1][1]).toEqual({
      cellId: "b7",
      color: "lightblue",
      figure: {piece: "Pawn", color: "black"}
    });
  });
});
