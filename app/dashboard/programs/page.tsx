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
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn, serverURL } from "@/lib/utils";
import { useUserStore } from "@/store";
import axios from "axios";
import { departments } from "@/lib/data";
import { Edit, Loader2, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { LuFilter } from "react-icons/lu";
import { toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    const [name, setName] = useState("");
    const [hod, setHod] = useState("");

    const [hods, setHods] = useState([]);

    //Edit Program
    const [editProgramId, setEditProgramId] = useState("");

    const [loading, setLoading] = useState(false);
    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    const [programs, setPrograms] = useState<any>([]);

    const createProgram = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/program/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                hodId: hod,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setHod("");
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
                hodId: hod,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setEditProgramId("");
                setName("");
                setHod("");
                getPrograms();
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
        setLoading(true);
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
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getHODs = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/hod`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setHods(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getPrograms();
        getHODs();
    }, []);

    return (
        <>
            {role == "admin" || role == "faculty" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Programs</p>
                    <div className="flex justify-between">
                        <Sheet
                            onOpenChange={(x) => {
                                if (x === false) setEditMode(false);
                                if (!editMode && x) {
                                    setName("");
                                    setHod("");
                                }
                            }}
                        >
                            <SheetTrigger ref={sheetTrigger} asChild>
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
                                        <Input
                                            className="col-span-3"
                                            type="text"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="hod" className="text-right">
                                            HOD
                                        </Label>
                                        <Select onValueChange={(x) => setHod(x)} value={hod}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select HOD" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>HOD</SelectLabel>
                                                    {hods?.map((hod: any, index: number) => {
                                                        return (
                                                            <SelectItem
                                                                key={index}
                                                                value={hod?._id}
                                                            >
                                                                {hod?.name}
                                                            </SelectItem>
                                                        );
                                                    })}
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
                                                    updateProgram();
                                                } else {
                                                    createProgram();
                                                }
                                            }}
                                        >
                                            {editMode ? "Save" : "Create"} program
                                        </Button>
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
                        {loading ? (
                            <div className="p-5 flex w-full justify-center">
                                <Loader2 className="mr-2 animate-spin" /> Loading programs...
                            </div>
                        ) : (
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
                                    {programs.map((program: any, index: number) =>
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
                                                <TableCell>
                                                    <span className="text-md">
                                                        {program?.hod?.name}
                                                    </span>
                                                    <br />
                                                    <span className="text-sm">
                                                        {program?.hod?.title}
                                                    </span>
                                                    <br />
                                                    <span className="text-sm opacity-50">
                                                        {program?.hod?.email}
                                                    </span>
                                                </TableCell>
                                                <TableCell>{program?.department?.name}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant={"outline"}
                                                        size={"icon"}
                                                        onClick={() => {
                                                            setEditMode(true);
                                                            setEditProgramId(program._id);
                                                            setName(program.name);
                                                            setHod(program.hod);
                                                            sheetTrigger.current.click();
                                                        }}
                                                    >
                                                        <Edit />
                                                    </Button>
                                                </TableCell>
                                                <TableCell>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                size={"icon"}
                                                            >
                                                                <Trash />
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>
                                                                    Delete &apos;{program.name}
                                                                    &apos; from programs?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone.
                                                                    This will permanently delete
                                                                    {program.name} from program
                                                                    list.
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
                                                                        deleteProgram(program._id)
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
                        )}
                    </div>
                </div>
            ) : (
                <></>
            )}
        </>
    );
}
