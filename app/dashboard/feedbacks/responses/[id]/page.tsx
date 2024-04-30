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

const feedbacks = [
    {
        Majid: {
            "how much do you rate the teacher knowledge": 5,
            "what do you think of teacher experience": "Excellent",
            "how much students are do you think is focused on class": "less than 20",
            "how much students are open to talk": "less than 20",
            "how much students are willing to comeforward": "less than 20",
        },
    },
    {
        Aqeel: {
            "how much do you rate the teacher knowledge": 5,
            "what do you think of teacher experience": "Excellent",
            "how much students are do you think is focused on class": "less than 20",
            "how much students are open to talk": "less than 20",
            "how much students are willing to comeforward": "less than 20",
        },
    },
    {
        Anurag: {
            "how much do you rate the teacher knowledge": 5,
            "what do you think of teacher experience": "Excellent",
            "how much students are do you think is focused on class": "less than 20",
            "how much students are open to talk": "less than 20",
            "how much students are willing to comeforward": "less than 20",
        },
    },
    {
        Sainath: {
            "how much do you rate the teacher knowledge": 5,
            "what do you think of teacher experience": "Excellent",
            "how much students are do you think is focused on class": "less than 20",
            "how much students are open to talk": "less than 20",
            "how much students are willing to comeforward": "less than 20",
        },
    },
];

function TableStudentResponses() {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell>Student Name</TableCell>
                    {/* loop over the firt student all questionns  */}
                    {Object.values(feedbacks[0])[0] &&
                        Object.keys(Object.values(feedbacks[0])[0]).map((question) => (
                            <TableCell key={question}>{question}</TableCell>
                        ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {feedbacks.map((feedback) => {
                    const response = Object.values(feedback)[0];
                    return (
                        <TableRow key={Object.keys(feedback)[0]}>
                            <TableCell>{Object.keys(feedback)[0]}</TableCell>
                            {Object.keys(response).map((question) => (
                                <TableCell key={question}>{response[question]}</TableCell>
                            ))}
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
}

export default function FeedbackResponses() {
    return (
        <>
            <Card className="w-full">
                <CardHeader>
                    <CardTitle>Feedback responses</CardTitle>
                </CardHeader>
                <CardContent>
                    <TableStudentResponses />
                </CardContent>
            </Card>
        </>
    );
}
