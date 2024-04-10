"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
import { cn, serverURL } from "@/lib/utils";
import { useUserStore } from "@/store";
import axios from "axios";
import { departments, programs } from "@/lib/data";
import { Check, ChevronsUpDown, Edit, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LuFilter } from "react-icons/lu";
import { toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    /*  const [programs, setPrograms] = useState<any>([]);

    const createProgram = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/department/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                vision: vision,
                mission: mission,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setVision("");
                setMission("");
                getPrograms();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };
    
    const updateProgram = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/program/${editProgramId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                courseCode: courseCode,
                semester: semester,
                faculties: courseFaculties,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setEditCourseId("");
                setName("");
                setCourseCode("");
                setSemester("");
                setCourseFaculties([]);
                getCourses();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteProgram = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/program/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast(response?.data?.message);
                getPrograms();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getPrograms = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/department/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setPrograms(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getPrograms();
  }, []);
  */

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Programs</p>
                    <div className="flex justify-between">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>+ New Program</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>{editMode ? "Edit" : "New"} Program</SheetTitle>
                                    <SheetDescription>
                                        {editMode ? "Edit" : "Create new"} program.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input className="col-span-3" type="text" />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="hod" className="text-right">
                                            HOD
                                        </Label>
                                        <Select>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select HOD" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>HOD</SelectLabel>
                                                    {departments?.map(
                                                        (department: any, index: number) => {
                                                            return (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={department?.name}
                                                                >
                                                                    {department?.name}
                                                                </SelectItem>
                                                            );
                                                        },
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
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
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search program"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>{programs.length} programs</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>HOD</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {programs.map((program, index: number) =>
                                    !program.name
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                    !program.hod
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) ? (
                                        ""
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>{program.name}</TableCell>
                                            <TableCell>{program.hod}</TableCell>
                                            <TableCell>{program.department}</TableCell>
                                            <TableCell>
                                                <Button variant={"outline"} size={"icon"}>
                                                    <Edit />
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant={"outline"} size={"icon"}>
                                                            <Trash />
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>
                                                                Delete &apos;{program.name}&apos;
                                                                from programs?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This
                                                                will permanently delete
                                                                {program.name} from program list.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>
                                                                Cancel
                                                            </AlertDialogCancel>
                                                            <AlertDialogAction
                                                                className={cn(
                                                                    buttonVariants({
                                                                        variant: "destructive",
                                                                    }),
                                                                )}
                                                                onClick={
                                                                    () => {}
                                                                    // deleteProgram(program._id)
                                                                }
                                                            >
                                                                Delete
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    ),
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
