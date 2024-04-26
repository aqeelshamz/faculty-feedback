"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { useUserStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { cn, serverURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Edit, Eye, Trash } from "lucide-react";
import { DialogTrigger } from "@radix-ui/react-dialog";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

export default function FacultyFeedback() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");
    const [feedbacks, setFeedbacks] = useState<any>([]);
    const [courses, setCourses] = useState<any>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [course, setCourse] = useState("");

    const router = useRouter();

    const createFeedback = () => {
        const config = {
            method: "POST",
            url: `${serverURL}/feedback/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                title,
                description,
                course,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setTitle("");
                setDescription("");
                setCourse("");
                getFeedbacks();
                getCourses();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getFeedbacks = async () => {
        const config = {
            method: "GET",
            url: `${serverURL}/feedback/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setFeedbacks(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const deleteFeedback = async (id: string) => {
        const config = {
            method: "DELETE",
            url: `${serverURL}/feedback/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response?.data?.message);
                getFeedbacks();
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

    useEffect(() => {
        getFeedbacks();
        getCourses();
    }, []);

    return (
        <div className="w-full h-screen p-7 overflow-y-auto">
            <p className="font-semibold text-2xl mb-4">Feedbacks</p>
            <div className="flex justify-between">
                <Dialog>
                    <DialogTrigger>
                        <Button>+ Create Feedback</Button>
                    </DialogTrigger>
                    <DialogContent className="space-y-4">
                        <DialogHeader className="space-y-4">
                            <DialogTitle>Create new feedback survey</DialogTitle>
                            <DialogDescription>
                                Create a feedback survey to collect data from students. Enter the
                                details below to continue to editor.
                            </DialogDescription>
                            <Input
                                placeholder="Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                            <Textarea
                                placeholder="Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                            <Select value={course} onValueChange={(x) => setCourse(x)}>
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select course" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Courses</SelectLabel>
                                        {courses?.map((course: any, index: number) => {
                                            return (
                                                <SelectItem key={index} value={course?._id}>
                                                    {course?.name}
                                                </SelectItem>
                                            );
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </DialogHeader>
                        <DialogFooter>
                            <Button onClick={createFeedback}>Continue in editor</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <div className="flex">
                    <Input
                        className="mr-4"
                        type="text"
                        placeholder="Search feedback"
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <Button variant="outline">
                        <LuFilter className="mr-2" /> View
                    </Button>
                </div>
            </div>
            <div className="m-10">
                <Table>
                    <TableCaption>{feedbacks.length} feedbacks</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Title</TableHead>
                            <TableHead>Desciption</TableHead>
                            <TableHead>Course</TableHead>
                            <TableHead>Edit</TableHead>
                            <TableHead>Delete</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {feedbacks.map((feedback: any, index: number) =>
                            !feedback.title
                                .toString()
                                .toLowerCase()
                                .includes(search.toLowerCase()) &&
                            !feedback.course
                                .toString()
                                .toLowerCase()
                                .includes(search.toLowerCase()) &&
                            !feedback.createdby
                                .toString()
                                .toLowerCase()
                                .includes(search.toLowerCase()) &&
                            !feedback.description
                                .toString()
                                .toLowerCase()
                                .includes(search.toLowerCase()) ? (
                                ""
                            ) : (
                                <TableRow key={index}>
                                    <TableCell>{feedback.title}</TableCell>
                                    <TableCell>{feedback.description}</TableCell>
                                    <TableCell>{feedback.course.name}</TableCell>
                                    <TableCell>
                                        <Button
                                            variant={"outline"}
                                            size={"icon"}
                                            onClick={() =>
                                                router.push(
                                                    "/dashboard/feedbacks/edit/{feedback._id}",
                                                )
                                            }
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
                                                        Delete &apos;{feedback.name}
                                                        &apos; from feedbacks?
                                                    </AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        This action cannot be undone. This will
                                                        permanently delete
                                                        {feedback.name} from feedback list.
                                                    </AlertDialogDescription>
                                                </AlertDialogHeader>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction
                                                        className={cn(
                                                            buttonVariants({
                                                                variant: "destructive",
                                                            }),
                                                        )}
                                                        onClick={() => deleteFeedback(feedback._id)}
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
    );
}
