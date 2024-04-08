"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function App({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    useEffect(() => {
        if (localStorage.getItem("token")) {
            router.push("/dashboard");
        } else {
            router.push("/signin");
        }
    }, [router]);

    return <>{children}</>;
}
