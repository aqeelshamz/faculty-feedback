import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type UserStore = {
    role: string;
    setRole: (role: string) => void;
};

// const myMiddlewares = (f: any) => devtools(persist(f, { name: "userStore" }));

export const useUserStore = create<UserStore>()(
    devtools(
        persist(
            (set, get) => ({
                role: "",
                setRole: (role) => {
                    set(() => ({ role: role }));
                },
            }),
            { name: "userStore" },
        ),
    ),
);
