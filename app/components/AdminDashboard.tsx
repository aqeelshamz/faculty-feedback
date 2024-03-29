"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useFacultyStore, useProgramStore, useStudentStore } from "@/store";
import { GraduationCap, StickyNote, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();

    return (
        <div className="w-full h-full p-7">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Surveys</CardTitle>
                        <StickyNote className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">13</p>
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
                        <p className="text-4xl font-bold">
                            {useProgramStore((state) => state.programs).length}
                        </p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/faculty")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Faculty</CardTitle>
                        <User className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">
                            {useFacultyStore((state) => state.faculties).length}
                        </p>
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
                        <p className="text-4xl font-bold">
                            {useStudentStore((state) => state.students).length}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
