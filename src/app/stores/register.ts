import { create } from 'zustand';

type RegisterState = {
    email: string;
    password: string;
    confirmPassword: string;
    name: string;
    lastName: string;
    error: string;
};

type RegisterActions = {
    setEmail: (email: string) => void;
    setPassword: (password: string) => void;
    setConfirmPassword: (confirmPassword: string) => void;
    setName: (name: string) => void;
    setLastName: (lastName: string) => void;
    setError: (error: string) => void;
    register: () => void;
};

type RegisterStore = RegisterState & RegisterActions;

const initialState: RegisterState = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    lastName: '',
    error: '',
};

export const useRegisterStore = create<RegisterStore>((set) => ({
    ...initialState,
    register: async () => {
        const { email, password, name, lastName, setError } = useRegisterStore.getState();
        const apiData = { email, password, name, lastName };
        const response = await fetch("http://localhost:8080/user/register", {
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(apiData),
        });

        if (response.ok) {
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = "/dashboard";
        } else {
            setError('An error occurred, please try again later');
        }
    },
    setEmail: (email: string) => set({ email }),
    setPassword: (password: string) => set({ password }),
    setConfirmPassword: (confirmPassword: string) => set({ confirmPassword }),
    setName: (name: string) => set({ name }),
    setLastName: (lastName: string) => set({ lastName }),
    setError: (error: string) => set({ error }),
}));