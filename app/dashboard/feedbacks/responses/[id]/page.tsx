"use client";

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { serverURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { useParams } from "next/navigation";

export default function FeedbackResponses() {
    const { id } = useParams();
    const [feedbacks, setFeedbacks] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const getResponses = async () => {
        setLoading(true);
        const config = {
            method: "GET",
            url: `${serverURL}/feedback/responses/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setFeedbacks(response?.data?.data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getResponses();
    }, []);

    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Feedback responses</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Student Name</TableCell>
                                {Object.values(feedbacks[0])[0] ?
                                    Object.keys(Object.values(feedbacks[0])[0]!).map((question) => (
                                        <TableCell key={question}>{question}</TableCell>
                                    )) : ""
                                }
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {feedbacks.map((feedback: any) => {
                                const response: any = Object.values(feedback)[0];
                                return (
                                    <TableRow key={Object.keys(feedback)[0]}>
                                        <TableCell>{Object.keys(feedback)[0]}</TableCell>
                                        {Object.keys(response!).map((question) => (
                                            <TableCell key={question}>{response[question]}</TableCell>
                                        ))}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </>
    );
}
