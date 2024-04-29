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
    const [admins, setAdmins] = useState<any>([]);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [title, setTitle] = useState("");
    const [facultyRole, setFacultyRole] = useState("");
    const [gender, setGender] = useState("M");

    const [loading, setLoading] = useState(false);
    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    const createAdmin = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/admin`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                email: email,
                password: password,
                gender: gender,
                title: title,
                role: facultyRole,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setEmail("");
                setTitle("");
                setFacultyRole("");
                getAdmins();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteAdmin = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/admin/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast(response?.data?.message);
                getAdmins();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getAdmins = async () => {
        setLoading(true);
        const config = {
            method: "GET",
            url: `${serverURL}/admin`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setAdmins(response?.data?.data.reverse());
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getAdmins();
    }, []);

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Admins</p>
                    <div className="flex justify-between">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button>+ New Admin</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>New Admin</SheetTitle>
                                    <SheetDescription>Create new admin.</SheetDescription>
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
                                        <Button type="submit" onClick={createAdmin}>
                                            Create Admin
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search admin"
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
                                <Loader2 className="mr-2 animate-spin" /> Loading admins...
                            </div>
                        ) : (
                            <Table>
                                <TableCaption>{admins.length} admins</TableCaption>
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
                                    {admins.map((admin: any, index: number) =>
                                        !admin.name
                                            .toString()
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) &&
                                        !admin.title
                                            .toString()
                                            .toLowerCase()
                                            .includes(search.toLowerCase()) ? (
                                            ""
                                        ) : (
                                            <TableRow key={index}>
                                                <TableCell>{admin.name}</TableCell>
                                                <TableCell>{admin.email}</TableCell>
                                                <TableCell>{admin.title}</TableCell>
                                                <TableCell>{admin.role}</TableCell>
                                                <TableCell>
                                                    <Button variant={"outline"} size={"icon"}>
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
                                                                    Delete {admin.name} from admins?
                                                                </AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    This action cannot be undone.
                                                                    This will permanently delete
                                                                    {admin.name} from admin list.
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
                                                                        deleteAdmin(admin._id)
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
