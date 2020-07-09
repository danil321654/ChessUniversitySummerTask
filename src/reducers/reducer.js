import {chessBoardReducer} from "./chessBoardReducer";
import {settingsAndDisplayReducer} from "./settingsAndDisplayReducer";
import {combineReducers} from "redux";

export const reducer = combineReducers({
  chess: chessBoardReducer,
  display: settingsAndDisplayReducer
});
