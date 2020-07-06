import React from "react";
import ChessCell from "./ChessCell";
import {createUseStyles} from "react-jss";

const useStyles = createUseStyles({
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(8, minmax(40px, 60px))",
    gridTemplateRows: "repeat(8, minmax(40px, 60px))"
  }
});

function ChessBoard(props) {
  const styles = useStyles();
  let cells = props.chess.map(row =>
    row.map((cell, idx) => (
      <ChessCell
        key={idx}
        {...cell}
        selectPiece={props.selectPiece}
        deselectPiece={props.deselectPiece}
        selected={props.selectedCell === cell.cellId}
      />
    ))
  );
  return <div className={styles.board}>{cells}</div>;
}

export default ChessBoard;
