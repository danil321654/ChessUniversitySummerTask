import React, {useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import ChessBoard from "./components/ChessBoard";
import {createUseStyles} from "react-jss";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

import {selectPiece} from "./actions/selectPiece";
import {deselectPiece} from "./actions/deselectPiece";
import {movePiece} from "./actions/movePiece";
import {restartGame} from "./actions/restartGame";

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
  },

  restart: {
    fontSize: "3rem",
    width: '3rem',
    height: '4rem'
  },
  toSettingsButton: {
    fontSize: "6vh !important",
    fontWeight: "900 !important",
    position: "absolute !important",
    right: "0 !important",
    top: "5% !important",
    width: "1rem",
    opacity: "50%"
  }
});

function App(props) {
  const [width, height] = useWindowSize();
  const styles = useStyles();
  return (
    <div
      className={styles.app}
      style={{
        backgroundColor: props.mate ? props.theme.mate : props.theme.background
      }}
    >
      <Link to="/Settings">
        {" "}
        <Button classes={{root: styles.toSettingsButton}}>
          S E T T I N G S
        </Button>
      </Link>
      <div
        className={styles.bigLabel}
        style={{
          color: !props.check
            ? props.curTeamMove
            : props.mate
            ? props.theme.mateText
            : props.check
        }}
      >
        {!props.check
          ? props.curTeamMove + " team move"
          : props.mate
          ? props.check + " mate"
          : props.check + " check!!"}{" "}
        <Button classes={{root: styles.restart}}>
          <FontAwesomeIcon
            className={styles.restart}
            onClick={props.restartGame}
            icon={fas.faRedo}
            color={props.theme.mateText}
          />
        </Button>
      </div>
      <div className={styles.chessWithIconConatiner}>
        {width > 950 ? (
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
        <div></div>
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
    allPossibleWhiteMoves: state.chess.allPossibleWhiteMoves,
    allPossibleBlackMoves: state.chess.allPossibleBlackMoves,
    theme: state.display.theme,
    mate: state.chess.mate
  };
};
const mapDispatchToProps = {
  selectPiece: selectPiece,
  deselectPiece: deselectPiece,
  movePiece: movePiece,
  restartGame: restartGame
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
