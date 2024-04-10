"use client";

import { useUserStore } from "@/store";
import { useEffect } from "react";
import AdminFeedback from "./components/AdminFeedback";
import FacultyFeedback from "./components/FacultyFeedback";
import StudentFeedback from "./components/StudentFeedback";

export default function Page() {
    const role = useUserStore((state) => state.role);

    useEffect(() => {}, [role]);
    return (
        <>
            {role == "admin" ? (
                <AdminFeedback />
            ) : role == "faculty" ? (
                <FacultyFeedback />
            ) : role == "student" ? (
                <StudentFeedback />
            ) : (
                <></>
            )}
        </>
    );
}
