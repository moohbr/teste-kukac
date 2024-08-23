import { useReducer } from "react";
import RegisterActionType, { IRegisterAction, IRegisterState } from "./types";

const initialState: IRegisterState = {
    email: "",
    password: "",
    confirm_password: "",
    error: "",
    loading: false,
    token: "",
};

const registerReducer = (state: IRegisterState, action: IRegisterAction): IRegisterState => {
    switch (action.type) {
        case RegisterActionType.SET_NAME:
            return {
                ...state,
                name: action.payload,
            };
        case RegisterActionType.SET_LAST_NAME:
            return {
                ...state,
                last_name: action.payload,
            };
        case RegisterActionType.SET_EMAIL:
            return {
                ...state,
                email: action.payload,
            };
        case RegisterActionType.SET_PASSWORD:
            return {
                ...state,
                password: action.payload,
            };

        case RegisterActionType.SET_CONFIRM_PASSWORD:
            return {
                ...state,
                confirm_password: action.payload,
            };
        case RegisterActionType.SET_ERROR:
            return {
                ...state,
                error: action.payload,
            };
        case RegisterActionType.SET_LOADING:
            return {
                ...state,
                loading: Boolean(action.payload),
            };
        case RegisterActionType.SET_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        default:
            return state;
    }
};

const useRegisterReducer = (): [IRegisterState, React.Dispatch<IRegisterAction>] => useReducer(registerReducer, initialState)

export default useRegisterReducer
