"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { serverURL } from "@/lib/utils";
import axios from "axios";
import { GraduationCap, Loader2, StickyNote, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function FacultyDashboard() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const [allCounts, setAllCounts] = useState({
        departmentCount: 0,
        batchCount: 0,
        programCount: 0,
        feedbackCount: 0,
        courseCount: 0,
        studentCount: 0,
        semesterCount: 0,
        facultyCount: 0,
    });

    const getAllCounts = async () => {
        setLoading(true);
        const config = {
            method: "POST",
            url: `${serverURL}/college/get-all-count`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setAllCounts(response?.data?.data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getAllCounts();
    }, []);

    return (
        <div className="w-full h-full p-7">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Feedbacks</CardTitle>
                        <StickyNote className="h-6 w-6" />
                    </div>
                    <CardContent>
                        {loading ? (
                            <Loader2 className="mr-2 animate-spin" />
                        ) : (
                            <p className="text-4xl font-bold">{allCounts?.feedbackCount}</p>
                        )}
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/programs")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Programs</CardTitle>
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <CardContent>
                        {loading ? (
                            <Loader2 className="mr-2 animate-spin" />
                        ) : (
                            <p className="text-4xl font-bold">{allCounts?.programCount}</p>
                        )}
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/students")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Students</CardTitle>
                        <Users className="h-6 w-6" />
                    </div>
                    <CardContent>
                        {loading ? (
                            <Loader2 className="mr-2 animate-spin" />
                        ) : (
                            <p className="text-4xl font-bold">{allCounts?.studentCount}</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
