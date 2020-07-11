import {fillBoard} from "./../other_funcs/fillBoard.js";
import {findPossibleMoves} from "./../other_funcs/findPossibleMoves.js";
import {chars} from "./../constants/chars";

export const simulateMove = (movedState, action) => {
  let movedPiece = action.figure;
  let curTeamMove = movedState.curTeamMove == "white" ? "black" : "white";
  if (action.beat)
    movedState = {
      ...movedState,
      chess: movedState.chess.map(row =>
        row.map(el => {
          if (el.cellId == movedState.selectedCell) {
            return {...el, figure: undefined};
          } else return el;
        })
      ),
      whiteTeam: movedState.whiteTeam.filter(el => el.cellId !== action.cellId),
      blackTeam: movedState.blackTeam.filter(el => el.cellId !== action.cellId),
      selectedPossibleMoves: []
    };
  movedState = {
    ...movedState,
    chess: movedState.chess.map(row =>
      row.map(el =>
        el.cellId == action.cellId ? {...el, figure: undefined} : el
      )
    )
  };
  movedPiece = action.figure;
  movedState = {
    ...movedState,
    whiteTeam: movedState.whiteTeam.map(el =>
      el.cellId == movedState.selectedCell ? {...el, cellId: action.cellId} : el
    ),
    blackTeam: movedState.blackTeam.map(el =>
      el.cellId == movedState.selectedCell ? {...el, cellId: action.cellId} : el
    ),
    selectedPossibleMoves: [],
    curTeamMove: curTeamMove
  };
  movedState = {
    ...movedState,
    chess: movedState.chess.map(row =>
      row.map(el =>
        el.cellId == action.cellId
          ? {
              ...el,
              figure: {...action.figure, cellId: action.cellId, moved: true}
            }
          : el.cellId == movedState.selectedCell
          ? {
              ...el,
              figure: undefined
            }
          : el
      )
    )
  };
  movedState = {
    ...movedState,
    allWhitePossibleMoves: movedState.whiteTeam.map(el => {
      return {
        figure: el,
        cellId: el.cellId,
        possibleMoves: findPossibleMoves(el, el.cellId, {
          ...movedState,
          selected: "none"
        })
      };
    }),
    allBlackPossibleMoves: movedState.blackTeam.map(el => {
      return {
        figure: el,
        cellId: el.cellId,
        possibleMoves: findPossibleMoves(el, el.cellId, {
          ...movedState,
          selected: "none"
        })
      };
    })
  };
  let check = undefined;
  movedState.allWhitePossibleMoves.map(cell => {
    cell.possibleMoves.map(possibleMove => {
      if (
        possibleMove.possibleBeat &&
        movedState.chess[8 - +possibleMove.cellId[1]][
          chars.indexOf(possibleMove.cellId[0])
        ].figure.piece == "King"
      )
        check = "black";
      return possibleMove;
    });
    return cell;
  });
  movedState.allBlackPossibleMoves.map(cell => {
    cell.possibleMoves.map(possibleMove => {
      if (
        possibleMove.possibleBeat &&
        movedState.chess[8 - +possibleMove.cellId[1]][
          chars.indexOf(possibleMove.cellId[0])
        ].figure.piece == "King"
      )
        check = "white";
      return possibleMove;
    });
    return cell;
  });
  movedState = {...movedState, check: check};
  return {...movedState, selectedCell: "none"};
};
