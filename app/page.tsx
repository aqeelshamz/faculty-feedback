"use client";

import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function Page() {
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            router.push("/signin");
        }

        if (pathname == "/") {
            router.push("/dashboard");
        }
    }, [router, pathname]);
}
