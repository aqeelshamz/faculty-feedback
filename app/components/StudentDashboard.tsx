"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
import { feedbackFormColors, serverURL } from "@/lib/utils";
import axios from "axios";
import { ExternalLink, Loader2, StickyNote } from "lucide-react";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function StudentDashboard() {
    const [pendingFeedbacks, setPendingFeedbacks] = useState<any>([]);
    const [loading, setLoading] = useState(false);

    const getPendingFeedbacks = async () => {
        setLoading(true);
        const config = {
            method: "GET",
            url: `${serverURL}/feedback/pending`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setPendingFeedbacks(response?.data?.data);
                setLoading(false);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getPendingFeedbacks();
    }, []);
    return (
        <>
            {loading ? (
                <div className="p-5 flex w-full justify-center">
                    <Loader2 className="mr-2 animate-spin" /> Loading overview...
                </div>
            ) : (
                <div className="w-full h-full p-7 space-y-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            You have {pendingFeedbacks.length} pending feedbacks.
                        </h1>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        {pendingFeedbacks?.map((feedback: any, index: number) => {
                            return <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                                <div className="p-4 flex justify-between">
                                    <CardTitle className="flex">
                                        <div className="flex items-center">
                                            <div
                                                className="w-4 h-4 rounded-full mr-2"
                                                style={{
                                                    background:
                                                        feedbackFormColors[feedback.color].darkBg,
                                                }}
                                            ></div>
                                            {feedback.title}
                                        </div>
                                    </CardTitle>
                                    <StickyNote className="h-6 w-6" />
                                </div>
                                <CardContent>
                                    <CardDescription>{feedback.course.name}</CardDescription>
                                    <p className="text-xl font-bold">{feedback.description}</p>
                                </CardContent>
                                <CardFooter>
                                    <Button
                                        variant={"outline"}
                                        size={"icon"}
                                        onClick={() =>
                                            window.open(`/feedbacks/view/${feedback._id}`)
                                        }
                                    >
                                        <ExternalLink />
                                    </Button>
                                </CardFooter>
                            </Card>;
                        })}
                    </div>
                    <Toaster />
                </div>
            )}
        </>
    );
}
