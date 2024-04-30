"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
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
                <div className="w-full h-full p-6 space-y-4">
                    <div>
                        <h1 className="text-2xl font-semibold">
                            You have {pendingFeedbacks.length} pending feedbacks.
                        </h1>
                    </div>
                    <div className="grid gap-2 md:grid-cols-2 md:gap-6 lg:grid-cols-4">
                        {pendingFeedbacks?.map((feedback: any, index: number) => {
                            return (
                                <Card
                                    key={index}
                                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                                >
                                    <div className="flex justify-between">
                                        <CardHeader>
                                            <CardTitle className="flex">
                                                <div className="flex mr-2">{feedback.title}</div>
                                            </CardTitle>
                                            <CardDescription>
                                                {feedback.course.name}
                                            </CardDescription>
                                        </CardHeader>
                                        <Button
                                            variant={"outline"}
                                            size={"icon"}
                                            className="m-3"
                                            onClick={() =>
                                                window.open(`/feedbacks/view/${feedback._id}`)
                                            }
                                        >
                                            <ExternalLink />
                                        </Button>
                                    </div>
                                    <CardContent>
                                        <p className="text-md font-normal">
                                            {feedback.description}
                                        </p>
                                    </CardContent>
                                    {/* <CardFooter>
                                        <div
                                            className="w-full h-4 rounded-full p-2"
                                            style={{
                                                background:
                                                    feedbackFormColors[feedback.color].darkBg,
                                            }}
                                        ></div>
                                    </CardFooter> */}
                                </Card>
                            );
                        })}
                    </div>
                    <Toaster />
                </div>
            )}
        </>
    );
}
