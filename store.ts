import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserStore = {
    name: string;
    email: string;
    role: string;
    setData: (name: string, email: string, role: string) => void;
};

// const myMiddlewares = (f: any) => devtools(persist(f, { name: "userStore" }));

export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set, get) => ({
                name: "",
                email: "",
                role: "",
                setData: (name, email, role) => {
                    set(() => ({ name: name, email: email, role: role }));
                },
            }),
            { name: "userStore" },
        ),
    ),
);
