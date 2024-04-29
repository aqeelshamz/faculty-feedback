"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { GraduationCap, StickyNote, User, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function StudentDashboard() {
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
                    onClick={() => router.push("/dashboard/students")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Courses</CardTitle>
                        <Users className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">0</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
