import {chessBoardReducer} from "./chessBoardReducer";
import {combineReducers} from "redux";

export const reducer = combineReducers({chess:chessBoardReducer});
