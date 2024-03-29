"use client";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import AdminDashboard from "../components/AdminDashboard";
import FacultyDashboard from "../components/FacultyDashboard";
import StudentDashboard from "../components/StudentDashboard";

export default function Page() {
    const router = useRouter();
    const type = useUserStore((store) => store.type);

    return (
        <>
            {type == "admin" ? (
                <AdminDashboard />
            ) : type == "faculty" ? (
                <FacultyDashboard />
            ) : type == "student" ? (
                <StudentDashboard />
            ) : (
                <></>
            )}
        </>
    );
}
