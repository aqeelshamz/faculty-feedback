"use client";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { useUserStore } from "@/store";
import { programs, faculties, students } from "@/lib/data";
import {
    BookOpen,
    Building,
    Calendar,
    GraduationCap,
    Group,
    StickyNote,
    User,
    Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { serverURL } from "@/lib/utils";
import axios from "axios";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AdminDashboard() {
    const router = useRouter();
    const role = useUserStore((state) => state.role);
    const [isCollege, setIsCollege] = useState(true);

    //New College
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [vision, setVision] = useState("");
    const [mission, setMission] = useState("");

    const [allCounts, setAllCounts] = useState({
        departmentCount: 0,
        batchCount: 0,
        programCount: 0,
        feedbackCount: 0,
        courseCount: 0,
        studentCount: 0,
        semesterCount: 0,
        facultyCount: 0,
    });

    const getAllCounts = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/college/get-all-count`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
        };

        axios(config)
            .then((response) => {
                setAllCounts(response?.data?.data);
            })
            .catch((err) => {
                if (err.response?.status == 404) setIsCollege(false);
                toast.error(err.response?.data?.message);
            });
    };

    const createCollege = async () => {
        const config = {
            method: "POST",
            url: `${serverURL}/college/`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                name,
                address,
                phone,
                email,
                vision,
                mission,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setName("");
                setAddress("");
                setPhone("");
                setEmail("");
                setVision("");
                setMission("");
                getAllCounts();
                window.location.reload();
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    useEffect(() => {
        getAllCounts();
    }, []);

    return isCollege ? (
        <div className="w-full h-full p-7">
            <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                <Card
                    onClick={() => router.push("/dashboard/feedbacks")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Feedbacks</CardTitle>
                        <StickyNote className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{allCounts?.feedbackCount}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/programs")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Programs</CardTitle>
                        <GraduationCap className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{allCounts?.programCount}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/courses")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Courses</CardTitle>
                        <BookOpen className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{allCounts?.courseCount}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/departments")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Departments</CardTitle>
                        <Building className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{allCounts?.departmentCount}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/batches")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Batches</CardTitle>
                        <Group className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{allCounts?.batchCount}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/semesters")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Semesters</CardTitle>
                        <Calendar className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{allCounts?.semesterCount}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/faculty")}
                    className="cursor-pointer hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Faculty</CardTitle>
                        <User className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{allCounts?.facultyCount}</p>
                    </CardContent>
                </Card>
                <Card
                    onClick={() => router.push("/dashboard/students")}
                    className="cursor-pointer    hover:shadow-md duration-75 w-full max-w-xs mr-4"
                >
                    <div className="p-4 flex justify-between">
                        <CardTitle className="flex">Students</CardTitle>
                        <Users className="h-6 w-6" />
                    </div>
                    <CardContent>
                        <p className="text-4xl font-bold">{allCounts?.studentCount}</p>
                    </CardContent>
                </Card>
            </div>
        </div>
    ) : (
        <div className="m-10">
            <div className="grid gap-4">
                <h1 className="font-bold text-2xl">
                    You don&apos;t have a college. Create one to continue.
                </h1>
                <div className="grid grid-cols-4 gap-4">
                    <Label htmlFor="name" className="text-right">
                        Name
                    </Label>
                    <Input
                        className="col-span-3"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Label htmlFor="address" className="text-right">
                        Address
                    </Label>
                    <Textarea
                        className="col-span-3"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Label htmlFor="phone" className="text-right">
                        Phone
                    </Label>
                    <Input
                        className="col-span-3"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Label htmlFor="email" className="text-right">
                        Email
                    </Label>
                    <Input
                        className="col-span-3"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Label htmlFor="vision" className="text-right">
                        Vision
                    </Label>
                    <Input
                        className="col-span-3"
                        type="text"
                        value={vision}
                        onChange={(e) => setVision(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Label htmlFor="mission" className="text-right">
                        Mission
                    </Label>
                    <Input
                        className="col-span-3"
                        type="text"
                        value={mission}
                        onChange={(e) => setMission(e.target.value)}
                    />
                </div>
                <div className="grid grid-cols-4 gap-4">
                    <Button type="submit" onClick={createCollege} className="w-fit">
                        Create College
                    </Button>
                </div>
            </div>
        </div>
    );
}
