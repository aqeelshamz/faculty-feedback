"use client";

import { Toaster } from "sonner";
import { feedbackFormColors, serverURL } from "@/lib/utils";
import axios from "axios";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Page() {
    const { id } = useParams();

    const [feedback, setFeedback] = useState<any>({});

    const [currentStep, setCurrentStep] = useState(-1);

    const getFeedback = () => {
        const config = {
            method: "GET",
            url: `${serverURL}/feedback/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setFeedback(response?.data?.data);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    }

    useEffect(() => {
        getFeedback();
    }, [])

    return (
        <div className={`flex w-screen h-screen flex-col justify-between items-center`} style={{ background: feedbackFormColors[feedback?.color]?.lightBg, color: feedbackFormColors[feedback?.color]?.text }}>
            <Progress value={50} />
            {currentStep === -1 ? <div className="flex flex-col items-center">
                <h1 className={`text-3xl font-bold`}>{feedback?.title}</h1>
                <p className="mb-10">{feedback.description}</p>
                <Button onClick={() => setCurrentStep(0)}>Start</Button>
            </div> : <div className="flex flex-col items-center">
                <h1 className={`text-3xl font-bold flex`}>{feedback?.questions[currentStep]?.question}{feedback?.questions[currentStep]?.settings?.required ? <span className="text-red-700 font-normal text-md">*</span> : ""}</h1>
                <p className="mb-10">{feedback?.questions[currentStep]?.question}</p>
                <div className="mb-10 w-full">
                    {
                        feedback?.questions[currentStep]?.settings?.type === "rating" ? <div className="flex">
                            {Array(5).fill(0).map((_, index) => (
                                <div key={index} className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-gray-300 cursor-pointer hover:border-gray-500" onClick={() => {
                                    const newFeedback = { ...feedback };
                                    newFeedback.questions[currentStep].response = index + 1;
                                    setFeedback(newFeedback);
                                }}>{index + 1}</div>
                            ))}
                        </div> : feedback?.questions[currentStep]?.settings?.type === "text" ? <Input /> : feedback?.questions[currentStep]?.settings?.type === "longtext" ? <Textarea /> : null
                    }
                </div>
                <Button onClick={() => {
                    if (currentStep === feedback.questions.length - 1) {
                        setCurrentStep(-1);
                    }
                    else {
                        setCurrentStep(currentStep + 1);
                    }
                }}>{
                        currentStep === feedback.questions.length - 1 ? "Submit" : "Next"
                    }</Button>
            </div>}
            <div className="flex w-full p-5">
                <Button className="mr-2" size={"icon"} onClick={() => {
                    if (currentStep > -1) {
                        setCurrentStep(-1);
                    }
                }}><ChevronUp /></Button>
                <Button size={"icon"} onClick={() => {
                    if (currentStep < feedback.questions.length - 1) {
                        setCurrentStep(currentStep + 1);
                    }
                }}><ChevronDown /></Button>
            </div>
            <Toaster />
        </div>
    );
}
