import React, {useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {createUseStyles} from "react-jss";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";
import {far} from "@fortawesome/free-regular-svg-icons";

import {changeTheme} from "./../actions/changeTheme";
import {saveGame} from "./../actions/saveGame";
import {loadGame} from "./../actions/loadGame";
import {deleteSave} from "./../actions/deleteSave";

fontawesome.library.add(fas, far);

const useStyles = createUseStyles({
  settings: {
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
  toGameButton: {
    fontSize: "3rem !important",
    fontWeight: "900 !important",
    position: "absolute !important",
    left: "0 !important",
    top: "35vh !important",
    width: "1rem",
    opacity: "50%"
  }
});

function Settings(props) {
  const [textColor, changeColor] = useState(
    props.theme.name == "light" ? "black" : "lightgray"
  );
  const styles = useStyles();
  return (
    <div
      className={styles.settings}
      style={{
        backgroundColor: props.theme.background
      }}
    >
      <Link to="/Game">
        {" "}
        <Button classes={{root: styles.toGameButton}}>G A M E</Button>
      </Link>
      <div
        className={styles.bigLabel}
        style={{
          color: props.theme.mateText //"purple"
        }}
      >
        settings
      </div>
      <div>
        <Button
          onClick={() => {
            changeColor(props.theme.name == "light" ? "lightgray" : "black");
            props.changeTheme(props.theme.name);
          }}
        >
          {" "}
          {
            <FontAwesomeIcon
              icon={
                props.theme.name == "light" ? far.faLightbulb : fas.faLightbulb
              }
              color={textColor}
              className={styles.bigLabel}
            />
          }
        </Button>
      </div>
      <div>
        <Button onClick={props.saveGame}>
          <FontAwesomeIcon icon={fas.faSave} color={textColor} />{" "}
        </Button>
        {props.saved ? (
          <Button onClick={props.loadGame}>
            {" "}
            <FontAwesomeIcon icon={fas.faUpload} color={textColor} />
          </Button>
        ) : (
          <Button onClick={props.loadGame} disabled>
            {" "}
            <FontAwesomeIcon icon={fas.faUpload} color={'rgba(122, 116, 113, 0.4)'} />{" "}
          </Button>
        )}
        <Button onClick={props.deleteSave}>
          <FontAwesomeIcon icon={fas.faTrashAlt} color={textColor} />{" "}
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.display.theme,
    saved: state.display.saved
  };
};
const mapDispatchToProps = {
  changeTheme: changeTheme,
  saveGame: saveGame,
  loadGame: loadGame,
  deleteSave: deleteSave
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
