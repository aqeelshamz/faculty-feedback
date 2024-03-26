import { createContext, useState } from "react";

const MainContext = createContext<any>(null);

function Context({ children }: { children: React.ReactNode }) {
    const [users, setUsers] = useState("");
    const [feedbacks, setFeedbacks] = useState("");

    const fetchFeedbacks = () => {
        // const config = {
        //     url: `${serverURL}/classrooms`,
        //     method: "GET",
        //     headers: {
        //         "Authorization": `Bearer ${localStorage.getItem("token")}`,
        //     },
        // };

        // axios(config).then((response) => {
        //     setClasses(response.data);
        // }).catch((err) => {
        //     toast.error("Failed to fetch classes");
        // })
    }

    const logout = () => {

    }

    const signin = () => {

    }

    return (
        <MainContext.Provider value={{
            feedbacks,
            setFeedbacks,
            fetchFeedbacks,
            signin,
            logout,
        }}>
            {children}
        </MainContext.Provider>
    );
}

export { MainContext, Context };