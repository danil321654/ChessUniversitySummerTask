import {chars} from "./../constants/chars";
export const findPossibleMoves = (figure, cellId, chess) => {
  switch (figure.piece) {
    case "Pawn":
      let possiblePawnMoves = [];
      let step = figure.moved ? 1 : 2; //Pawn on the start can move two steps forward
      switch (figure.color) {
        case "white":
          for (let j = +cellId[1] + 1; j <= 8 && j <= +cellId[1] + step; j++) {
            if (chess[8 - j][chars.indexOf(cellId[0])]) {
              let curCell = chess[8 - j][chars.indexOf(cellId[0])].cellId;
              if (
                cellId[0] !== "a" &&
                chess[8 - j][chars.indexOf(cellId[0]) - 1].figure &&
                chess[8 - j][chars.indexOf(cellId[0]) - 1].figure.color ==
                  "black"
              )
                possiblePawnMoves.push({
                  cellId: chess[8 - j][chars.indexOf(cellId[0]) - 1].cellId,
                  possibleBeat: true
                });
              if (
                cellId[0] !== "h" &&
                chess[8 - j][chars.indexOf(cellId[0]) + 1].figure &&
                chess[8 - j][chars.indexOf(cellId[0]) + 1].figure.color ==
                  "black"
              )
                possiblePawnMoves.push({
                  cellId: chess[8 - j][chars.indexOf(cellId[0]) + 1].cellId,
                  possibleBeat: true
                });
              if (chess[8 - j][chars.indexOf(cellId[0])].figure) break;
              possiblePawnMoves.push({cellId: curCell, possibleBeat: false});
            }
          }
          return possiblePawnMoves;

        case "black":
          for (let j = +cellId[1] - 1; j > 0 && j >= +cellId[1] - step; j--) {
            if (chess[8 - j][chars.indexOf(cellId[0])]) {
              let curCell = chess[8 - j][chars.indexOf(cellId[0])].cellId;
              if (
                cellId[0] !== "a" &&
                chess[8 - j][chars.indexOf(cellId[0]) - 1].figure &&
                chess[8 - j][chars.indexOf(cellId[0]) - 1].figure.color ==
                  "white"
              )
                possiblePawnMoves.push({
                  cellId: chess[8 - j][chars.indexOf(cellId[0]) - 1].cellId,
                  possibleBeat: true
                });
              if (
                cellId[0] !== "h" &&
                chess[8 - j][chars.indexOf(cellId[0]) + 1].figure &&
                chess[8 - j][chars.indexOf(cellId[0]) + 1].figure.color ==
                  "white"
              )
                possiblePawnMoves.push({
                  cellId: chess[8 - j][chars.indexOf(cellId[0]) + 1].cellId,
                  possibleBeat: true
                });
              if (chess[8 - j][chars.indexOf(cellId[0])].figure) break;
              possiblePawnMoves.push({cellId: curCell, possibleBeat: false});
            }
          }
          return possiblePawnMoves;

        default:
          return [];
      }

    case "Rook":
      let possibleRookMoves = [];
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (chess[8 - j][chars.indexOf(cellId[0])]) {
          let curCell = chess[8 - j][chars.indexOf(cellId[0])].cellId;
          if (chess[8 - j][chars.indexOf(cellId[0])].figure) break;
          possibleRookMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = +cellId[1] - 1; j > 0; j--) {
        if (chess[8 - j][chars.indexOf(cellId[0])]) {
          let curCell = chess[8 - j][chars.indexOf(cellId[0])].cellId;
          if (chess[8 - j][chars.indexOf(cellId[0])].figure) break;
          possibleRookMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = chars.indexOf(cellId[0]) - 1; j >= 0; j--) {
        let curCell = chars[j] + cellId[1];
        if (chess[+cellId[1] - 1][j].figure) break;
        possibleRookMoves.push({cellId: curCell, possibleBeat: false});
      }
      for (let j = chars.indexOf(cellId[0]) + 1; j < 8; j++) {
        let curCell = chars[j] + cellId[1];
        if (chess[+cellId[1] - 1][j].figure) break;
        possibleRookMoves.push({cellId: curCell, possibleBeat: false});
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
        .map(x => {
          return {cellId: x.cellId, possibleBeat: false};
        });
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
        .map(x => {
          return {cellId: x.cellId, possibleBeat: false};
        });
      console.log(possibleKingMoves);
      return possibleKingMoves;

    case "Bishop":
      let possibleBishopMoves = [];
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        console.log("BishopMoves", j);
        if (chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]]) {
          let curCell =
            chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]].cellId;
          if (chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]].figure)
            break;
          possibleBishopMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]]) {
          let curCell =
            chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]].cellId;
          if (chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]].figure)
            break;
          possibleBishopMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = 8 - cellId[1] + 1; j < 8; j++) {
        if (chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]]) {
          let curCell =
            chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]].cellId;
          if (chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]].figure)
            break;
          possibleBishopMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = 8 - cellId[1] + 1; j < 8; j++) {
        if (chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]]) {
          let curCell =
            chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]].cellId;
          if (chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]].figure)
            break;
          possibleBishopMoves.push({cellId: curCell, possibleBeat: false});
        }
      }

      console.log(possibleBishopMoves);
      return possibleBishopMoves;
    case "Queen":
      let possibleQueenMoves = [];
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        console.log("BishopMoves", j);
        if (chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]]) {
          let curCell =
            chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]].cellId;
          if (chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]].figure)
            break;
          possibleQueenMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]]) {
          let curCell =
            chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]].cellId;
          if (chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]].figure)
            break;
          possibleQueenMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = 8 - cellId[1] + 1; j < 8; j++) {
        if (chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]]) {
          let curCell =
            chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]].cellId;
          if (chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]].figure)
            break;
          possibleQueenMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = 8 - cellId[1] + 1; j < 8; j++) {
        if (chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]]) {
          let curCell =
            chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]].cellId;
          if (chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]].figure)
            break;
          possibleQueenMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (chess[8 - j][chars.indexOf(cellId[0])]) {
          let curCell = chess[8 - j][chars.indexOf(cellId[0])].cellId;
          if (chess[8 - j][chars.indexOf(cellId[0])].figure) break;
          possibleQueenMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = +cellId[1] - 1; j > 0; j--) {
        if (chess[8 - j][chars.indexOf(cellId[0])]) {
          let curCell = chess[8 - j][chars.indexOf(cellId[0])].cellId;
          if (chess[8 - j][chars.indexOf(cellId[0])].figure) break;
          possibleQueenMoves.push({cellId: curCell, possibleBeat: false});
        }
      }
      for (let j = chars.indexOf(cellId[0]) - 1; j >= 0; j--) {
        let curCell = chars[j] + cellId[1];
        if (chess[+cellId[1] - 1][j].figure) break;
        possibleQueenMoves.push({cellId: curCell, possibleBeat: false});
      }
      for (let j = chars.indexOf(cellId[0]) + 1; j < 8; j++) {
        let curCell = chars[j] + cellId[1];
        if (chess[+cellId[1] - 1][j].figure) break;
        possibleQueenMoves.push({cellId: curCell, possibleBeat: false});
      }
      console.log(possibleQueenMoves);
      return possibleQueenMoves;
    default:
      return [];
  }
};
