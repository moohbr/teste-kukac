import { create } from 'zustand';

type UserState = {
    userName: string;
    email: string;
    password: string;
    error: string;
    loading: boolean;
    isLoggedIn: boolean;
};

type UserActions = {
    login: () => void;
    logout: () => void;
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setError: (error: string) => void;
    setLoading: (loading: boolean) => void;
};

type AuthStore = UserState & UserActions;

const defaultInitState: UserState = {
    userName: '',
    email: '',
    password: '',
    error: '',
    loading: false,
    isLoggedIn: false
};

export const useAuthStore = create<AuthStore>((set) => ({
    ...defaultInitState,
    login: async () => {
        const { email, password, setError } = useAuthStore.getState();
        const apiData = { email: email, password: password };
        const response = await fetch("http://localhost:8080/auth/login", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(apiData),
        });

        if (response.ok) {
            set({ isLoggedIn: true });
            localStorage.setItem('isLoggedIn', 'true');
        } else {
            setError('Invalid credentials');
        }
    },
    logout: () => {
        set({ isLoggedIn: false });
        localStorage.clear();
    },
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    setError: (error: string) => set({ error }),
    setLoading: (loading: boolean) => set({ loading }),
    setUsername: (userName: string) => set({ userName })
}));