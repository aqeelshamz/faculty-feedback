"use client";
import { useUserStore } from "@/store";
import AdminDashboard from "../components/AdminDashboard";
import FacultyDashboard from "../components/FacultyDashboard";
import StudentDashboard from "../components/StudentDashboard";
import { useEffect } from "react";
import { Toaster } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);

    useEffect(() => { }, [role]);
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
