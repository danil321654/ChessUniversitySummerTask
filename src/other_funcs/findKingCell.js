export const findKingCell = state => {
  let color = state.curTeamMove == "white" ? "black" : "white";
  let neededCell;
  state.chess.map(row =>
    row.map(el => {
      if (el.figure && el.figure.piece == "King" && el.figure.color == color)
        neededCell = el.figure.cellId;
    })
  );
  return neededCell;
};
