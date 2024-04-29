"use client";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { format } from "date-fns";

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
import { useUserStore } from "@/store";
import { useRouter } from "next/navigation";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn, serverURL } from "@/lib/utils";
import { CalendarIcon, Edit, Trash } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);

    const [name, setName] = useState("");
    const [department, setDepartment] = useState("");
    const [program, setProgram] = useState("");
    const [startDate, setStartDate] = useState<Date>();
    const [endDate, setEndDate] = useState<Date>();
    const [search, setSearch] = useState("");

    const [batches, setBatches] = useState<any>([]);
    const [departments, setDepartments] = useState<any>([]);
    const [programs, setPrograms] = useState<any>([]);

    const [editBatchId, setEditBatchId] = useState("");
    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    const createBatch = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/batch/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                programId: program,
                startYear: startDate?.getFullYear(),
                endYear: endDate?.getFullYear(),
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setDepartment("");
                setProgram("");
                setStartDate(undefined);
                setEndDate(undefined);
                getBatches();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateBatch = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/batch/${editBatchId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                department: department,
                porgram: program,
                startDate: startDate,
                endDate: endDate,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setDepartment("");
                setProgram("");
                setStartDate(undefined);
                setEndDate(undefined);
                getBatches();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteBatch = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/batch/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast(response?.data?.message);
                getBatches();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getBatches = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/batch/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setBatches(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getDepartments = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/department`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setDepartments(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getProgramsByDepartment = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/program/get-all-by-department/${department}`,
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
        getBatches();
        getDepartments();
    }, []);

    useEffect(() => {
        if (department) {
            getProgramsByDepartment();
        }
    }, [department])

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Batches</p>
                    <div className="flex justify-between">
                        <Sheet
                            onOpenChange={(x) => {
                                if (x === false) setEditMode(false);
                                if (!editMode && x) {
                                    setName("");
                                    setDepartment("");
                                    setProgram("");
                                    setStartDate(undefined);
                                    setEndDate(undefined);
                                }
                            }}
                        >
                            <SheetTrigger asChild>
                                <Button>+ New Batch</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>{editMode ? "Edit" : "New"} Batch</SheetTitle>
                                    <SheetDescription>
                                        {editMode ? "Edit" : "Create new"} batch.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input className="col-span-3" type="text" value={name} onChange={(x) => setName(x.target.value)} />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Department
                                        </Label>
                                        <Select value={department} onValueChange={(x) => setDepartment(x)}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select department" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Departments</SelectLabel>
                                                    {departments?.map(
                                                        (department: any, index: number) => {
                                                            return (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={department?._id}
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
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Program
                                        </Label>
                                        <Select value={program} onValueChange={(x) => setProgram(x)}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select program" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Programs</SelectLabel>
                                                    {programs?.map(
                                                        (program: any, index: number) => {
                                                            return (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={program?._id}
                                                                >
                                                                    {program?.name}
                                                                </SelectItem>
                                                            );
                                                        },
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Start Date
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "col-span-3 justify-start text-left font-normal",
                                                        !startDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {startDate ? (
                                                        format(startDate, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={startDate}
                                                    onSelect={setStartDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="role" className="text-right">
                                            End Date
                                        </Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant={"outline"}
                                                    className={cn(
                                                        "col-span-3 justify-start text-left font-normal",
                                                        !endDate && "text-muted-foreground",
                                                    )}
                                                >
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {endDate ? (
                                                        format(endDate, "PPP")
                                                    ) : (
                                                        <span>Pick a date</span>
                                                    )}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0">
                                                <Calendar
                                                    mode="single"
                                                    selected={endDate}
                                                    onSelect={setEndDate}
                                                    initialFocus
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                if (editMode) {
                                                    updateBatch();
                                                } else {
                                                    createBatch();
                                                }
                                            }}
                                        >
                                            {editMode ? "Save" : "Create"} Batch
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search batch"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>{batches.length} batches</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead>Start Year</TableHead>
                                    <TableHead>End Year</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {batches?.map((batch: any, index: number) =>
                                    !batch.name?.toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                        !batch.department?.toString()
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ? (
                                        ""
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>{batch?.name}</TableCell>
                                            <TableCell>{batch?.department?.name}</TableCell>
                                            <TableCell>{batch?.program?.name}</TableCell>
                                            <TableCell>{batch?.startYear}</TableCell>
                                            <TableCell>{batch?.endYear}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={"outline"}
                                                    size={"icon"}
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setEditBatchId(batch._id);
                                                        setName(batch.name);
                                                        setDepartment(batch.department);
                                                        setProgram(batch.program);
                                                        setStartDate(batch.startDate);
                                                        setEndDate(batch.endDate);
                                                        sheetTrigger.current.click();
                                                    }}
                                                >
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
                                                                Delete &apos;{batch.name}&apos; from
                                                                batches?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This
                                                                will permanently delete
                                                                {batch.name} from batch list.
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
                                                                onClick={() =>
                                                                    deleteBatch(batch._id)
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
