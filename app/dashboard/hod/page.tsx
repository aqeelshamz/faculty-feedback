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
import { useUserStore } from "@/store";
import { faculties } from "@/lib/data";
import { Edit, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { departments, programs } from "@/lib/data";
import { Checkbox } from "@/components/ui/checkbox";
import { serverURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");

    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    const [hods, setHods] = useState<any>([]);

    /* const createHod = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/hod/`,
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
                getHods();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });

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

    const updateHod= async () => {
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

   */

    // const deleteHod = async (id: string) => {
    //     const config = {
    //         method: "DELETE",
    //         url: `${serverURL}/hod/${id}`,
    //         headers: {
    //             Authorization: `Bearer ${localStorage.getItem("token")}`,
    //             "Content-Type": "application/json",
    //         },
    //     };

    //     axios(config)
    //         .then((response) => {
    //             toast(response?.data?.message);
    //             getHods();
    //         })
    //         .catch((err) => {
    //             toast.error(err.response?.data?.message);
    //         });
    // };

    /*const getHods = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/hod/`,
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
        getHods();
  }, []);
*/

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">HODs</p>
                    <div className="flex justify-between">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>+ New HOD</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>New HOD</SheetTitle>
                                    <SheetDescription>Create new HOD.</SheetDescription>
                                </SheetHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Faculty
                                        </Label>
                                        <Select>
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
                                                                    value={faculty?.name}
                                                                >
                                                                    {faculty?.name}
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
                                        <Select>
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
                                    <div className="items-center gap-4">
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
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit">Add HOD</Button>
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
                            <TableCaption>A list of hod.</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Role</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {faculties.map((faculty, index: number) =>
                                    !faculty.name
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                        !faculty.title
                                            .toString()
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ? (
                                        ""
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>{faculty.name}</TableCell>
                                            <TableCell>{faculty.email}</TableCell>
                                            <TableCell>{faculty.title}</TableCell>
                                            <TableCell>{faculty.role}</TableCell>
                                            <TableCell>
                                                <Button variant={"outline"} size={"icon"}>
                                                    <Edit />
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button variant={"outline"} size={"icon"}>
                                                    <Trash />
                                                </Button>
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
