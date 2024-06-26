"use client";
import { Button } from "@/components/ui/button";
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
import { useUserStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { serverURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";

export default function AdminFeedback() {
    const role = useUserStore((state) => state.role);
    const [search, setSearch] = useState("");
    const [feedbacks, setFeedbacks] = useState<any>([]);

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
                {/*
                                <Sheet>
                                    <SheetTrigger asChild>
                                        <Button>+ New Feedback</Button>
                                    </SheetTrigger>
                                    <SheetContent side={"left"}>
                                        <SheetHeader>
                                            <SheetTitle>New Feedback</SheetTitle>
                                            <SheetDescription>
                                                Create new feedback.
                                            </SheetDescription>
                                        </SheetHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Name
                                                </Label>
                                                <Input className="col-span-3" type="text" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="email" className="text-right">
                                                    Email
                                                </Label>
                                                <Input className="col-span-3" type="email" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="title" className="text-right">
                                                    Title
                                                </Label>
                                                <Input className="col-span-3" type="text" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="role" className="text-right">
                                                    Role
                                                </Label>
                                                <Input className="col-span-3" type="text" />
                                            </div>
                                        </div>
                                        <SheetFooter>
                                            <SheetClose asChild>
                                                <Button type="submit">Add Feedback</Button>
                                            </SheetClose>
                                        </SheetFooter>
                                    </SheetContent>
                                </Sheet>
                            
            */}
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
                            <TableHead>Created by</TableHead>
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
                                    <TableCell>{feedback.createdBy.name}</TableCell>
                                </TableRow>
                            ),
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
