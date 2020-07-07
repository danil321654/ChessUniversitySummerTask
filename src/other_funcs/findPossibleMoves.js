import {chars} from "./../constants/chars";
export const findPossibleMoves = (figure, cellId, chess) => {
  switch (figure.piece) {
    case "Pawn":
      let possiblePawnMoves = [];
      switch (figure.color) {
        case "white":
          for (let j = +cellId[1] + 1; j <= +cellId[1] + 2; j++) {
            let curCell = cellId[0] + j.toString();
            if (chess[8 - j][chars.indexOf(cellId[0])].figure) break;
            if (curCell != cellId) possiblePawnMoves.push(curCell);
          }
          return possiblePawnMoves;

        case "black":
          for (let j = +cellId[1] - 2; j >= +cellId[1] - 3; j--) {
            let curCell = cellId[0] + (j + 1).toString();
            if (chess[j][chars.indexOf(cellId[0])].figure) break;
            if (curCell != cellId) possiblePawnMoves.push(curCell);
          }
          return possiblePawnMoves;

        default:
          return [];
      }

    case "Rook":
      let possibleRookMoves = [];
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        let curCell = cellId[0] + j.toString();
        if (chess[8 - j][chars.indexOf(cellId[0])].figure) break;
        if (curCell != cellId) possibleRookMoves.push(curCell);
      }
      for (let j = +cellId[1] - 2; j >= 0; j--) {
        let curCell = cellId[0] + (j + 1).toString();
        if (chess[j][chars.indexOf(cellId[0])].figure) break;
        if (curCell != cellId) possibleRookMoves.push(curCell);
      }
      for (let j = chars.indexOf(cellId[0]); j >= 0; j--) {
        let curCell = chars[j] + cellId[1];
        if (chess[j][+cellId[1] - 1].figure) break;
        if (curCell != cellId) possibleRookMoves.push(curCell);
      }

      for (let j = chars.indexOf(cellId[0]); j < 8; j++) {
        let curCell = chars[j] + cellId[1];
        if (chess[j][+cellId[1] - 1].figure) break;
        if (curCell != cellId) possibleRookMoves.push(curCell);
      }
      return possibleRookMoves;

    case "Knight":
      let possibleKnightMoves = chess
        .map(row =>
          row.filter(
            el =>
              Math.abs(+cellId[1] - el.cellId[1]) +
                Math.abs(
                  chars.indexOf(cellId[0]) - chars.indexOf(el.cellId[0])
                ) ===
                3 &&
              Math.abs(+cellId[1] - el.cellId[1]) !== 0 &&
              Math.abs(
                chars.indexOf(cellId[0]) - chars.indexOf(el.cellId[0])
              ) !== 0 &&
              !el.figure
          )
        )
        .flat(1)
        .map(x => x.cellId);
      console.log(possibleKnightMoves);
      return possibleKnightMoves;

    case "King":
      let possibleKingMoves = chess
        .map(row =>
          row.filter(
            el =>
              (Math.abs(+cellId[1] - el.cellId[1]) +
                Math.abs(
                  chars.indexOf(cellId[0]) - chars.indexOf(el.cellId[0])
                ) ===
                1 ||
                (Math.abs(+cellId[1] - el.cellId[1]) === 1 &&
                  Math.abs(
                    chars.indexOf(cellId[0]) - chars.indexOf(el.cellId[0])
                  ) === 1)) &&
              !el.figure
          )
        )
        .flat(1)
        .map(x => x.cellId);
      console.log(possibleKingMoves);
      return possibleKingMoves;
    default:
      return [];
  }
};
