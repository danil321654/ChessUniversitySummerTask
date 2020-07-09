export const movePiece = ({cellId, beat}) => ({
  type: "MOVE_PIECE",
  cellId: cellId,
  beat: beat
});
