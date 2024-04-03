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

export default function Page() {
    const faculties = useFacultyStore((state) => state.faculties);
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Semester</p>
                    <div className="flex justify-between">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>+ New Semester</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>New semester</SheetTitle>
                                    <SheetDescription>Create new semester.</SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input className="col-span-3" type="email" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Title
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="role" className="text-right">
                                            Role
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit">Add Semester</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search semesters"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>A list of semesters.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {faculties.map((faculty, index: number) =>
                                    !faculty.name
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                    !faculty.title
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) ? (
                                        ""
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>{faculty.name}</TableCell>
                                            <TableCell>{faculty.email}</TableCell>
                                            <TableCell>{faculty.title}</TableCell>
                                            <TableCell>{faculty.role}</TableCell>
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
