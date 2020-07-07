import {fillBoard} from "./../other_funcs/fillBoard.js";
import {findPossibleMoves} from "./../other_funcs/findPossibleMoves.js";

let initialBoard = {
  chess: fillBoard(),
  selectedCell: "none",
  possibleMoves: []
};

export const chessBoardReducer = (state = initialBoard, action) => {
  switch (action.type) {
    case "SELECT_PIECE":
    console.log(state.chess);
      return {
        ...state,
        selectedCell: action.cellId,
        possibleMoves: findPossibleMoves(
          action.figure,
          action.cellId,
          state.chess
        )
      };
      break;
    case "DESELECT_PIECE":
      return {...state, selectedCell: "none", possibleMoves: []};
      break;
    default:
      return state;
  }
};
