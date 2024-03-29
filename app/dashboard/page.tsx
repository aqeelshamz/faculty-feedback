"use client";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import AdminDashboard from "../components/AdminDashboard";
import FacultyDashboard from "../components/FacultyDashboard";
import StudentDashboard from "../components/StudentDashboard";

export default function Page() {
    const router = useRouter();
    const role = useUserStore((store) => store.role);

    return (
        <>
            {role == "admin" ? (
                <AdminDashboard />
            ) : role == "faculty" ? (
                <FacultyDashboard />
            ) : role == "student" ? (
                <StudentDashboard />
            ) : (
                <></>
            )}
        </>
    );
}
