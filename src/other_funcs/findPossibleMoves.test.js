import {findPossibleMoves} from "./findPossibleMoves.js";
import {fillBoard} from "./fillBoard.js";

describe("finding possible moves of a piece", () => {
  it("should return an array with possible moves", () => {
    expect(
      findPossibleMoves({piece: "Pawn", color: "black"}, "b7", fillBoard())
    ).toEqual(["b6", "b5"]);

    expect(
      findPossibleMoves({piece: "Pawn", color: "white"}, "b2", fillBoard())
    ).toEqual(["b3", "b4"]);

    expect(
      findPossibleMoves({piece: "Knight", color: "white"}, "b1", fillBoard())
    ).toEqual(["a3", "c3"]);
  });
});
