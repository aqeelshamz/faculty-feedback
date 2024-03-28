"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useFacultyStore, useProgramStore, useStudentStore } from "@/store";
import { RxFileText, RxPerson } from "react-icons/rx";

export default function Page() {
    const programCount = useProgramStore((state) => state.programs).length;
    const studentCount = useStudentStore((state) => state.students).length;
    const facultyCount = useFacultyStore((state) => state.faculties).length;

    return (
        <div className="w-full h-full p-7">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Surveys</CardTitle>
                        <RxFileText className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">13</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Programs</CardTitle>
                        <RxPerson className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{programCount}</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Faculties</CardTitle>
                        <RxPerson className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{facultyCount}</p>
                    </CardContent>
                </Card>
                <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Students</CardTitle>
                        <RxPerson className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{studentCount}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
