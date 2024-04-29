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
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Sparkles, Pen, Plus } from "lucide-react";

import { Trash2 } from "lucide-react";
import { useParams } from "next/navigation";
import { cn, serverURL } from "@/lib/utils";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

// create interface question where it should have questionType and question as string
type LongTextQuestion = {
    questionType: "longtext";
    question: string;
};

type TextQuestion = {
    questionType: "text";
    question: string;
};

type MCQQuestion = {
    questionType: "mcq";
    question: string;
    options: { option: string }[];
};

type RatingQuestion = {
    questionType: "rating";
    question: string;
    rating: number;
};

type Question = LongTextQuestion | MCQQuestion | RatingQuestion | TextQuestion;

const initialQuestion: Question = {
    questionType: "mcq",
    question: "",
    options: [{ option: "" }, { option: "" }, { option: "" }, { option: "" }],
};

export default function EditFeedback() {
    const { id } = useParams();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [color, setColor] = useState("#EC7777");
    const [course, setCourse] = useState("");
    const [questions, setQuestions] = useState<Question[]>([initialQuestion]);
    const [courses, setCourses] = useState<any>([]);
    const [prompt, setPrompt] = useState("");

    const [isActive, setIsActive] = useState<boolean>(false);

    const getFeedback = async (id: any) => {
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
                setTitle(response?.data?.title);
                setDescription(response?.data?.description);
                setCourse(response?.data?.courseCode);
                setColor(response?.data?.color);
                setQuestions(response?.data?.questions);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const updateFeedback = async (id: any) => {
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
                course,
                color,
                questions,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setTitle("");
                setDescription("");
                setCourse("");
                setColor("");
                setQuestions([]);
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
                setCourses([]);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const generateQuestions = async (id: any) => {
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
                console.log(response);
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getFeedback(id);
        getCourses();
    }, [id]);

    const handleColorChange = (newColor: { hex: SetStateAction<string> }) => {
        setColor(newColor.hex);
    };

    // function handleInputChange(index: number, event: React.ChangeEvent<HTMLInputElement>) {
    //     const { value } = event.target;
    //     setQuestions((prevQuestions: Question[]) => {
    //         const newQuestions = [...prevQuestions];
    //         const currentQuestion = newQuestions[index];
    //         currentQuestion.question = value;
    //         return newQuestions;
    //     });
    // }

    function SelectQuestionType({ index }: { index: number }) {
        const questionTypes = ["Text", "Multiple Choice", "Rating", "Long Text"];

        const handleOnValueChange = (questionType: string) => {
            if (questionType === "mcq") {
                setQuestions((prevQuestions: Question[]) => {
                    const newQuestions = [...prevQuestions];
                    newQuestions[index] = {
                        questionType: "mcq",
                        question: "",
                        options: [{ option: "" }, { option: "" }, { option: "" }, { option: "" }],
                    };
                    return newQuestions;
                });
            } else if (questionType === "rating") {
                setQuestions((prevQuestions: Question[]) => {
                    const newQuestions = [...prevQuestions];
                    newQuestions[index] = { questionType: "rating", question: "", rating: 0 };
                    return newQuestions;
                });
            } else if (questionType === "longtext") {
                setQuestions((prevQuestions: Question[]) => {
                    const newQuestions = [...prevQuestions];
                    newQuestions[index] = { questionType: "longtext", question: "" };
                    return newQuestions;
                });
            } else {
                setQuestions((prevQuestions: Question[]) => {
                    const newQuestions = [...prevQuestions];
                    newQuestions[index] = { questionType: "text", question: "" };
                    return newQuestions;
                });
            }
        };

        return (
            <Select onValueChange={handleOnValueChange} value={questions[index].questionType}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectLabel>Select an option</SelectLabel>
                        {questionTypes?.map((qstnType, index) => (
                            <SelectItem
                                key={index}
                                value={
                                    qstnType === "Multiple Choice"
                                        ? "mcq"
                                        : qstnType === "Rating"
                                          ? "rating"
                                          : qstnType === "Long Text"
                                            ? "longtext"
                                            : "text"
                                }
                            >
                                {qstnType}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        );
    }

    function TextQuestionTemplate({ questionNumber }: { questionNumber: number }) {
        return (
            <div className="flex w-full flex-col space-y-4">
                <div className="flex items-center space-x-2">
                    <p className="text-lg">{questionNumber + "."}</p>
                    <Textarea placeholder="Question" className="w-full" />
                </div>
            </div>
        );
    }

    function RatingQuestionTemplate({ questionNumber }: { questionNumber: number }) {
        return (
            <div className="flex flex-col w-full space-y-4">
                <div className="flex items-center space-x-2">
                    <p className="text-lg">{questionNumber + "."}</p>
                    <Textarea placeholder="Question" className="w-full" />
                </div>
                <div className="space-y-4 py-4">
                    <Slider defaultValue={[0]} max={5} step={1} />
                </div>
            </div>
        );
    }

    function LongTextQuestionTemplate({ questionNumber }: { questionNumber: number }) {
        return (
            <div className="flex flex-col  w-full space-y-4">
                <div className="flex items-center space-x-2">
                    <p className="text-lg">{questionNumber + "."}</p>
                    <Textarea placeholder="Question" className="w-full" />
                </div>
            </div>
        );
    }

    function MultipleChoiceQuestionTemplate({
        questionNumber,
        options,
    }: {
        questionNumber: number;
        options: string[];
    }) {
        return (
            <div className="flex flex-col w-full space-y-4">
                <div className="flex items-center space-x-2">
                    <p className="text-lg">{questionNumber + "."}</p>

                    <Textarea placeholder="Question" className="w-[90%]" />
                </div>
                <div className="space-y-2 ml-5">
                    {options?.map((_, index) => (
                        <div key={index} className="flex space-y-2 items-center space-x-2">
                            <Label>{String.fromCharCode(65 + index) + "."}</Label>
                            <Input placeholder={`Option ${index + 1}`} size={100} />
                            <Button
                                size={"sm"}
                                variant={"ghost"}
                                onClick={() => {
                                    const newOptions = options.filter((_, i) => i !== index);
                                    setQuestions((prevQuestions: Question[]) => {
                                        const newQuestions = [...prevQuestions];
                                        const currentQuestion = newQuestions[questionNumber - 1];
                                        if (currentQuestion.questionType === "mcq") {
                                            currentQuestion.options = newOptions?.map((option) => ({
                                                option,
                                            }));
                                        }
                                        return newQuestions;
                                    });
                                }}
                            >
                                <Trash2 size={16} />
                            </Button>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 w-full space-y-8 overflow-y-auto mb-48">
            <div className="flex flex-col gap-y-3">
                <div className="flex flex-col justify-between space-y-4">
                    <div className="flex justify-between">
                        <Input
                            className="text-2xl font-medium max-w-screen-lg h-15"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />

                        <Button className="w-44 ml-2" onClick={() => updateFeedback(id)}>
                            Save
                        </Button>
                    </div>

                    <Textarea
                        placeholder="Description"
                        className="max-w-screen-lg"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <div className="flex flex-col justify-between space-y-4">
                        <div className="flex item-center gap-2">
                            <Select onValueChange={setCourse} value={course}>
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
                                    "#EC7777",
                                    "#AAEC77",
                                    "#77ECC2",
                                    "#779FEC",
                                    "#EC77BD",
                                    "#ECA177",
                                ]}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row  w-[20%] gap-2">
                {/* <Button onClick={() => setQuestions([...questions, initialQuestion])}>
                    <Plus className="mr-2 flex" size={20} />
                    New question
                </Button> */}
                <Button onClick={() => {}}>
                    <Sparkles className="mr-2 flex" size={20} />
                    Use AI to Generate Questions
                </Button>
            </div>

            {questions?.map((question, index) => {
                if (question.questionType === "mcq") {
                    return (
                        <Card key={index} className="max-w-screen-lg my-2 py-6 ">
                            <CardContent>
                                <div className="flex flex-row space-x-4 justify-between">
                                    <MultipleChoiceQuestionTemplate
                                        questionNumber={index + 1}
                                        options={question.options?.map((option) => option.option)}
                                    />
                                    <div className="flex flex-row space-x-4">
                                        <SelectQuestionType index={index} />
                                        <Button size={"default"} variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="ml-10">
                                <Button
                                    className="lg:w-[70%] md:w-[60%] w-[80%]"
                                    onClick={() => {
                                        const newOptions = [...question.options, { option: "" }];
                                        setQuestions((prevQuestions: Question[]) => {
                                            const newQuestions = [...prevQuestions];
                                            const currentQuestion = newQuestions[index];
                                            if (currentQuestion.questionType === "mcq") {
                                                currentQuestion.options = newOptions;
                                            }
                                            return newQuestions;
                                        });
                                    }}
                                >
                                    <Plus className="mr-2" size={20} />
                                    Add Option
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                } else if (question.questionType === "rating") {
                    return (
                        <Card key={index} className="max-w-screen-lg my-2 pt-6 ">
                            <CardContent>
                                <div className="flex flex-row space-x-4 justify-between">
                                    <RatingQuestionTemplate questionNumber={index + 1} />
                                    <div className="flex flex-row space-x-4">
                                        <SelectQuestionType index={index} />
                                        <Button size={"default"} variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                } else if (question.questionType === "longtext") {
                    return (
                        <Card key={index} className="max-w-screen-lg my-2 pt-6 ">
                            <CardContent>
                                <div className="flex flex-row space-x-4 justify-between">
                                    <LongTextQuestionTemplate questionNumber={index + 1} />
                                    <div className="flex flex-row space-x-4">
                                        <SelectQuestionType index={index} />
                                        <Button size={"default"} variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                } else {
                    return (
                        <Card key={index} className="max-w-screen-lg my-2 pt-6 ">
                            <CardContent>
                                <div className="flex flex-row space-x-4 justify-between">
                                    <TextQuestionTemplate questionNumber={index + 1} />
                                    <div className="flex flex-row space-x-4">
                                        <SelectQuestionType index={index} />
                                        <Button size={"default"} variant={"destructive"}>
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    );
                }
            })}

            <Button
                className="max-w-screen-lg w-full"
                onClick={() => setQuestions([...questions, initialQuestion])}
            >
                <Plus className="mr-2" size={20} />
                New question
            </Button>

            <Toaster />
        </div>
    );
}
