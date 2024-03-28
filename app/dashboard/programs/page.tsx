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
import { useProgramStore } from "@/store";

import { LuFilter } from "react-icons/lu";

export default function Page() {
    const programs = useProgramStore((state) => state.programs);

    return (
        <div className="w-full h-full p-7">
            <p className="font-semibold text-2xl mb-4">Programs</p>
            <div className="flex justify-between">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>+ New Program</Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>New Program</SheetTitle>
                            <SheetDescription>Create new program.</SheetDescription>
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
                                <Button type="submit">Add program</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <div className="flex">
                    <Input className="mr-4" type="text" placeholder="Search programs" />
                    <Button variant="outline">
                        <LuFilter className="mr-2" /> View
                    </Button>
                </div>
            </div>
            <div className="m-10">
                <Table>
                    <TableCaption>A list of your recent programs.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">program</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Method</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {programs.map((program) => (
                            <TableRow key={program.program}>
                                <TableCell className="font-medium">{program.program}</TableCell>
                                <TableCell>{program.paymentStatus}</TableCell>
                                <TableCell>{program.paymentMethod}</TableCell>
                                <TableCell className="text-right">{program.totalAmount}</TableCell>
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
    );
}
