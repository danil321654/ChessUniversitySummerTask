import {simulateMove} from "./simulateMove";
import {chars} from "./../constants/chars";

export const withoutChecked = ({possibleMoves, state}) => {
  return possibleMoves
    ? possibleMoves.filter(move => {
        let simulatedState = simulateMove(state, {
          figure: move.figure,
          cellId: move.cellId,
          beat: move.possibleBeat
        });
        return simulatedState.check !== move.figure.color;
      })
    : possibleMoves;
};
