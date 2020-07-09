import React from "react";
import ChessCell from "./ChessCell";
import ChessLabelCell from "./ChessLabelCell";
import {createUseStyles} from "react-jss";
import {chars} from "./../constants/chars";

const useStyles = createUseStyles({
  board: {
    display: "grid",
    gridTemplateColumns: "repeat(9, minmax(40px, 60px))",
    gridTemplateRows: "repeat(9, minmax(40px, 60px))"
  }
});

function ChessBoard(props) {
  const styles = useStyles();
  let extendedBoard = [
    ...props.chess.map((row, idx) => [
      {label: 8 - idx, position: "side"},
      ...row
    ]),
    [
      {label: ""},
      ...chars.map((el, idx) => {
        return {
          label: chars[idx],
          position: "bottom"
        };
      })
    ]
  ];
  let cells = extendedBoard.map((row, idxx) =>
    row.map((cell, idx) =>
      idxx < 8 && idx > 0 && !cell.label ? (
        <ChessCell
          key={idx}
          {...cell}
          selectPiece={props.selectPiece}
          deselectPiece={props.deselectPiece}
          movePiece={props.movePiece}
          beatPiece={props.beatPiece}
          selectedPossibleMove={props.selectedPossibleMoves
            .filter(el => !el.possibleBeat)
            .map(el => el.cellId)
            .includes(cell.cellId)}
          selectedPossibleBeat={props.selectedPossibleMoves
            .filter(el => el.possibleBeat)
            .map(el => el.cellId)
            .includes(cell.cellId)}
          selected={props.selectedCell === cell.cellId}
          checked={
            cell.figure &&
            cell.figure.piece == "King" &&
            cell.figure.color == props.check
          }
          curTeamMove={props.curTeamMove}
        />
      ) : (
        <ChessLabelCell key={idx} label={cell.label} position={cell.position} />
      )
    )
  );
  return <div className={styles.board}>{cells}</div>;
}

export default ChessBoard;
