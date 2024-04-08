"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store";
import { programs, faculties, students } from "@/lib/data";
import {
    BookOpen,
    Building,
    Calendar,
    GraduationCap,
    Group,
    StickyNote,
    User,
    Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
    const router = useRouter();
    const role = useUserStore((state) => state.role);

    return (
        <div className="w-full h-full p-7">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                    onClick={() => router.push("/dashboard/feedbacks")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
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
                        <p className="text-4xl font-bold">{programs.length}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/courses")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Courses</CardTitle>
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{students.length}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/departments")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Departments</CardTitle>
                        <Building className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">
                            {students.length}
                        </p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/batches")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Batches</CardTitle>
                        <Group className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">
                             {students.length}
                        </p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/semesters")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Semesters</CardTitle>
                        <Calendar className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">
                             {students.length}
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
                             {faculties.length}
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
                             {students.length}
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
