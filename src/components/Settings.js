import React, {useLayoutEffect, useState} from "react";
import {connect} from "react-redux";
import {createUseStyles} from "react-jss";
import {Button} from "@material-ui/core";
import {Link} from "react-router-dom";

import {changeTheme} from "./../actions/changeTheme";

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
  const styles = useStyles();
  console.log("Settings", props);
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
        <Button onClick={() => props.changeTheme(props.theme.name)}>
          {" "}
          {props.theme.name}
        </Button>
      </div>
      <div>
        <Button> save</Button>
        <Button> load</Button>
      </div>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    theme: state.display.theme
  };
};
const mapDispatchToProps = {
  changeTheme: changeTheme
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
