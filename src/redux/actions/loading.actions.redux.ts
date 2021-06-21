import {Action, ActionCreator} from "redux";
import {OFF_LOADING, ON_LOADING} from "../types/loading.types.redux";

export const onLoading: ActionCreator<Action> = () => ({type: ON_LOADING});
export const offLoading: ActionCreator<Action> = () => ({type: OFF_LOADING});
