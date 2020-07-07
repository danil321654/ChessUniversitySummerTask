export const selectPiece = ({cellId, figure}) => ({
  type: "SELECT_PIECE",
  cellId: cellId,
  figure: figure
});
