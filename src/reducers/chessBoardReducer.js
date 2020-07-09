import {fillBoard} from "./../other_funcs/fillBoard.js";
import {findPossibleMoves} from "./../other_funcs/findPossibleMoves.js";
import {chars} from "./../constants/chars";

let initialBoard = {
  chess: fillBoard(),
  selectedCell: "none",
  whiteTeam: fillBoard()
    .map(row =>
      row
        .filter(el => el.figure && el.figure.color === "white")
        .map(el => el.figure)
    )
    .flat(1),
  blackTeam: fillBoard()
    .map(row =>
      row
        .filter(el => el.figure && el.figure.color === "black")
        .map(el => el.figure)
    )
    .flat(1),
  selectedPossibleMoves: [],
  curTeamMove: "white",
  check: undefined
};
initialBoard = {
  ...initialBoard,
  allWhitePossibleMoves: initialBoard.whiteTeam.map(el => {
    return {
      cellId: el.cellId,
      possibleMoves: findPossibleMoves(el, el.cellId, initialBoard.chess)
    };
  }),
  allBlackPossibleMoves: initialBoard.blackTeam.map(el => {
    return {
      cellId: el.cellId,
      possibleMoves: findPossibleMoves(el, el.cellId, initialBoard.chess)
    };
  })
};

export const chessBoardReducer = (state = initialBoard, action) => {
  console.log("state", state);
  switch (action.type) {
    case "SELECT_PIECE":
      return {
        ...state,
        selectedCell: action.cellId,
        selectedPossibleMoves: findPossibleMoves(
          action.figure,
          action.cellId,
          state.chess
        )
      };
      break;
    case "DESELECT_PIECE":
      return {...state, selectedCell: "none", selectedPossibleMoves: []};
      break;

    case "MOVE_PIECE":
      let movedPiece;
      let movedState = state;
      let curTeamMove = state.curTeamMove == "white" ? "black" : "white";
      if (action.beat)
        movedState = {
          ...movedState,
          chess: movedState.chess.map(row =>
            row.map(el => {
              if (el.cellId == action.cellId) {
                return {...el, figure: undefined};
              } else return el;
            })
          ),
          whiteTeam: movedState.whiteTeam.filter(
            el => el.cellId !== action.cellId
          ),
          blackTeam: movedState.blackTeam.filter(
            el => el.cellId !== action.cellId
          ),
          selectedPossibleMoves: []
        };
      movedState = {
        ...movedState,
        chess: movedState.chess.map(row =>
          row.map(el => {
            if (el.cellId == movedState.selectedCell) {
              movedPiece = el.figure;
              return {...el, figure: undefined};
            } else return el;
          })
        ),
        whiteTeam: movedState.whiteTeam.map(el =>
          el.cellId == movedState.selectedCell
            ? {...el, cellId: action.cellId}
            : el
        ),
        blackTeam: movedState.blackTeam.map(el =>
          el.cellId == movedState.selectedCell
            ? {...el, cellId: action.cellId}
            : el
        ),
        selectedPossibleMoves: [],
        selectedCell: "none",
        curTeamMove: curTeamMove
      };
      movedState = {
        ...movedState,
        chess: movedState.chess.map(row =>
          row.map(el =>
            el.cellId == action.cellId
              ? {...el, figure: {...movedPiece, moved: true}}
              : el
          )
        )
      };
      movedState = {
        ...movedState,
        allWhitePossibleMoves: movedState.whiteTeam.map(el => {
          return {
            cellId: el.cellId,
            possibleMoves: findPossibleMoves(el, el.cellId, movedState.chess)
          };
        })
      };

      movedState = {
        ...movedState,
        allBlackPossibleMoves: movedState.blackTeam.map(el => {
          return {
            cellId: el.cellId,
            possibleMoves: findPossibleMoves(el, el.cellId, movedState.chess)
          };
        })
      };
      let check = undefined;
      movedState.allWhitePossibleMoves.map(cell => {
        cell.possibleMoves.map(possibleMove => {
          console.log(possibleMove);
          if (
            possibleMove.possibleBeat &&
            movedState.chess[8 - +possibleMove.cellId[1]][
              chars.indexOf(possibleMove.cellId[0])
            ].figure.piece == "King"
          )
            check = "black";
          console.log(
            movedState.chess[8 - possibleMove.cellId[1]][
              chars.indexOf(possibleMove.cellId[0])
            ]
          );
          return possibleMove;
        });
        return cell;
      });
      movedState.allBlackPossibleMoves.map(cell => {
        cell.possibleMoves.map(possibleMove => {
        //  console.log(possibleMove);
          if (
            possibleMove.possibleBeat &&
            movedState.chess[8 - +possibleMove.cellId[1]][
              chars.indexOf(possibleMove.cellId[0])
            ].figure.piece == "King"
          )
            check = "white";
          return possibleMove;
        });
        return cell;
      });
      console.log("movedState", movedState);
      return {...movedState, check: check};
      break;

    default:
      return state;
  }
};
