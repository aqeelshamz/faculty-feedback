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
import { Edit, Trash } from "lucide-react";

export default function FacultyFeedback() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");
    const [feedbacks, setFeedbacks] = useState<any>([]);
    const [editFeedbackId, setEditFeedbackId] = useState("");
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const sheetTrigger = useRef<any>();
    const [editMode, setEditMode] = useState(false);

    const createFeedback = () => {};

    const updateFeedback = async () => {
        const config = {
            method: "PUT",
            url: `${serverURL}/feedback/${editFeedbackId}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                title: title,
                description: description,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setEditFeedbackId("");
                setTitle("");
                setDescription("");
                getFeedbacks();
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

    useEffect(() => {
        getFeedbacks();
    }, []);

    return (
        <div className="w-full h-screen p-7 overflow-y-auto">
            <p className="font-semibold text-2xl mb-4">Feedbacks</p>
            <div className="flex justify-between">
                <div />
                <Sheet
                    onOpenChange={(x) => {
                        if (x === false) setEditMode(false);
                        if (!editMode && x) {
                            setTitle("");
                            setDescription("");
                        }
                    }}
                >
                    <SheetTrigger asChild>
                        <Button>+ New Feedback</Button>
                    </SheetTrigger>
                    <SheetContent side={"left"}>
                        <SheetHeader>
                            <SheetTitle>{editMode ? "Edit" : "New"} Feedback</SheetTitle>
                            <SheetDescription>
                                {" "}
                                {editMode ? "Edit" : "Create new"} feedback.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
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
                                <Label htmlFor="description" className="text-right">
                                    Description
                                </Label>
                                <Input
                                    className="col-span-3"
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                        <Button
                                            type="submit"
                                            onClick={() => {
                                                if (editMode) {
                                                    updateFeedback();
                                                } else {
                                                    createFeedback();
                                                }
                                            }}>
                                        
                              {editMode ? "Save" : "Create"} Feedback</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
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
                                            onClick={() => {
                                                setEditMode(true);
                                                setEditFeedbackId(feedback._id);
                                                setTitle(feedback.title);
                                                setDescription(feedback.description);
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
