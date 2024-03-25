import { RxRulerSquare } from "react-icons/rx";

export default function Home() {
    return (
        <main>
            <div className="flex justify-center items-center h-screen">
                <div className="flex justify-center text-2xl font-bold">
                    <RxRulerSquare className="mr-2 text-2xl" />
                    <p className="hidden lg:flex">Faculty Feedback System</p>
                </div>
            </div>
        </main>
    );
}
