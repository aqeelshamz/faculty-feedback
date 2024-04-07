"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { LuFilter } from "react-icons/lu";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useFacultyStore, useUserStore } from "@/store";
import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import { courses, faculties } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Courses</p>
                    <div className="flex justify-between">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>+ New Course</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>New Course</SheetTitle>
                                    <SheetDescription>Create new course.</SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Course Code
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="course" className="text-right">
                                            Semester
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select semester" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Semesters</SelectLabel>
                                                    {courses?.map((course: any, index: number) => {
                                                        return (
                                                            <SelectItem
                                                                key={index}
                                                                value={course?.name}
                                                            >
                                                                {course?.name}
                                                            </SelectItem>
                                                        );
                                                    })}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Faculties
                                        </Label>
                                        {faculties.map((faculty, index) => {
                                            return (
                                                <div
                                                    className="flex items-center space-x-2 my-4"
                                                    key={index}
                                                >
                                                    <Checkbox id={faculty + index.toString()} />
                                                    <label
                                                        htmlFor={faculty + index.toString()}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {faculty.name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit">Add Course</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search course"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>A list of courses.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course, index: number) =>
                                    !course.name
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                    !course.courseCode
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) ? (
                                        ""
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>{course.name}</TableCell>
                                            <TableCell>{course.courseCode}</TableCell>
                                            <TableCell>
                                                <Button variant={"outline"} size={"icon"}>
                                                    <Edit />
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant={"outline"} size={"icon"}>
                                                    <Trash />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <>
                    <div className="flex justify-center items-center h-full">
                        <div className="flex justify-center text-2xl font-bold">
                            <p className="hidden lg:flex">404 Not Found</p>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
