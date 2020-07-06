import {fillBoard} from "./../other_funcs/fillBoard.js";
let initialBoard = {chess: fillBoard(), selectedCell: "none"};

export const chessBoardReducer = (state = initialBoard, action) => {
  switch (action.type) {
    case "SELECT_PIECE":
      return {...state, selectedCell: action.cellId};
      break;
    case "DESELECT_PIECE":
      return {...state, selectedCell: "none"};
      break;
    default:
      return state;
  }
};
