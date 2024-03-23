import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { FiFilter } from "react-icons/fi";

export default function Page() {
    return (
        <div className="w-full h-full p-7">
            <p className="font-semibold text-2xl mb-4">Batches</p>
            <div className="flex justify-between">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button>+ New Batch</Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>New Batch</SheetTitle>
                            <SheetDescription>
                                Create new batch.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Semester
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Semester" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Semesters</SelectLabel>
                                            <SelectItem value="apple">Semester A</SelectItem>
                                            <SelectItem value="apple">Semester B</SelectItem>
                                            <SelectItem value="apple">Semester C</SelectItem>
                                            <SelectItem value="apple">Semester D</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Program
                                </Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select Program" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Programs</SelectLabel>
                                            <SelectItem value="apple">Program A</SelectItem>
                                            <SelectItem value="apple">Program B</SelectItem>
                                            <SelectItem value="apple">Program C</SelectItem>
                                            <SelectItem value="apple">Program D</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Name
                                </Label>
                                <Input className="col-span-3" type="text" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Start Date
                                </Label>
                                <Input className="col-span-3" type="date" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    End Date
                                </Label>
                                <Input className="col-span-3" type="date" />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Create Batch</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <div className="flex">
                    <Input className="mr-4" type="text" placeholder="Search batches..." />
                    <Button variant="outline"><FiFilter className="mr-2" /> View</Button>
                </div>
            </div>
        </div>
    );
}
