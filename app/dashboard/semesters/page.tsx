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
import { Edit, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn, serverURL } from "@/lib/utils";
import { Toaster, toast } from "sonner";
import axios from "axios";

export default function Semesters() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    const [name, setName] = useState("");
    const [number, setNumber] = useState("");
    const [programId, setProgramId] = useState("");

    const [semesters, setSemesters] = useState<any>([]);
    const [programs, setPrograms] = useState<any>([]);

    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);
    const [editSemesterId, setEditSemesterId] = useState("");

    const getSemesters = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/semester/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setSemesters(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getPrograms = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/program/`,
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

    const createSemester = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/semester`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name,
                number,
                programId,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setNumber("");
                setProgramId("");
                getSemesters();
                getPrograms();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateSemester = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/semester/${editSemesterId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name,
                number,
                programId,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setNumber("");
                setProgramId("");
                getSemesters();
                getPrograms();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteSemester = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/semester/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response?.data?.message);
                getSemesters();
                getPrograms;
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getSemesters();
        getPrograms();
    }, []);

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Semesters</p>
                    <div className="flex justify-between">
                        <Sheet
                            onOpenChange={(x) => {
                                if (x === false) setEditMode(false);
                                if (!editMode && x) {
                                    setName("");
                                    setNumber("");
                                    setProgramId("");
                                }
                            }}
                        >
                            <SheetTrigger ref={sheetTrigger} asChild>
                                <Button>+ New Semester</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>{editMode ? "Edit" : "New"} semester</SheetTitle>
                                    <SheetDescription>
                                        {editMode ? "Edit" : "Create new"} semester.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="number" className="text-right">
                                            Number
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="number"
                                            min={1}
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Program
                                        </Label>
                                        <Select
                                            onValueChange={(x) => setProgramId(x)}
                                            value={programId}
                                        >
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
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                if (editMode) {
                                                    updateSemester();
                                                } else {
                                                    createSemester();
                                                }
                                            }}
                                        >
                                            {editMode ? "Save" : "Create"} Semester
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search semester"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>{semesters.length} semesters.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Number</TableHead>
                                    <TableHead>Program</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {semesters.map((semester: any, index: number) =>
                                    !semester.name
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                    !semester.number
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) ? (
                                        ""
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>{semester.name}</TableCell>
                                            <TableCell>{semester.number}</TableCell>
                                            <TableCell>{semester.program.name}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={"outline"}
                                                    size={"icon"}
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setEditSemesterId(semester._id);
                                                        setName(semester.name);
                                                        setProgramId(semester.progranId);
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
                                                                Delete &apos;{semester.name}
                                                                &apos; from semesters?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This
                                                                will permanently delete{" "}
                                                                {semester.name} from semester list.
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
                                                                    deleteSemester(semester._id)
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
            <Toaster />
        </>
    );
}
