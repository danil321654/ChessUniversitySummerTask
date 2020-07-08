import {fillBoard} from "./../other_funcs/fillBoard.js";
import {findPossibleMoves} from "./../other_funcs/findPossibleMoves.js";

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
  check: false
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
      let movedState = {
        ...state,
        chess: state.chess.map(row =>
          row.map(el => {
            console.log(el.cellId, "-", state.selectedCell);
            if (el.cellId == state.selectedCell) {
              movedPiece = el.figure;
              return {...el, figure: undefined};
            } else return el;
          })
        ),
        whiteTeam: state.whiteTeam.map(el =>
          el.cellId == state.selectedCell ? {...el, cellId: action.cellId} : el
        ),
        blackTeam: state.blackTeam.map(el =>
          el.cellId == state.selectedCell ? {...el, cellId: action.cellId} : el
        ),
        selectedPossibleMoves: [],
        selectedCell: "none"
      };
      console.log(movedPiece);
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
        }),
        allBlackPossibleMoves: initialBoard.blackTeam.map(el => {
          return {
            cellId: el.cellId,
            possibleMoves: findPossibleMoves(el, el.cellId, movedState.chess)
          };
        })
      };
      return movedState;
      break;
    default:
      return state;
  }
};
