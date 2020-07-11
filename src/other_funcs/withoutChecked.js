import {simulateMove} from "./simulateMove";
import {findKingCell} from "./findKingCell";
import {chars} from "./../constants/chars";

export const withoutChecked = ({possibleMoves, state}) => {
  console.log(possibleMoves, "here", state);
  return possibleMoves
    ? possibleMoves.filter(move => {
        let simulatedState = simulateMove(state, {
          figure: move.figure,
          cellId: move.cellId,
          beat: move.possibleBeat
        });
        console.log(move, "simulKing");
        return simulatedState.check !== move.figure.color;
      })
    : possibleMoves;
};
