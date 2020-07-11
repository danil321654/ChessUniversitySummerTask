import {chars} from "./../constants/chars";

export const findPossibleMoves = (figure, cellId, state) => {
  let possibleMoves = [];
  switch (figure.piece) {
    case "Pawn":
      let possiblePawnMoves = [];
      let step = figure.moved ? 1 : 2; //Pawn on the start can move two steps forward
      switch (figure.color) {
        case "white":
          for (let j = +cellId[1] + 1; j <= 8 && j <= +cellId[1] + step; j++) {
            if (state.chess[8 - j][chars.indexOf(cellId[0])]) {
              let curCell = state.chess[8 - j][chars.indexOf(cellId[0])].cellId;
              if (
                cellId[0] !== "a" &&
                state.chess[8 - j][chars.indexOf(cellId[0]) - 1].figure &&
                state.chess[8 - j][chars.indexOf(cellId[0]) - 1].figure.color ==
                  "black" &&
                Math.abs(+cellId[1] - j) == 1
              )
                possiblePawnMoves.push({
                  figure: figure,
                  cellId:
                    state.chess[8 - j][chars.indexOf(cellId[0]) - 1].cellId,
                  possibleBeat: true
                });
              if (
                cellId[0] !== "h" &&
                state.chess[8 - j][chars.indexOf(cellId[0]) + 1].figure &&
                state.chess[8 - j][chars.indexOf(cellId[0]) + 1].figure.color ==
                  "black" &&
                Math.abs(+cellId[1] - j) == 1
              )
                possiblePawnMoves.push({
                  figure: figure,
                  cellId:
                    state.chess[8 - j][chars.indexOf(cellId[0]) + 1].cellId,
                  possibleBeat: true
                });
              if (state.chess[8 - j][chars.indexOf(cellId[0])].figure) break;
              possiblePawnMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: false
              });
            }
          }
          possibleMoves = possiblePawnMoves;
          break;

        case "black":
          for (let j = +cellId[1] - 1; j > 0 && j >= +cellId[1] - step; j--) {
            if (state.chess[8 - j][chars.indexOf(cellId[0])]) {
              let curCell = state.chess[8 - j][chars.indexOf(cellId[0])].cellId;
              if (
                cellId[0] !== "a" &&
                state.chess[8 - j][chars.indexOf(cellId[0]) - 1].figure &&
                state.chess[8 - j][chars.indexOf(cellId[0]) - 1].figure.color ==
                  "white" &&
                Math.abs(+cellId[1] - j) == 1
              )
                possiblePawnMoves.push({
                  figure: figure,
                  cellId:
                    state.chess[8 - j][chars.indexOf(cellId[0]) - 1].cellId,
                  possibleBeat: true
                });
              if (
                cellId[0] !== "h" &&
                state.chess[8 - j][chars.indexOf(cellId[0]) + 1].figure &&
                state.chess[8 - j][chars.indexOf(cellId[0]) + 1].figure.color ==
                  "white" &&
                Math.abs(+cellId[1] - j) == 1
              )
                possiblePawnMoves.push({
                  figure: figure,
                  cellId:
                    state.chess[8 - j][chars.indexOf(cellId[0]) + 1].cellId,
                  possibleBeat: true
                });
              if (state.chess[8 - j][chars.indexOf(cellId[0])].figure) break;
              possiblePawnMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: false
              });
            }
          }
          possibleMoves = possiblePawnMoves;
          break;

        default:
          possibleMoves = [];
          break;
      }
      break;

    case "Rook":
      let possibleRookMoves = [];
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (state.chess[8 - j][chars.indexOf(cellId[0])]) {
          let curCell = state.chess[8 - j][chars.indexOf(cellId[0])].cellId;
          if (state.chess[8 - j][chars.indexOf(cellId[0])].figure) {
            if (
              state.chess[8 - j][chars.indexOf(cellId[0])].figure.color !=
              figure.color
            )
              possibleRookMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleRookMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = +cellId[1] - 1; j > 0; j--) {
        if (state.chess[8 - j][chars.indexOf(cellId[0])]) {
          let curCell = state.chess[8 - j][chars.indexOf(cellId[0])].cellId;
          if (state.chess[8 - j][chars.indexOf(cellId[0])].figure) {
            if (
              state.chess[8 - j][chars.indexOf(cellId[0])].figure.color !=
              figure.color
            )
              possibleRookMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleRookMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = chars.indexOf(cellId[0]) - 1; j >= 0; j--) {
        let curCell = state.chess[8 - cellId[1]][j].cellId;
        if (state.chess[8 - cellId[1]][j].figure) {
          if (state.chess[8 - cellId[1]][j].figure.color != figure.color)
            possibleRookMoves.push({
              figure: figure,
              cellId: curCell,
              possibleBeat: true
            });
          break;
        }
        possibleRookMoves.push({
          figure: figure,
          cellId: curCell,
          possibleBeat: false
        });
      }
      for (let j = chars.indexOf(cellId[0]) + 1; j < 8; j++) {
        let curCell = state.chess[8 - cellId[1]][j].cellId;
        if (state.chess[8 - cellId[1]][j].figure) {
          if (state.chess[8 - cellId[1]][j].figure.color !== figure.color)
            possibleRookMoves.push({
              figure: figure,
              cellId: curCell,
              possibleBeat: true
            });
          break;
        }
        possibleRookMoves.push({
          figure: figure,
          cellId: curCell,
          possibleBeat: false
        });
      }
      possibleMoves = possibleRookMoves;
      break;

    case "Knight":
      let possibleKnightMoves = state.chess
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
              (!el.figure || (el.figure && el.figure.color !== figure.color))
          )
        )
        .flat(1)
        .map(x => {
          return {
            figure: figure,
            cellId: x.cellId,
            possibleBeat: x.figure ? true : false
          };
        });
      possibleMoves = possibleKnightMoves;
      break;

    case "King":
      let possibleKingMoves = state.chess
        .map(row =>
          row.filter(el => {
            return (
              (Math.abs(+cellId[1] - el.cellId[1]) +
                Math.abs(
                  chars.indexOf(cellId[0]) - chars.indexOf(el.cellId[0])
                ) ===
                1 ||
                (Math.abs(+cellId[1] - el.cellId[1]) === 1 &&
                  Math.abs(
                    chars.indexOf(cellId[0]) - chars.indexOf(el.cellId[0])
                  ) === 1)) &&
              (!el.figure || (el.figure && el.figure.color !== figure.color))
            );
          })
        )
        .flat(1)
        .map(x => {
          return {
            figure: figure,
            cellId: x.cellId,
            possibleBeat: x.figure ? true : false
          };
        });
      possibleMoves = possibleKingMoves;
      break;

    case "Bishop":
      let possibleBishopMoves = [];
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (state.chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]]) {
          let curCell =
            state.chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]].cellId;
          if (
            state.chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]].figure
          ) {
            if (
              state.chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]]
                .figure.color !== figure.color
            )
              possibleBishopMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleBishopMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (state.chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]]) {
          let curCell =
            state.chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]]
              .cellId;
          if (
            state.chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]].figure
          ) {
            if (
              state.chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]]
                .figure.color !== figure.color
            )
              possibleBishopMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleBishopMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = 8 - cellId[1] + 1; j < 8; j++) {
        if (state.chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]]) {
          let curCell =
            state.chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]].cellId;
          if (
            state.chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]].figure
          ) {
            if (
              state.chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]]
                .figure.color !== figure.color
            )
              possibleBishopMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleBishopMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = 8 - cellId[1] + 1; j < 8; j++) {
        if (state.chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]]) {
          let curCell =
            state.chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]]
              .cellId;
          if (
            state.chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]].figure
          ) {
            if (
              state.chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]]
                .figure.color !== figure.color
            )
              possibleBishopMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleBishopMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      possibleMoves = possibleBishopMoves;
      break;
    case "Queen":
      let possibleQueenMoves = [];
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (state.chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]]) {
          let curCell =
            state.chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]].cellId;
          if (
            state.chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]].figure
          ) {
            if (
              state.chess[8 - j][chars.indexOf(cellId[0]) + j - cellId[1]]
                .figure.color !== figure.color
            )
              possibleQueenMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleQueenMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (state.chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]]) {
          let curCell =
            state.chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]]
              .cellId;
          if (
            state.chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]].figure
          ) {
            if (
              state.chess[8 - j][chars.indexOf(cellId[0]) - j + +cellId[1]]
                .figure.color !== figure.color
            )
              possibleQueenMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleQueenMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = 8 - cellId[1] + 1; j < 8; j++) {
        if (state.chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]]) {
          let curCell =
            state.chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]].cellId;
          if (
            state.chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]].figure
          ) {
            if (
              state.chess[j][chars.indexOf(cellId[0]) - j + 8 - cellId[1]]
                .figure.color !== figure.color
            )
              possibleQueenMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleQueenMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = 8 - cellId[1] + 1; j < 8; j++) {
        if (state.chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]]) {
          let curCell =
            state.chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]]
              .cellId;
          if (
            state.chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]].figure
          ) {
            if (
              state.chess[j][chars.indexOf(cellId[0]) + j - 8 + +cellId[1]]
                .figure.color !== figure.color
            )
              possibleQueenMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleQueenMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = +cellId[1] + 1; j <= 8; j++) {
        if (state.chess[8 - j][chars.indexOf(cellId[0])]) {
          let curCell = state.chess[8 - j][chars.indexOf(cellId[0])].cellId;
          if (state.chess[8 - j][chars.indexOf(cellId[0])].figure) {
            if (
              state.chess[8 - j][chars.indexOf(cellId[0])].figure.color !=
              figure.color
            )
              possibleQueenMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleQueenMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = +cellId[1] - 1; j > 0; j--) {
        if (state.chess[8 - j][chars.indexOf(cellId[0])]) {
          let curCell = state.chess[8 - j][chars.indexOf(cellId[0])].cellId;
          if (state.chess[8 - j][chars.indexOf(cellId[0])].figure) {
            if (
              state.chess[8 - j][chars.indexOf(cellId[0])].figure.color !=
              figure.color
            )
              possibleQueenMoves.push({
                figure: figure,
                cellId: curCell,
                possibleBeat: true
              });
            break;
          }
          possibleQueenMoves.push({
            figure: figure,
            cellId: curCell,
            possibleBeat: false
          });
        }
      }
      for (let j = chars.indexOf(cellId[0]) - 1; j >= 0; j--) {
        let curCell = state.chess[8 - cellId[1]][j].cellId;
        if (state.chess[8 - cellId[1]][j].figure) {
          if (state.chess[8 - cellId[1]][j].figure.color != figure.color)
            possibleQueenMoves.push({
              figure: figure,
              cellId: curCell,
              possibleBeat: true
            });
          break;
        }
        possibleQueenMoves.push({
          figure: figure,
          cellId: curCell,
          possibleBeat: false
        });
      }
      for (let j = chars.indexOf(cellId[0]) + 1; j < 8; j++) {
        let curCell = state.chess[8 - cellId[1]][j].cellId;
        if (state.chess[8 - cellId[1]][j].figure) {
          if (state.chess[8 - cellId[1]][j].figure.color !== figure.color)
            possibleQueenMoves.push({
              figure: figure,
              cellId: curCell,
              possibleBeat: true
            });
          break;
        }
        possibleQueenMoves.push({
          figure: figure,
          cellId: curCell,
          possibleBeat: false
        });
      }
      console.log("queenqwe", possibleQueenMoves);
      possibleMoves = possibleQueenMoves;
      break;
    default:
      possibleMoves = [];
      break;
  }
  return possibleMoves;
};
