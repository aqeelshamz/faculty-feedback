"use client";

import { feedbackFormColors, serverURL } from "@/lib/utils";
import axios from "axios";
import { useParams } from "next/navigation";
import { useRef, useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, ChevronDown, ChevronUp, XCircle } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import Confetti from "react-canvas-confetti";
import FireworksConfetti from "../../../components/Fireworks";

export default function ViewFeedback() {
    const { id } = useParams();

    const [feedback, setFeedback] = useState<any>({});

    const [currentStep, setCurrentStep] = useState(-1);

    const [status, setStatus] = useState({
        message: "",
        success: false,
    });
    const [shoot, setShoot] = useState(false);
    const confettiRef = useRef(null);

    useEffect(() => {
        if (status.success) {
            setShoot(true);
        }
    }, [status]);

    useEffect(() => {
        if (shoot) {
            setShoot(false);
        }
    }, [shoot]);

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
    };

    const submitFeedback = () => {
        const config = {
            method: "POST",
            url: `${serverURL}/feedback/submit`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                feedbackId: id,
                responses,
            },
        };

        axios(config)
            .then((response) => {
                setStatus({
                    message: response?.data?.message,
                    success: true,
                });
            })
            .catch((err) => {
                setStatus({
                    message: err.response?.data?.message
                        ? err.response?.data?.message
                        : err.response?.data,
                    success: false,
                });
            });
    };

    useEffect(() => {
        getFeedback();
    }, []);

    const [responses, setResponses] = useState<any>({});

    useEffect(() => {
        if (feedback.questions) {
            for (const question of feedback.questions) {
                responses[question._id] = question.settings.type === "rating" ? 0 : "";
            }
        }
        setResponses({ ...responses });
    }, [feedback]);

    useEffect(() => {
        console.log(responses);
    }, [responses]);

    return (
        <div
            className={`flex w-screen h-screen flex-col justify-between items-center`}
            style={{
                background: feedbackFormColors[feedback?.color]?.lightBg,
                color: feedbackFormColors[feedback?.color]?.text,
            }}
        >
            <FireworksConfetti durationUntilStop={5000} />
            <Progress
                value={
                    feedback?.questions === undefined
                        ? 0
                        : ((currentStep === -1 ? 0 : currentStep + 1) /
                              feedback?.questions?.length) *
                          100
                }
                color={feedbackFormColors[feedback?.color]?.primary}
                className="w-full"
            />
            {status.message ? (
                <div className="flex flex-col">
                    <p className="text-2xl flex items-center">
                        {status.success ? (
                            <CheckCircle2 className="mr-2" />
                        ) : (
                            <XCircle className="mr-2" />
                        )}{" "}
                        {status.message}
                    </p>
                    <Button
                        className="mt-10"
                        onClick={() => {
                            if (status.success) {
                                window.close();
                            } else {
                                window.location.reload();
                            }
                        }}
                    >
                        {" "}
                        {status.success ? "Close window" : "Reload"}
                    </Button>
                </div>
            ) : currentStep === -1 ? (
                <div className="flex flex-col items-center">
                    <h1 className={`text-3xl font-bold`}>{feedback?.title}</h1>
                    <p className="mb-10">{feedback.description}</p>
                    <Button onClick={() => setCurrentStep(0)}>Start</Button>
                </div>
            ) : (
                <div className="flex flex-col items-center">
                    <h1 className={`text-3xl font-bold flex`}>
                        {feedback?.questions[currentStep]?.question}
                        {feedback?.questions[currentStep]?.settings?.required ? (
                            <span className="text-red-700 font-normal text-md">*</span>
                        ) : (
                            ""
                        )}
                    </h1>
                    <p className="mb-10">{feedback?.questions[currentStep]?.question}</p>
                    <div className="mb-10 w-full">
                        {feedback?.questions[currentStep]?.settings?.type === "rating" ? (
                            <div className="flex w-full justify-center">
                                {Array(5)
                                    .fill(0)
                                    .map((_, index) => (
                                        <div
                                            key={index}
                                            className={
                                                "flex duration-100 items-center justify-center w-14 h-14 rounded-full border-2 hover:scale-110 cursor-pointer mr-2 text-xl font-semibold"
                                            }
                                            style={{
                                                background:
                                                    responses[
                                                        feedback.questions[currentStep]._id
                                                    ] >=
                                                    index + 1
                                                        ? feedbackFormColors[feedback.color].text
                                                        : "transparent",
                                                color:
                                                    responses[
                                                        feedback.questions[currentStep]._id
                                                    ] >=
                                                    index + 1
                                                        ? "white"
                                                        : feedbackFormColors[feedback.color].text,
                                                borderColor:
                                                    responses[
                                                        feedback.questions[currentStep]._id
                                                    ] >=
                                                    index + 1
                                                        ? feedbackFormColors[feedback.color].darkBg
                                                        : feedbackFormColors[feedback.color].text,
                                            }}
                                            onClick={() => {
                                                responses[feedback.questions[currentStep]._id] =
                                                    index + 1;
                                                setResponses({ ...responses });
                                            }}
                                        >
                                            {index + 1}
                                        </div>
                                    ))}
                            </div>
                        ) : feedback?.questions[currentStep]?.settings?.type === "text" ? (
                            <Input
                                onChange={(x) => {
                                    responses[feedback.questions[currentStep]._id] = x.target.value;
                                    setResponses({ ...responses });
                                }}
                                value={responses[feedback.questions[currentStep]._id]}
                            />
                        ) : feedback?.questions[currentStep]?.settings?.type === "longtext" ? (
                            <Textarea />
                        ) : feedback?.questions[currentStep]?.settings?.type ===
                          "multiplechoice" ? (
                            <div className="flex flex-col w-full">
                                <RadioGroup
                                    value={responses[feedback.questions[currentStep]._id]}
                                    onValueChange={(x) => {
                                        responses[feedback.questions[currentStep]._id] = x;
                                        setResponses({ ...responses });
                                    }}
                                >
                                    {feedback?.questions[currentStep]?.settings?.options.map(
                                        (option: any, index: number) => {
                                            return (
                                                <div
                                                    key={index}
                                                    className="flex items-center space-x-2"
                                                >
                                                    <RadioGroupItem
                                                        value={option}
                                                        id={"option" + index}
                                                    />
                                                    <Label
                                                        className="w-full text-2xl cursor-pointer"
                                                        htmlFor={"option" + index}
                                                    >
                                                        {option}
                                                    </Label>
                                                </div>
                                            );
                                        },
                                    )}
                                </RadioGroup>
                            </div>
                        ) : null}
                    </div>
                    <Button
                        onClick={() => {
                            if (currentStep === feedback.questions.length - 1) {
                                submitFeedback();
                                return;
                            }
                            if (currentStep < feedback.questions.length - 1) {
                                setCurrentStep(currentStep + 1);
                            }
                        }}
                    >
                        {currentStep === feedback.questions.length - 1 ? "Submit" : "Next"}
                    </Button>
                </div>
            )}
            {status.success ? (
                <div></div>
            ) : (
                <div className="flex w-full p-5">
                    <Button
                        className="mr-2"
                        size={"icon"}
                        onClick={() => {
                            if (currentStep > -1) {
                                setCurrentStep(currentStep - 1);
                            }
                        }}
                    >
                        <ChevronUp />
                    </Button>
                    <Button
                        size={"icon"}
                        onClick={() => {
                            if (currentStep < feedback.questions.length - 1) {
                                setCurrentStep(currentStep + 1);
                            }
                        }}
                    >
                        <ChevronDown />
                    </Button>
                </div>
            )}
            <Toaster />
        </div>
    );
}
