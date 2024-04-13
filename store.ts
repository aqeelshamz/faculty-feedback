import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserStore = {
    email: string;
    role: string;
    setData: (email: string, role: string) => void;
};

// const myMiddlewares = (f: any) => devtools(persist(f, { name: "userStore" }));

export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set, get) => ({
                email: "",
                role: "",
                setData: (email, role) => {
                    set(() => ({ email: email, role: role }));
                },
            }),
            { name: "userStore" },
        ),
    ),
);
