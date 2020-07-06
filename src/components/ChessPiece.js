import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import fontawesome from "@fortawesome/fontawesome";
import {fas} from "@fortawesome/free-solid-svg-icons";

fontawesome.library.add(fas);

function ChessPiece(props) {
  return (
    <FontAwesomeIcon
      icon={fas["faChess" + props.figure.piece]}
      color={props.figure.color}
      style={{margin: "5px"}}
    />
  );
}

export default ChessPiece;
