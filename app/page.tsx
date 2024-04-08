"use client";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function App() {
    const router = useRouter();
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/signin");
        }
        else{
            router.push("/dashboard");
        }
    }, [router]);

    return <></>;
}
