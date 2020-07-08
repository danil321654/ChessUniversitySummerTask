import React from "react";
import {connect} from "react-redux";
import ChessBoard from "./components/ChessBoard";
import {createUseStyles} from "react-jss";
import {selectPiece} from "./actions/selectPiece";
import {deselectPiece} from "./actions/deselectPiece";
import {movePiece} from "./actions/movePiece";

const useStyles = createUseStyles({
  app: {
    minWidth: "800px",
    minHeight: "600px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  }
});

function App(props) {
  const styles = useStyles();
  return (
    <div className={styles.app}>
      <ChessBoard {...props} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    chess: state.chess.chess,
    selectedCell: state.chess.selectedCell,
    selectedPossibleMoves: state.chess.selectedPossibleMoves
  };
};
const mapDispatchToProps = {
  selectPiece: selectPiece,
  deselectPiece: deselectPiece,
  movePiece: movePiece
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
