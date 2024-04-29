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
import { faculties } from "@/lib/data";
import { Edit, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { departments, programs } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { cn, serverURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    const [faculties, setFaculties] = useState<any>([]);
    const [departments, setDepartments] = useState<any>([]);
    const [hods, setHods] = useState<any>([]);

    const [facultyId, setFacultyId] = useState("");
    const [departmentId, setDepartmentId] = useState("");

    const [editHodId, setEditHodId] = useState("");
    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    const getFaculties = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/faculty`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setFaculties(response?.data?.data.reverse());
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

    const getHods = async () => {
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

    const createHod = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/hod`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                facultyId,
                departmentId,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setFacultyId("");
                setDepartmentId("");
                getHods();
                getFaculties();
                getDepartments();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateHod = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/hod/${editHodId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                facultyId,
                departmentId,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setFacultyId("");
                setDepartmentId("");
                getHods();
                getFaculties();
                getDepartments();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteHod = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/hod/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response?.data?.message);
                getHods();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getHods();
        getFaculties();
        getDepartments();
    }, []);

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">HODs</p>
                    <div className="flex justify-between">
                        <Sheet
                            onOpenChange={(x) => {
                                if (x === false) setEditMode(false);
                                if (!editMode && x) {
                                    setFacultyId("");
                                    setDepartmentId("");
                                }
                            }}
                        >
                            <SheetTrigger ref={sheetTrigger} asChild>
                                <Button>+ New HOD</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>{editMode ? "Edit" : "New"} HOD</SheetTitle>
                                    <SheetDescription>
                                        {editMode ? "Edit" : "Create new"} HOD.
                                    </SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Faculty
                                        </Label>
                                        <Select
                                            onValueChange={(x) => setFacultyId(x)}
                                            value={facultyId}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select faculty" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Faculties</SelectLabel>
                                                    {faculties?.map(
                                                        (faculty: any, index: number) => {
                                                            return (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={faculty?._id}
                                                                >
                                                                    {faculty?.name} (
                                                                    {faculty?.email})
                                                                </SelectItem>
                                                            );
                                                        },
                                                    )}
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Department
                                        </Label>
                                        <Select
                                            onValueChange={(x) => setDepartmentId(x)}
                                            value={departmentId}
                                        >
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
                                    {/* <div className="items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Programs
                                        </Label>
                                        {programs.map((program, index) => {
                                            return (
                                                <div
                                                    className="flex items-center space-x-2 my-4"
                                                    key={index}
                                                >
                                                    <Checkbox id={program + index.toString()} />
                                                    <label
                                                        htmlFor={program + index.toString()}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {program.name}
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div> */}
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                if (editMode) {
                                                    updateHod();
                                                } else {
                                                    createHod();
                                                }
                                            }}
                                        >
                                            {editMode ? "Save" : "Create"} HOD
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input className="mr-4" type="text" placeholder="Search HOD" />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>{hods.length} HODs</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Faculty</TableHead>
                                    <TableHead>Department</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {hods.map((hod: any, index: number) =>
                                    !hod?.name?.toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                    !hod?.title?.toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) ? (
                                        ""
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>
                                                <span className="text-md">{hod?.name}</span>
                                                <br />
                                                <span className="text-sm">
                                                    {hod?.faculty?.title}
                                                </span>
                                                <br />
                                                <span className="text-sm opacity-50">
                                                    {hod?.email}
                                                </span>
                                            </TableCell>
                                            <TableCell>{hod.department.name}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={"outline"}
                                                    size={"icon"}
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setEditHodId(hod._id);
                                                        setFacultyId(hod.facultyId);
                                                        setDepartmentId(hod.departmentId);
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
                                                                Delete &apos;{hod.name}
                                                                &apos; from HODs?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This
                                                                will permanently delete {hod.name}{" "}
                                                                from HOD list.
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
                                                                onClick={() => deleteHod(hod._id)}
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
