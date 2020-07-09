import React, {useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import ChessBoard from "./components/ChessBoard";
import {createUseStyles} from "react-jss";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

import {selectPiece} from "./actions/selectPiece";
import {deselectPiece} from "./actions/deselectPiece";
import {movePiece} from "./actions/movePiece";
import {beatPiece} from "./actions/beatPiece";

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

fontawesome.library.add(fas);

const useStyles = createUseStyles({
  app: {
    minWidth: "800px",
    minHeight: "600px",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    alignItems: "center"
  },
  bigLabel: {
    fontFamily: ' "Comic Sans MS", cursive, sans-serif',
    fontWeight: 900,
    fontSize: "5rem"
  },
  chessWithIconConatiner: {
    maxWidth: "1000px",
    maxHeight: "800px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  decorativeFiguresKing: {
    fontSize: "10rem",
    transform: "rotate(-15deg)",
    color: "white"
  },

  decorativeFiguresPawn: {
    fontSize: "12rem",
    transform: "rotate(20deg)"
  }
});

function App(props) {
  const [width, height] = useWindowSize();
  const styles = useStyles();
  return (
    <div className={styles.app} style={{backgroundColor: props.themeColor}}>
      <div className={styles.bigLabel} style={{color: !props.check
        ? props.curTeamMove : props.check}}>
        {!props.check
          ? props.curTeamMove + " team move"
          : props.check + " check!!"}
      </div>
      <div className={styles.chessWithIconConatiner}>
        {width > 870 ? (
          <div>
            <FontAwesomeIcon
              className={styles.decorativeFiguresKing}
              icon={fas.faChessKing}
            />
            <FontAwesomeIcon
              className={styles.decorativeFiguresPawn}
              icon={fas.faChessPawn}
            />
          </div>
        ) : (
          ""
        )}
        <ChessBoard {...props} />
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    chess: state.chess.chess,
    selectedCell: state.chess.selectedCell,
    selectedPossibleMoves: state.chess.selectedPossibleMoves,
    curTeamMove: state.chess.curTeamMove,
    check: state.chess.check,
    themeColor: state.display.themeColor
  };
};
const mapDispatchToProps = {
  selectPiece: selectPiece,
  deselectPiece: deselectPiece,
  movePiece: movePiece,
  beatPiece: beatPiece
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
