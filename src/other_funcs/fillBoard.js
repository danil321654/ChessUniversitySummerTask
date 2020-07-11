import {chars} from "./../constants/chars";
export const fillBoard = () => {
  let chessboard = [];
  for (let i = 0; i < 8; i++) {
    chessboard.push([]);
    for (let j = 0; j < 8; j++) {
      let cellId = chars[j] + (8 - i).toString();
      let figure;
      switch (cellId) {
        case "a1":
        case "h1":
          figure = {piece: "Rook", color: "white", cellId: cellId};
          break;
        case "a8":
        case "h8":
          figure = {piece: "Rook", color: "black", cellId: cellId};
          break;
        case "b1":
        case "g1":
          figure = {piece: "Knight", color: "white", cellId: cellId};
          break;
        case "b8":
        case "g8":
          figure = {piece: "Knight", color: "black", cellId: cellId};
          break;
        case "c1":
        case "f1":
          figure = {piece: "Bishop", color: "white", cellId: cellId};
          break;
        case "c8":
        case "f8":
          figure = {piece: "Bishop", color: "black", cellId: cellId};
          break;
        case "d1":
          figure = {piece: "King", color: "white", cellId: cellId};
          break;
        case "d8":
          figure = {piece: "King", color: "black", cellId: cellId};
          break;
        case "e1":
          figure = {piece: "Queen", color: "white", cellId: cellId};
          break;
        case "e8":
          figure = {piece: "Queen", color: "black", cellId: cellId};
          break;
        default:
          figure = undefined;
          break;
      }
      if (cellId.match(/[a-h]2/))
        figure = figure = {
          piece: "Pawn",
          color: "white",
          moved: false,
          cellId: cellId
        };
      if (cellId.match(/[a-h]7/))
        figure = figure = {
          piece: "Pawn",
          color: "black",
          moved: false,
          cellId: cellId
        };
      chessboard[i].push({
        cellId: cellId,
        color:
          (j + i) % 2 !== 0 ? "rgba(70, 44, 23, 0.93)" : "rgb(136, 100, 61)",
        figure: figure ? {...figure, cellId: cellId} : figure
      });
    }
  }
  return chessboard;
};
