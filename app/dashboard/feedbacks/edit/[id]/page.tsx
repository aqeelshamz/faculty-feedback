"use client";

import { useState, useEffect, SetStateAction } from "react";
import { CirclePicker } from "react-color";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sparkles, Pen, Plus, Eye } from "lucide-react";

import { Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { cn, feedbackFormColors, serverURL } from "@/lib/utils";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export default function EditFeedback() {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState<any>("");
    const [courseId, setCourseId] = useState("");
    const [questions, setQuestions] = useState<any>([]);
    const [courses, setCourses] = useState<any>([]);
    const [prompt, setPrompt] = useState("");

    const [isActive, setIsActive] = useState<boolean>(false);

    console.log(questions);

    const getFeedback = async (id: any) => {
        const colorData: any = {
            black: "#000000",
            red: "#eb4034",
            yellow: "#ebc334",
            green: "#68eb34",
            blue: "#3262e6",
        };

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
                const data = response.data?.data;
                setTitle(data?.title);
                setDescription(data?.description);
                setCourseId(data?.courseId);
                setColor(colorData[data?.color]);
                var questions = [];
                for (const question of data?.questions) {
                    questions.push({
                        question: question.question,
                        settings: question.settings,
                    });
                }
                setQuestions([...questions]);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateFeedback = async () => {
        const colorData: any = {
            "#000000": "black",
            "#eb4034": "red",
            "#ebc334": "yellow",
            "#68eb34": "green",
            "#3262e6": "blue",
        };

        const config = {
            method: "PUT",
            url: `${serverURL}/feedback/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                title,
                description,
                color: colorData[color],
                questions,
                courseId,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                getFeedback(id);
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

    const generateQuestions = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/feedback/generate-questions-using-ai`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                feedbackId: id,
                prompt,
                maxQuestions: 3,
            },
        };

        axios(config)
            .then((response) => {
                setQuestions([...questions, ...response.data.data]);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });

        await updateFeedback();
    };

    useEffect(() => {
        getFeedback(id);
        getCourses();
    }, [id]);

    const handleColorChange = (newColor: { hex: SetStateAction<string> }) => {
        setColor(newColor.hex);
    };

    return (
        <div className={"p-4 w-full space-y-8 overflow-y-auto mb-48"}>
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-col justify-between space-y-4">
                    <div className="flex justify-between">
                        <div className="flex flex-col justify-between space-y-4">
                            <div className="flex item-center gap-2">
                                <Select onValueChange={setCourseId} value={courseId}>
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Course" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Course</SelectLabel>
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

                                <CirclePicker
                                    onChange={handleColorChange}
                                    className="mt-1"
                                    circleSize={28}
                                    color={color}
                                    colors={[
                                        feedbackFormColors["black"]["darkBg"],
                                        feedbackFormColors["red"]["darkBg"],
                                        feedbackFormColors["yellow"]["darkBg"],
                                        feedbackFormColors["green"]["darkBg"],
                                        feedbackFormColors["blue"]["darkBg"],
                                    ]}
                                />
                            </div>
                        </div>
                        <Button variant={"outline"} className=" ml-2" onClick={() => { }}>
                            <Eye />
                        </Button>
                        <Button className="w-44 ml-2" onClick={updateFeedback}>
                            Save
                        </Button>
                    </div>
                    <Input
                        className="text-2xl font-semibold max-w-screen-lg h-15"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <Textarea
                        placeholder="Description"
                        className="max-w-screen-lg text-lg font-medium"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
            </div>
            {questions?.map((question: any, index: number) => {
                return (
                    <Card key={index} className="max-w-screen-lg my-2 py-6 ">
                        <CardContent>
                            <div className="flex flex-col space-y-4">
                                <div className="flex flex-row space-x-4 justify-between">
                                    {question.settings?.type === "text" ? (
                                        <div className="flex items-center space-x-2 w-full">
                                            <p className="text-lg">{index + 1 + "."}</p>
                                            <Textarea
                                                placeholder="Question"
                                                value={question.question}
                                                onChange={(x) => {
                                                    question.question = x.target.value;
                                                    setQuestions([...questions]);
                                                }}
                                            />
                                        </div>
                                    ) : question.settings?.type === "longtext" ? (
                                        <div className="flex w-full flex-col space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-lg">{index + 1 + "."}</p>
                                                <Textarea
                                                    placeholder="Question"
                                                    value={question.question}
                                                    onChange={(x) => {
                                                        question.question = x.target.value;
                                                        setQuestions([...questions]);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : question.settings?.type === "multiplechoice" ? (
                                        <div className="flex flex-col w-full space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-lg">{index + 1 + "."}</p>
                                                <Textarea
                                                    className="w-[90%]"
                                                    placeholder="Question"
                                                    value={question.question}
                                                    onChange={(x) => {
                                                        question.question = x.target.value;
                                                        setQuestions([...questions]);
                                                    }}
                                                />
                                            </div>
                                            <div className="space-y-2 ml-5">
                                                {question.options?.map(
                                                    (option: any, index: number) => (
                                                        <div
                                                            key={index}
                                                            className="flex space-y-2 items-center space-x-2"
                                                        >
                                                            <Label>
                                                                {String.fromCharCode(65 + index) +
                                                                    "."}
                                                            </Label>
                                                            <Input
                                                                placeholder={`Option ${index + 1}`}
                                                                size={100}
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    ) : question.settings?.type === "rating" ? (
                                        <div className="flex flex-col w-full space-y-4">
                                            <div className="flex items-center space-x-2">
                                                <p className="text-lg">{index + 1 + "."}</p>
                                                <Textarea
                                                    placeholder="Question"
                                                    value={question.question}
                                                    onChange={(x) => {
                                                        question.question = x.target.value;
                                                        setQuestions([...questions]);
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    ) : (
                                        ""
                                    )}

                                    <div className="">
                                        <div className="flex flex-row space-x-4">
                                            <Select
                                                onValueChange={(x) => {
                                                    question.settings.type = x;
                                                    setQuestions([...questions]);
                                                }}
                                                value={question.settings.type}
                                            >
                                                <SelectTrigger className="w-[180px]">
                                                    <SelectValue placeholder="Course" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectLabel>Question Type</SelectLabel>
                                                        <SelectItem key={index} value={"text"}>
                                                            Text
                                                        </SelectItem>
                                                        <SelectItem key={index} value={"longtext"}>
                                                            Long Text
                                                        </SelectItem>
                                                        <SelectItem
                                                            key={index}
                                                            value={"multiplechoice"}
                                                        >
                                                            Multiple Choice
                                                        </SelectItem>
                                                        <SelectItem key={index} value={"rating"}>
                                                            Rating
                                                        </SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                            <Button
                                                variant={"destructive"}
                                                onClick={() => {
                                                    setQuestions(
                                                        questions.filter(
                                                            (_: any, i: any) => i !== index,
                                                        ),
                                                    );
                                                }}
                                            >
                                                <Trash2 />
                                            </Button>
                                        </div>
                                        <div className="flex flex-row justify-center space-x-2 mt-5 mx-auto">
                                            <p>Required</p>
                                            <Switch
                                                checked={question.settings.required}
                                                onCheckedChange={(x) => {
                                                    question.settings.required = x;
                                                    setQuestions([...questions]);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="ml-10"></CardFooter>
                    </Card>
                );
            })}
            <div className="flex flex-row justify-between item-center max-w-5xl gap-6">
                <Button
                    className="max-w-screen-lg w-full flex h-17"
                    onClick={() =>
                        setQuestions([
                            ...questions,
                            {
                                question: "",
                                settings: {
                                    type: "text",
                                    required: false,
                                    options: [],
                                },
                            },
                        ])
                    }
                >
                    <Plus className="mr-2" size={20} />
                    New question
                </Button>
                <Dialog>
                    <DialogTrigger className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 max-w-screen-lg w-full item-center bg-gradient-to-r from-indigo-700 to-purple-600 text-white shadow-none focus:ring-4 focus:ring-blue-300 px-7 py-3 focus:outline-none dark:focus:ring-blue-800">
                        <Sparkles className="mr-2" size={20} />
                        Generate Questions
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Generate Questions with AI</DialogTitle>
                            <DialogDescription>
                                Write your prompt to generate questions.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <Textarea
                                id="prompt"
                                className="col-span-3"
                                value={prompt}
                                placeholder="Write AI prompt"
                                onChange={(e) => setPrompt(e.target.value)}
                            />
                        </div>
                        <DialogFooter>
                            <div className="flex justify-end w-full">
                                <DialogClose asChild>
                                    <Button type="submit" onClick={generateQuestions}>
                                        <Sparkles className="mr-2" size={20} />
                                        Generate
                                    </Button>
                                </DialogClose>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            <Toaster />
        </div>
    );
}
