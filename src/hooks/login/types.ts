interface ILoginState {
    email?: string;
    password?: string;
    error?: string;
    loading?: boolean;
    token?: string;
}

enum LoginActionType {
    SET_EMAIL = "SET_EMAIL",
    SET_PASSWORD = "SET_PASSWORD",
    SET_ERROR = "SET_ERROR",
    SET_LOADING = "SET_LOADING",
    SET_TOKEN = "SET_TOKEN",
}

interface ILoginAction {
    type: LoginActionType;
    payload: string;
}

export default LoginActionType;
export type { LoginActionType, ILoginAction, ILoginState };
