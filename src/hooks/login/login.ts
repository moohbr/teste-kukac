import { useReducer } from "react";
import LoginActionType, { ILoginAction, ILoginState } from "./types";

const initialState: ILoginState = {
    email: "",
    password: "",
    error: "",
    loading: false,
    token: "",
};

const loginReducer = (state: ILoginState, action: ILoginAction): ILoginState => {
    switch (action.type) {
        case LoginActionType.SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case LoginActionType.SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };
        case LoginActionType.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case LoginActionType.SET_LOADING:
            return {
                ...state,
                loading: Boolean(action.payload),
            };
        case LoginActionType.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

const useLoginReducer = (): [ILoginState, React.Dispatch<ILoginAction>] => useReducer(loginReducer, initialState)

export default useLoginReducer
