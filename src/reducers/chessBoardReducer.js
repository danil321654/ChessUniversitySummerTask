import {fillBoard} from "./../other_funcs/fillBoard.js";
import {findPossibleMoves} from "./../other_funcs/findPossibleMoves.js";
import {withoutChecked} from "./../other_funcs/withoutChecked.js";
import {chars} from "./../constants/chars";

let initialBoard = {
  chess: fillBoard(),
  selectedCell: "none",
  whiteTeam: fillBoard()
    .map(row =>
      row
        .filter(el => el.figure && el.figure.color === "white")
        .map(el => el.figure)
    )
    .flat(1),
  blackTeam: fillBoard()
    .map(row =>
      row
        .filter(el => el.figure && el.figure.color === "black")
        .map(el => el.figure)
    )
    .flat(1),
  selectedPossibleMoves: [],
  curTeamMove: "white",
  check: undefined,
  mate: false
};
initialBoard = {
  ...initialBoard,
  allWhitePossibleMoves: initialBoard.whiteTeam.map(el => {
    return {
      figure: el,
      cellId: el.cellId,
      possibleMoves: findPossibleMoves(el, el.cellId, initialBoard)
    };
  }),
  allBlackPossibleMoves: initialBoard.blackTeam.map(el => {
    return {
      figure: el,
      cellId: el.cellId,
      possibleMoves: findPossibleMoves(el, el.cellId, initialBoard)
    };
  })
};

export const chessBoardReducer = (
  state = localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state"))
    : initialBoard,
  action
) => {
  if (action.type == "RESTART_GAME") {
    localStorage.setItem("state", JSON.stringify(initialBoard));
    return initialBoard;
  }
  if (state.mate) return state;
  let selected = state.selectedCell;
  switch (action.type) {
    case "LOAD_GAME":
      if (JSON.parse(localStorage.getItem("customSave"))) {
        let loadedSave = JSON.parse(localStorage.getItem("customSave"));
        localStorage.setItem("state", JSON.stringify(loadedSave));

        return loadedSave;
      }
      return state;
      break;
    case "SELECT_PIECE":
      let ns = {
        ...state,
        selectedCell: action.cellId
      };
      ns = {
        ...ns,
        selectedPossibleMoves: withoutChecked({
          possibleMoves: findPossibleMoves(action.figure, action.cellId, {
            ...ns
          }),
          state: {...ns}
        })
      };
      localStorage.setItem("state", JSON.stringify(ns));
      return ns;
    case "DESELECT_PIECE":
      let deselectState = {
        ...state,
        selectedCell: "none",
        selectedPossibleMoves: []
      };
      localStorage.setItem("state", JSON.stringify(deselectState));
      return deselectState;

    case "MOVE_PIECE":
      let movedPiece;
      let movedState = state;
      let curTeamMove = state.curTeamMove == "white" ? "black" : "white";
      if (action.beat)
        movedState = {
          ...movedState,
          chess: movedState.chess.map(row =>
            row.map(el => {
              if (el.cellId == action.cellId) {
                return {...el, figure: undefined};
              } else return el;
            })
          ),
          whiteTeam: movedState.whiteTeam.filter(
            el => el.cellId !== action.cellId
          ),
          blackTeam: movedState.blackTeam.filter(
            el => el.cellId !== action.cellId
          ),
          selectedPossibleMoves: []
        };
      movedState = {
        ...movedState,
        chess: movedState.chess.map(row =>
          row.map(el => {
            if (el.cellId == movedState.selectedCell) {
              movedPiece = {
                ...el.figure,
                piece:
                  el.figure.piece === "Pawn" &&
                  (+action.cellId[1] === 1 || +action.cellId[1] === 8)
                    ? "Queen"
                    : el.figure.piece
              };
              return {...el, figure: undefined};
            } else return el;
          })
        ),
        whiteTeam: movedState.whiteTeam.map(el =>
          el.cellId == movedState.selectedCell
            ? {...movedPiece, cellId: action.cellId, moved: true}
            : el
        ),
        blackTeam: movedState.blackTeam.map(el =>
          el.cellId == movedState.selectedCell
            ? {...movedPiece, cellId: action.cellId, moved: true}
            : el
        ),
        selectedPossibleMoves: [],
        selectedCell: "none",
        curTeamMove: curTeamMove
      };
      movedState = {
        ...movedState,
        chess: movedState.chess.map(row =>
          row.map(el =>
            el.cellId == action.cellId
              ? {...el, figure: {...movedPiece, moved: true}}
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
            beat: el.possibleBeat,
            possibleMoves: withoutChecked({
              possibleMoves: findPossibleMoves(el, el.cellId, movedState),
              state: {...movedState, selectedCell: selected}
            })
          };
        })
      };

      movedState = {
        ...movedState,
        allBlackPossibleMoves: movedState.blackTeam.map(el => {
          return {
            figure: el,
            cellId: el.cellId,
            beat: el.possibleBeat,
            possibleMoves: withoutChecked({
              possibleMoves: findPossibleMoves(el, el.cellId, movedState),
              state: {...movedState, selectedCell: selected}
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
      movedState =
        (movedState.check == "white" &&
          movedState.allWhitePossibleMoves.map(x => x.possibleMoves).flat(1)
            .length == 0) ||
        (movedState.check == "black" &&
          movedState.allBlackPossibleMoves.map(x => x.possibleMoves).flat(1)
            .length == 0)
          ? {...movedState, mate: true}
          : movedState;
      localStorage.setItem("state", JSON.stringify(movedState));
      return movedState;
      break;

    default:
      return state;
  }
};
