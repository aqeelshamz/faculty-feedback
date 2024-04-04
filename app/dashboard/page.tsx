"use client";
import { useUserStore } from "@/providers/user-store-provider";
import AdminDashboard from "../components/AdminDashboard";
import FacultyDashboard from "../components/FacultyDashboard";
import StudentDashboard from "../components/StudentDashboard";

export default function Page() {
    const { role } = useUserStore((state) => state);

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
