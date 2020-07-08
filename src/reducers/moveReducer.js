let initialState = {
  whiteTeam: [fillBoard().filter],
  blackTeam: [],
  allPossibleMoves: [],
  check: false
};

export const moveReducer = (state = initialBoard, action) => {
  switch (action.type) {
    case "MOVE_PIECE":
      return state;
      break;
    default:
      return state;
  }
};
