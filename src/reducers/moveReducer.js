let initialBoard = {whiteTeam: fillBoard(), blackTeam: "none"};

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
