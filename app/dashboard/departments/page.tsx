"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { cn, serverURL } from "@/lib/utils";
import { Toaster, toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    //New Department
    const [name, setName] = useState("");
    const [vision, setVision] = useState("");
    const [mission, setMission] = useState("");

    //Edit Department
    const [editDepartmentId, setEditDepartmentId] = useState("");

    const [departments, setDepartments] = useState<any>([]);

    const createDepartment = async () => {
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
                getDepartments();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateDepartment = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/department/${editDepartmentId}`,
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
                setEditDepartmentId("");
                setName("");
                setVision("");
                setMission("");
                getDepartments();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteDepartment = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/department/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response?.data?.message);
                getDepartments();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getDepartments = async () => {
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
                setDepartments(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getDepartments();
    });

    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Departments</p>
                    <div className="flex justify-between">
                        <Sheet
                            onOpenChange={(x) => {
                                if (x === false) setEditMode(false);
                                if (!editMode && x) {
                                    setName("");
                                    setVision("");
                                    setMission("");
                                }
                            }}
                        >
                            <SheetTrigger ref={sheetTrigger} asChild>
                                <Button>+ New Department</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>{editMode ? "Edit" : "New"} Department</SheetTitle>
                                    <SheetDescription>
                                        {editMode ? "Edit" : "Create new"} department.
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
                                        <Label htmlFor="email" className="text-right">
                                            Vision
                                        </Label>
                                        <Textarea
                                            className="col-span-3"
                                            value={vision}
                                            onChange={(e) => setVision(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Mission
                                        </Label>
                                        <Textarea
                                            className="col-span-3"
                                            value={mission}
                                            onChange={(e) => setMission(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                if (editMode) {
                                                    updateDepartment();
                                                } else {
                                                    createDepartment();
                                                }
                                            }}
                                        >
                                            {editMode ? "Save" : "Create"} Department
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search department"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>{departments.length} departments.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Vision</TableHead>
                                    <TableHead>Mission</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {departments &&
                                    departments?.map((department: any, index: number) =>
                                        !department.name
                                            .toString()
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) &&
                                        !department.createdBy
                                            ?.toString()
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ? (
                                            ""
                                        ) : (
                                            <TableRow key={index}>
                                                <TableCell>{department.name}</TableCell>
                                                <TableCell>{department.vision}</TableCell>
                                                <TableCell>{department.mission}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant={"outline"}
                                                        size={"icon"}
                                                        onClick={() => {
                                                            setEditMode(true);
                                                            setEditDepartmentId(department._id);
                                                            setName(department.name);
                                                            setVision(department.vision);
                                                            setMission(department.mission);
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
                                                                    Delete &apos;{department.name}
                                                                    &apos; from departments?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone.
                                                                    This will permanently delete
                                                                    {department.name} from deparment
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
                                                                        deleteDepartment(
                                                                            department._id,
                                                                        )
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
