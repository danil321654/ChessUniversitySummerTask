import {fillBoard} from "./fillBoard.js";

describe("filling board with cells and their ids", () => {
  it("should properly fill the board", () => {
    expect(fillBoard()[1][1]).toEqual({ id: 'b2', color: 'black', figure: 'pawn' });
  });
});
