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
import { useRouter } from "next/navigation";

export default function Page() {
    const faculties = useFacultyStore((state) => state.faculties);
    const type = useUserStore((state) => state.type);

    return (
        <>
            {type == "admin" ? (
                <div className="w-full h-full p-7">
                    <p className="font-semibold text-2xl mb-4">Faculty</p>
                    <div className="flex justify-between">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>+ New Faculty</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>New Faculty</SheetTitle>
                                    <SheetDescription>Create new faculty.</SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Email
                                        </Label>
                                        <Input className="col-span-3" type="email" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Title
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Department
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select Department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Departments</SelectLabel>
                                                    <SelectItem value="apple">
                                                        Department A
                                                    </SelectItem>
                                                    <SelectItem value="apple">
                                                        Department B
                                                    </SelectItem>
                                                    <SelectItem value="apple">
                                                        Department C
                                                    </SelectItem>
                                                    <SelectItem value="apple">
                                                        Department D
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit">Add Faculty</Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input className="mr-4" type="text" placeholder="Search faculty" />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>A list of faculties.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">faculty</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Method</TableHead>
                                    <TableHead className="text-right">Amount</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {faculties.map((faculty) => (
                                    <TableRow key={faculty.faculty}>
                                        <TableCell className="font-medium">
                                            {faculty.faculty}
                                        </TableCell>
                                        <TableCell>{faculty.paymentStatus}</TableCell>
                                        <TableCell>{faculty.paymentMethod}</TableCell>
                                        <TableCell className="text-right">
                                            {faculty.totalAmount}
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
