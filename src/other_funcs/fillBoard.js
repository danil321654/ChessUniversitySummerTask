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
          figure = {piece: "Rook", color: "white"};
          break;
        case "a8":
        case "h8":
          figure = {piece: "Rook", color: "black"};
          break;
        case "b1":
        case "g1":
          figure = {piece: "Knight", color: "white"};
          break;
        case "b8":
        case "g8":
          figure = {piece: "Knight", color: "black"};
          break;
        case "c1":
        case "f1":
          figure = {piece: "Bishop", color: "white"};
          break;
        case "c8":
        case "f8":
          figure = {piece: "Bishop", color: "black"};
          break;
        case "d1":
          figure = {piece: "King", color: "white"};
          break;
        case "d8":
          figure = {piece: "King", color: "black"};
          break;
        case "e1":
          figure = {piece: "Queen", color: "white"};
          break;
        case "e8":
          figure = {piece: "Queen", color: "black"};
          break;
        default:
          figure = undefined;
          break;
      }
      if (cellId.match(/[a-h]2/))
        figure = figure = {piece: "Pawn", color: "white"};
      if (cellId.match(/[a-h]7/))
        figure = figure = {piece: "Pawn", color: "black"};
      chessboard[i].push({
        cellId: cellId,
        color: (j + i) % 2 !== 0 ? "brown" : "lightblue",
        figure: figure
      });
    }
  }
  return chessboard;
};
