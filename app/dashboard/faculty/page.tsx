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
import { Edit, Loader2, Trash } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn, serverURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");
    const [faculties, setFaculties] = useState<any>([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [facultyRole, setFacultyRole] = useState("");
    const [gender, setGender] = useState("M");

    const [loading, setLoading] = useState(false);
    const [editFacultyId, setEditFacultyId] = useState("");
    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    const createFaculty = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/faculty`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name,
                email,
                password,
                title,
                role: facultyRole,
                gender,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setEmail("");
                setTitle("");
                setPassword("");
                setFacultyRole("");
                getFaculties();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateFaculty = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/faculty/${editFacultyId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name,
                email,
                password,
                title,
                role: facultyRole,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setEmail("");
                setPassword("");
                setTitle("");
                setFacultyRole("");
                getFaculties();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteFaculty = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/faculty/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast(response?.data?.message);
                getFaculties();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getFaculties = async () => {
        setLoading(true);
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
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getFaculties();
    }, []);

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Faculty</p>
                    <div className="flex justify-between">
                        <Sheet
                            onOpenChange={(x) => {
                                if (x === false) setEditMode(false);
                                if (!editMode && x) {
                                    setName("");
                                    setEmail("");
                                    setPassword("");
                                    setTitle("");
                                    setFacultyRole("");
                                }
                            }}
                        >
                            <SheetTrigger ref={sheetTrigger} asChild>
                                <Button>+ New Faculty</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>{editMode ? "Edit" : "New"} Faculty</SheetTitle>
                                    <SheetDescription>
                                        {editMode ? "Edit" : "Create new"} faculty.
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
                                            Email
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="password" className="text-right">
                                            Password
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            disabled={editMode && false}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="admNo" className="text-right">
                                            Gender
                                        </Label>
                                        <Select onValueChange={(x) => setGender(x)} value={gender}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select gender" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Gender</SelectLabel>
                                                    <SelectItem key={0} value={"M"}>
                                                        Male
                                                    </SelectItem>
                                                    <SelectItem key={1} value={"F"}>
                                                        Female
                                                    </SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="title" className="text-right">
                                            Title
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="role" className="text-right">
                                            Role
                                        </Label>
                                        <Select
                                            onValueChange={(x) => setFacultyRole(x)}
                                            value={facultyRole}
                                        >
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Role</SelectLabel>
                                                    {["HOD", "Tutor", "Teacher"]?.map(
                                                        (facultyRole: any, index: number) => {
                                                            return (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={facultyRole.toLowerCase()}
                                                                >
                                                                    {facultyRole}
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
                                                    updateFaculty();
                                                } else {
                                                    createFaculty();
                                                }
                                            }}
                                        >
                                            {editMode ? "Save" : "Create"} Faculty
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search faculty"
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
                                <Loader2 className="mr-2 animate-spin" /> Loading faculties...
                            </div>
                        ) : (
                            <Table>
                                <TableCaption>{faculties.length} faculties</TableCaption>
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
                                    {faculties.map((faculty: any, index: number) =>
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
                                                    <Button
                                                        variant={"outline"}
                                                        size={"icon"}
                                                        onClick={() => {
                                                            setEditMode(true);
                                                            setEditFacultyId(faculty._id);
                                                            setName(faculty.name);
                                                            setEmail(faculty.email);
                                                            setTitle(faculty.title);
                                                            setFacultyRole(faculty.facultyRole);
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
                                                                    Delete {faculty.name} from
                                                                    faculties?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone.
                                                                    This will permanently delete
                                                                    {faculty.name} from faculty
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
                                                                        deleteFaculty(faculty._id)
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
