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
import { useStudentStore, useUserStore } from "@/store";

import { LuFilter } from "react-icons/lu";

export default function Page() {
    const students = useStudentStore((state) => state.students);
    const type = useUserStore((state) => state.type);

    return (
        <>
            {type == "admin" ? (
                <div className="w-full h-full p-7">
                    <p className="font-semibold text-2xl mb-4">Students</p>
                    <div className="flex justify-between">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>+ New Student</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>New Student</SheetTitle>
                                    <SheetDescription>Create new student.</SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Adm. No.
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Email
                                        </Label>
                                        <Input className="col-span-3" type="email" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Phone
                                        </Label>
                                        <Input className="col-span-3" type="tel" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Batch
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select Batch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Batches</SelectLabel>
                                                    <SelectItem value="apple">Batch A</SelectItem>
                                                    <SelectItem value="apple">Batch B</SelectItem>
                                                    <SelectItem value="apple">Batch C</SelectItem>
                                                    <SelectItem value="apple">Batch D</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="username" className="text-right">
                                            Roll No.
                                        </Label>
                                        <Input className="col-span-3" type="number" />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit">Add Student</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input className="mr-4" type="text" placeholder="Search students" />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>A list of students.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">student</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student) => (
                                    <TableRow key={student.student}>
                                        <TableCell className="font-medium">
                                            {student.student}
                                        </TableCell>
                                        <TableCell>{student.paymentStatus}</TableCell>
                                        <TableCell>{student.paymentMethod}</TableCell>
                                        <TableCell className="text-right">
                                            {student.totalAmount}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TableCell colSpan={3}>Total</TableCell>
                                    <TableCell className="text-right">$2,500.00</TableCell>
                                </TableRow>
                            </TableFooter>
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
