import { serverURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { createStore } from "zustand/vanilla";

export type UserState = {
    email: string;
    password: string;
    role: string;
};

export type UserActions = {
    logOut: () => void;
    setData: (email: string, role: string) => void;
    signIn: (email: string, password: string) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
    email: "",
    password: "",
    role: "",
};

export const createUserStore = (initState: UserState = defaultInitState) => {
    return createStore<UserStore>()((set) => ({
        ...initState,
        logOut: () => {
            set(() => ({ email: "", password: "", role: "" }));
            localStorage.clear();
            window.location.href = "/signin";
        },
        setData: (email, role) => {
            set(() => ({ email: email, role: role }));
        },
        signIn: async (email, password) => {
            try {
                const response = await axios.post(`${serverURL}/users/login`, { email, password });
                set(() => ({ email: response.data.user.email, role: response.data.user.role }));
                localStorage.setItem("token", response.data.token);
                window.location.href = "/dashboard";
            } catch (err: any) {
                toast.error(err.response?.data?.message);
            }
        },
    }));
};
