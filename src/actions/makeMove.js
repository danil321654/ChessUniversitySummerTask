export const makeMove = ({cellIdSource, cellIdTarget}) => ({
  type: "MAKE_MOVE",
  cellIdSource: cellIdSource,
  cellIdTarget: cellIdTarget
});
