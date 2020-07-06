import React from "react";
import {createUseStyles} from "react-jss";
import ChessPiece from "./ChessPiece";

const useStyles = createUseStyles({
  cell: {
    boxSizing: "border-box",
    width: "100%",
    height: "100"
  },
  selected: {
    border: "5px solid green"
  }
});

function ChessCell(props) {
  const styles = useStyles();
  const handleClick = () => {
    console.log(props);
    if (props.figure)
      return props.selected
        ? props.deselectPiece(props.cellId)
        : props.selectPiece(props.cellId);
    return;
  };
  return (
    <div
      className={styles.cell + (props.selected ? " " + styles.selected : "")}
      style={{backgroundColor: props.color}}
      onClick={handleClick}
    >
      {props.figure ? <ChessPiece {...props} /> : ""}
    </div>
  );
}

export default ChessCell;
