"use client";
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import AdminDashboard from "../components/AdminDashboard";
import FacultyDashboard from "../components/FacultyDashboard";
import StudentDashboard from "../components/StudentDashboard";

export default function Page() {
    const router = useRouter();
    const userStore = useUserStore();

    return (
        <>
            {userStore.role == "admin" ? (
                <AdminDashboard />
            ) : userStore.role == "faculty" ? (
                <FacultyDashboard />
            ) : userStore.role == "student" ? (
                <StudentDashboard />
            ) : (
                <></>
            )}
        </>
    );
}
