import React from "react";
import {createUseStyles} from "react-jss";
import ChessPiece from "./ChessPiece";

const useStyles = createUseStyles({
  cell: {
    zIndex: '0',
    boxSizing: "border-box",
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "2rem",
    boxShadow: "5px -7px 15px 0px rgba(103, 94, 67, 0.7);"
  },
  selected: {
    border: "5px solid green"
  },
  possibleMove: {
    border: "5px solid lightblue"
  },
  possibleBeat: {
    border: "5px solid red"
  },
  checked: {
    border: "5px solid gray"
  }
});

function ChessCell(props) {
  const styles = useStyles();
  const handleClick = () => {
    if (props.selectedPossibleBeat )
      return props.movePiece({cellId: props.cellId, beat: true});
    else if (props.selectedPossibleMove)
      return props.movePiece({cellId: props.cellId, beat: false});
    else if (props.figure) {
      if (props.figure.color == props.curTeamMove)
        return props.selected
          ? props.deselectPiece(props.cellId)
          : props.selectPiece({cellId: props.cellId, figure: props.figure});
    }
    return;
  };
  return (
    <div
      className={
        styles.cell +
        (props.selected ? " " + styles.selected : "") +
        (props.selectedPossibleMove ? " " + styles.possibleMove : "") +
        (props.selectedPossibleBeat ? " " + styles.possibleBeat : "") +
        (props.checked ? " " + styles.checked : "")
      }
      style={{backgroundColor: props.color}}
      onClick={handleClick}
    >
      {props.figure ? <ChessPiece {...props} /> : ""}
    </div>
  );
}

export default ChessCell;
