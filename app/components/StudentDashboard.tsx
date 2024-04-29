"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { serverURL } from "@/lib/utils";
import axios from "axios";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";

export default function StudentDashboard() {
    const [pendingFeedbacks, setPendingFeedbacks] = useState<any>([]);

    const getPendingFeedbacks = async () => {
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
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getPendingFeedbacks();
    }, []);
    return (
        <div className="w-full h-full p-7 space-y-4">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                {/* <Card className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4">
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Surveys</CardTitle>
                        <StickyNote className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">13</p>
                    </CardContent>
                </Card> */}
            </div>
            <div>
                {pendingFeedbacks > 0 && (
                    <h1 className="text-xl font-bold">
                        You have {pendingFeedbacks.length} pending feedbacks.
                    </h1>
                )}
            </div>

            <Toaster />
        </div>
    );
}
