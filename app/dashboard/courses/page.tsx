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
import { Checkbox } from "@/components/ui/checkbox";
import axios from "axios";
import { cn, serverURL } from "@/lib/utils";
import { toast } from "sonner";

export default function Page() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");
    const [courses, setCourses] = useState<any>([]);
    const [faculties, setFaculties] = useState<any>([]);
    const [programs, setPrograms] = useState<any>([]);
    const [semesters, setSemesters] = useState<any>([]);

    //New Course
    const [name, setName] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [semester, setSemester] = useState("");
    const [program, setProgram] = useState("");
    const [courseFaculties, setCourseFaculties] = useState<any>([]);

    //Edit Course
    const [editCourseId, setEditCourseId] = useState("");

    const createCourse = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/course`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                courseCode: courseCode,
                semester: semester,
                faculties: courseFaculties,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setCourseCode("");
                setSemester("");
                setCourseFaculties([]);
                getCourses();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateCourse = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/course/${editCourseId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name: name,
                courseCode: courseCode,
                semester: semester,
                faculties: courseFaculties,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setEditCourseId("");
                setName("");
                setCourseCode("");
                setSemester("");
                setCourseFaculties([]);
                getCourses();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteCourse = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/course/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response?.data?.message);
                getCourses();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getCourses = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/course/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setCourses(response?.data?.data);
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

    const getSemesters = async (programId: string) => {
        const config = {
            method: "POST",
            url: `${serverURL}/semester/get-all-by-program/${programId}`,
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

    const getFaculties = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/faculty/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setFaculties(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getCourses();
        getPrograms();
        getFaculties();
    }, []);

    useEffect(()=>{
        getSemesters(program);
    },[program])

    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    return (
        <>
            {role == "admin" ? (
                <div className="w-full h-screen p-7 overflow-y-auto">
                    <p className="font-semibold text-2xl mb-4">Courses</p>
                    <div className="flex justify-between">
                        <Sheet
                            onOpenChange={(x) => {
                                if (x === false) setEditMode(false);
                                if (!editMode && x) {
                                    setCourseCode("");
                                    setSemester("");
                                    setCourseFaculties([]);
                                }
                            }}
                        >
                            <SheetTrigger asChild>
                                <Button>+ New Course</Button>
                            </SheetTrigger>
                            <SheetContent side={"left"}>
                                <SheetHeader>
                                    <SheetTitle>{editMode ? "Edit" : "New"} Course</SheetTitle>
                                    <SheetDescription>
                                        {editMode ? "Edit" : "Create new"} course.
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
                                        <Label htmlFor="title" className="text-right">
                                            Course Code
                                        </Label>
                                        <Input
                                            className="col-span-3"
                                            type="text"
                                            value={courseCode}
                                            onChange={(e) => setCourseCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="course" className="text-right">
                                            Program
                                        </Label>
                                        <Select value={program} onValueChange={(x)=>setProgram(x)}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select program" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Program</SelectLabel>
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
                                        <Label htmlFor="course" className="text-right">
                                            Semester
                                        </Label>
                                        <Select value={semester} onValueChange={(x)=>setSemester(x)}>
                                            <SelectTrigger className="col-span-3">
                                                <SelectValue placeholder="Select semester" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectGroup>
                                                    <SelectLabel>Semester</SelectLabel>
                                                    {semesters?.map(
                                                        (semester: any, index: number) => {
                                                            return (
                                                                <SelectItem
                                                                    key={index}
                                                                    value={semester?._id}
                                                                >
                                                                    {semester?.name}
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
                                            Faculties
                                        </Label>
                                        {faculties.map((faculty: any, index: number) => {
                                            return (
                                                <div
                                                    className="flex items-center space-x-2 my-4"
                                                    key={index}
                                                >
                                                    <Checkbox id={faculty + index.toString()} />
                                                    <label
                                                        htmlFor={faculty + index.toString()}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {faculty.name} <span className="opacity-50">({faculty.email})</span>
                                                    </label>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                                <SheetFooter>
                                    <SheetClose asChild>
                                        <Button type="submit" onClick={createCourse}>
                                            Add Course
                                        </Button>
                                    </SheetClose>
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                        <div className="flex">
                            <Input
                                className="mr-4"
                                type="text"
                                placeholder="Search course"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button variant="outline">
                                <LuFilter className="mr-2" /> View
                            </Button>
                        </div>
                    </div>
                    <div className="m-10">
                        <Table>
                            <TableCaption>{courses.length} courses</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Course Code</TableHead>
                                    <TableHead>Semester</TableHead>
                                    <TableHead>Faculties</TableHead>
                                    <TableHead>Edit</TableHead>
                                    <TableHead>Delete</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {courses.map((course: any, index: number) =>
                                    !course.name
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) &&
                                    !course.courseCode
                                        .toString()
                                        .toLowerCase()
                                        .includes(search.toLowerCase()) ? (
                                        ""
                                    ) : (
                                        <TableRow key={index}>
                                            <TableCell>{course.name}</TableCell>
                                            <TableCell>{course.courseCode}</TableCell>
                                            <TableCell>{course.semester}</TableCell>
                                            <TableCell>{course.courseFaculties}</TableCell>
                                            <TableCell>
                                                <Button
                                                    variant={"outline"}
                                                    size={"icon"}
                                                    onClick={() => {
                                                        setEditMode(true);
                                                        setEditCourseId(course._id);
                                                        setName(course.name);
                                                        setCourseCode(course.courseCode);
                                                        setSemester(course.semester);
                                                        setCourseFaculties(course.courseFaculties);
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
                                                                Delete &apos;{course.name}
                                                                &apos; from courses?
                                                            </AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                This action cannot be undone. This
                                                                will permanently delete
                                                                {course.name} from course list.
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
                                                                    deleteCourse(course._id)
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
