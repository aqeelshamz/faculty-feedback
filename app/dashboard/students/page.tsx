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
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { cn, serverURL } from "@/lib/utils";
import { useUserStore } from "@/store";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { LuFilter } from "react-icons/lu";
import { toast } from "sonner";
import { Edit, Trash } from "lucide-react";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [students, setStudents] = useState<any>([]);
    const [batches, setBatches] = useState<any>([]);

    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);
    const [editStudentId, setEditStudentId] = useState("");

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setGender] = useState("");
    const [admNo, setAdmNo] = useState("");
    const [rollNo, setRollNo] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [batch, setBatch] = useState("");

    const createStudent = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/student`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                email: email,
                password: password,
                gender: gender,
                admNo: admNo,
                phone: phone,
                address: address,
                rollNo: rollNo,
                batchId: batch,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                getStudents();
                setName("");
                setEmail("");
                setPassword("");
                setGender("M");
                setAdmNo("");
                setRollNo("");
                setAddress("");
                setPhone("");
                setBatch("");
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateStudent = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/student/${editStudentId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                email: email,
                password: password,
                gender: gender,
                admNo: admNo,
                phone: phone,
                address: address,
                rollNo: rollNo,
                batchId: batch,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setEditStudentId("");
                setName("");
                setEmail("");
                setPassword("");
                setGender("M");
                setAdmNo("");
                setRollNo("");
                setAddress("");
                setPhone("");
                setBatch("");
                getStudents();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getStudents = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/student/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setStudents(response?.data?.data);
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

    const deleteStudent = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/student/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast(response?.data?.message);
                getStudents();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getStudents();
        getBatches();
    }, []);

    return (
        <>
            {role == "admin" || role == "faculty" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Students</p>
                    <div className="flex justify-between">
                        <Sheet
                            onOpenChange={(x) => {
                                if (x === false) setEditMode(false);
                                if (!editMode && x) {
                                    setName("");
                                    setEmail("");
                                    setPassword("");
                                    setGender("M");
                                    setAdmNo("");
                                    setRollNo("");
                                    setAddress("");
                                    setPhone("");
                                    setBatch("");
                                }
                            }}
                        >
                            <SheetTrigger ref={sheetTrigger} asChild>
                                <Button>+ New Student</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>{editMode ? "Edit" : "New"} Student</SheetTitle>
                                    <SheetDescription>
                                        {" "}
                                        {editMode ? "Edit" : "Create new"} student.
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
                                            id="name"
                                            value={name}
                                            onChange={(x) => setName(x.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="email" className="text-right">
                                            Email
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(x) => setEmail(x.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="password" className="text-right">
                                            Password
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="password"
                                            id="password"
                                            value={password}
                                            onChange={(x) => setPassword(x.target.value)}
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
                                        <Label htmlFor="admNo" className="text-right">
                                            Adm. No.
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="text"
                                            id="admNo"
                                            value={admNo}
                                            onChange={(x) => setAdmNo(x.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="phone" className="text-right">
                                            Phone
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="tel"
                                            id="phone"
                                            value={phone}
                                            onChange={(x) => setPhone(x.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="address" className="text-right">
                                            Address
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="text"
                                            id="address"
                                            value={address}
                                            onChange={(x) => setAddress(x.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="rollNo" className="text-right">
                                            Roll No.
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="number"
                                            id="rollNo"
                                            value={rollNo}
                                            onChange={(x) => setRollNo(x.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="batchId" className="text-right">
                                            Batch
                                        </Label>
                                        <Select onValueChange={(x) => setBatch(x)} value={batch}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select batch" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Batches</SelectLabel>
                                                    {batches?.map((batch: any, index: number) => {
                                                        return (
                                                            <SelectItem
                                                                key={index}
                                                                value={batch?._id}
                                                            >
                                                                {batch?.name} {batch?.program}
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
                                                    updateStudent();
                                                } else {
                                                    createStudent();
                                                }
                                            }}
                                        >
                                            {editMode ? "Save" : "Create"} Student
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input className="mr-4" type="text" placeholder="Search students" />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>{students.length} students</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Adm. No.</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Phone</TableHead>
                                    <TableHead>Address</TableHead>
                                    <TableHead>BatchId</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {students.map((student: any, index: number) => (
                                    <TableRow key={index}>
                                        <TableCell>{student.admNo}</TableCell>
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.email}</TableCell>
                                        <TableCell>{student.phone}</TableCell>
                                        <TableCell>{student.address}</TableCell>
                                        <TableCell>{student.batchId}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant={"outline"}
                                                size={"icon"}
                                                onClick={() => {
                                                    setEditMode(true);
                                                    setEditStudentId(student._id);
                                                    setName("");
                                                    setEmail("");
                                                    setPassword("");
                                                    setGender("M");
                                                    setAdmNo("");
                                                    setRollNo("");
                                                    setAddress("");
                                                    setPhone("");
                                                    setBatch("");
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
                                                            Delete &apos;{student.name}&apos; from
                                                            students?
                                                        </AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            This action cannot be undone. This will
                                                            permanently delete {student.name} from
                                                            student list.
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
                                                                deleteStudent(student._id)
                                                            }
                                                        >
                                                            Delete
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
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
