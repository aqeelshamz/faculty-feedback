"use client";
import { Button } from "@/components/ui/button";
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
import { useFacultyStore, useUserStore } from "@/store";
import { Edit, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { serverURL } from "@/lib/utils";
import { Toaster, toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    //New Department
    const [name, setName] = useState("");
    const [vision, setVision] = useState("");
    const [mission, setMission] = useState("");

    const [departments, setDepartments] = useState<any>([]);
    const [loading, setLoading] = useState(true);

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
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteDepartment = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/department/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                id: id,
            },
        };

        axios(config)
            .then((response) => {
                toast(response?.data?.message);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        const fetchData = async () => {
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
        setLoading(true);
        fetchData();
        setLoading(false);
    }, [departments]);

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Departments</p>
                    <div className="flex justify-between">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>+ New Department</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>New Department</SheetTitle>
                                    <SheetDescription>Create new department.</SheetDescription>
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
                                        <Button type="submit" onClick={createDepartment}>
                                            Add Department
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
                        {loading ? (
                            <div>
                                <span className="loading loading-spinner loading-lg"></span>
                            </div>
                        ) : (
                            <>
                                <Table>
                                    <TableCaption>A list of departments.</TableCaption>
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
                                                                        onClick={() =>
                                                                            deleteDepartment(
                                                                                department._id,
                                                                            )
                                                                        }
                                                                    >
                                                                        <Trash />
                                                                    </Button>
                                                                </AlertDialogTrigger>
                                                                <AlertDialogContent>
                                                                    <AlertDialogHeader>
                                                                        <AlertDialogTitle>
                                                                            Are you absolutely sure?
                                                                        </AlertDialogTitle>
                                                                        <AlertDialogDescription>
                                                                            This action cannot be
                                                                            undone. This will
                                                                            permanently delete your
                                                                            account and remove your
                                                                            data from our servers.
                                                                        </AlertDialogDescription>
                                                                    </AlertDialogHeader>
                                                                    <AlertDialogFooter>
                                                                        <AlertDialogCancel>
                                                                            Cancel
                                                                        </AlertDialogCancel>
                                                                        <AlertDialogAction>
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
                            </>
                        )}
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
            <Toaster />
        </>
    );
}
