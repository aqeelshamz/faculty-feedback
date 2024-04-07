"use client";
import { useUserStore } from "@/providers/user-store-provider";
import AdminDashboard from "../components/AdminDashboard";
import FacultyDashboard from "../components/FacultyDashboard";
import StudentDashboard from "../components/StudentDashboard";
import { useEffect } from "react";

const roleSelector = (state: any) => state.role;

export default function Page() {
    const role = useUserStore(roleSelector);

    useEffect(() => {}, [role]);

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
