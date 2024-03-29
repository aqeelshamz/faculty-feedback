"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { RxRulerSquare } from "react-icons/rx";

export default function Home() {
    const router = useRouter();

    return (
        <main className="flex flex-col h-screen">
            <div className="flex justify-center items-center h-screen flex-col">
                <div className="flex justify-center text-2xl font-bold">
                    <RxRulerSquare className="mr-4 text-3xl" />
                    <p className="hidden 2xl:flex text-3xl font-extrabold">
                        Faculty Feedback System
                    </p>
                </div>
                <div className="flex justify-center mt-10">
                    <Button className="flex flex-col" onClick={() => router.push("/dashboard")}>
                        Dashboard
                    </Button>
                </div>
            </div>
        </main>
    );
}
