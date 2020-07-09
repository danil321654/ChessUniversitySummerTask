import React from "react";
import {createUseStyles} from "react-jss";

const cell = {
  boxSizing: "border-box",
  width: "100%",
  height: "100%",
  display: "flex",
  padding: "5px",
  fontSize: "1rem"
};

const useStyles = createUseStyles({
  side: {
    ...cell,
    justifyContent: "flex-end",
    alignItems: "center"
  },
  bottom: {
    ...cell,
    justifyContent: "center",
    alignItems: "flex-start"
  }
});

function ChessLabelCell(props) {
  const styles = useStyles();
  return <div className={styles[props.position]}>{props.label}</div>;
}

export default ChessLabelCell;
