interface IRegisterState {
    name?: string;
    last_name?: string;
    email?: string;
    password?: string;
    confirm_password?: string;
    error?: string;
    loading?: boolean;
    token?: string;
}

enum RegisterActionType {
    SET_NAME = "SET_NAME",
    SET_LAST_NAME = "SET_LAST_NAME",
    SET_EMAIL = "SET_EMAIL",
    SET_PASSWORD = "SET_PASSWORD",
    SET_CONFIRM_PASSWORD = "SET_CONFIRM_PASSWORD",
    SET_ERROR = "SET_ERROR",
    SET_LOADING = "SET_LOADING",
    SET_TOKEN = "SET_TOKEN",
}

interface IRegisterAction {
    type: RegisterActionType;
    payload: string;
}

export default RegisterActionType;
export type { RegisterActionType, IRegisterAction, IRegisterState };
