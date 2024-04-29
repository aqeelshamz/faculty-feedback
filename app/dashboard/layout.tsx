"use client";

import { Bell, CircleUser, GraduationCap, Home, Menu, User, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RxRulerSquare } from "react-icons/rx";
import { AdminNav } from "../components/AdminNav";
import { StudentNav } from "../components/StudentNav";
import { FacultyNav } from "../components/FacultyNav";
import NotificationCard from "@/components/notification-card";
import { useUserStore } from "@/store";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";
import { serverURL } from "@/lib/utils";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function DashboardLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const router = useRouter();

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const { name, email, role, setData } = useUserStore((state) => ({
        name: state.name,
        email: state.email,
        role: state.role,
        setData: state.setData,
    }));

    const logOut = async () => {
        setData("", "");
        localStorage.clear();
        router.push("/signin");
    };

    const updatePassword = async () => {
        const config = {
            method: "PATCH",
            url: `${serverURL}/user/updatepassword`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
                "Content-Type": "application/json",
            },
            data: {
                email: email,
                oldPassword: oldPassword,
                newPassword: newPassword,
            },
        };

        axios(config)
            .then((response) => {
                toast.success(response.data.message);
                setOldPassword("");
                setNewPassword("");
            })
            .catch((err) => {
                toast.error(err.response?.data?.message);
            });
    };

    const getUser = async () => {};

    useEffect(() => {}, [role]);

    return (
        <>
            <div className="grid min-h-screen overflow-hidden w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
                <div className="hidden border-r bg-muted/40 md:block">
                    <div className="flex h-full max-h-screen flex-col gap-2">
                        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                            <div className="flex items-center gap-2 font-extrabold text-xl">
                                <RxRulerSquare className="mr-2" />
                                <p className="hidden lg:flex">Dashboard</p>
                            </div>
                            {/* <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                                    <Bell className="h-4 w-4" />
                                    <span className="sr-only">Toggle notifications</span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <NotificationCard />
                            </DropdownMenuContent>
                        </DropdownMenu> */}
                        </div>
                        <div className="flex-1">
                            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                                {role == "admin" ? (
                                    <AdminNav />
                                ) : role == "faculty" ? (
                                    <FacultyNav />
                                ) : role == "student" ? (
                                    <StudentNav />
                                ) : (
                                    <></>
                                )}
                            </nav>
                        </div>
                        {/* <div className="mt-auto p-4">
                        <Card>
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access to our support
                                    team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div> */}
                    </div>
                </div>
                <div className="flex flex-col">
                    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="shrink-0 md:hidden"
                                >
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle navigation menu</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="flex flex-col">
                                <nav className="grid gap-2 text-lg font-medium">
                                    {role == "admin" ? (
                                        <AdminNav />
                                    ) : role == "faculty" ? (
                                        <FacultyNav />
                                    ) : role == "student" ? (
                                        <StudentNav />
                                    ) : (
                                        <></>
                                    )}
                                </nav>
                                {/* <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upgrade to Pro</CardTitle>
                                        <CardDescription>
                                            Unlock all features and get unlimited access to our
                                            support team.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full">
                                            Upgrade
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div> */}
                            </SheetContent>
                        </Sheet>
                        <div className="w-full flex-1">
                            {/* <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form> */}
                        </div>
                        <Dialog>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button
                                        variant="secondary"
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <CircleUser className="h-5 w-5" />
                                        <span className="sr-only">Toggle user menu</span>
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuLabel>
                                        <span className="text-bold text-lg">{name}</span>
                                        <br />
                                        <span className="text-normal opacity-60">{email}</span>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DialogTrigger asChild>
                                        <DropdownMenuItem>Reset Password</DropdownMenuItem>
                                    </DialogTrigger>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem onClick={logOut}>Log out</DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                            <DialogContent className="sm:max-w-[500px]">
                                <DialogHeader>
                                    <DialogTitle>Reset Password</DialogTitle>
                                    <DialogDescription>
                                        Change your password. Click reset when you&apos;re done.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="oldPassword" className="text-right">
                                            Old Password
                                        </Label>
                                        <Input
                                            id="oldPassword"
                                            type="text"
                                            className="col-span-3"
                                            value={oldPassword}
                                            onChange={(e) => setOldPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="newPassword" className="text-right">
                                            New Password
                                        </Label>
                                        <Input
                                            id="newPassword"
                                            type="text"
                                            className="col-span-3"
                                            value={newPassword}
                                            onChange={(e) => setNewPassword(e.target.value)}
                                        />
                                    </div>
                                </div>
                                <DialogFooter>
                                    <DialogClose asChild>
                                        <Button type="submit" onClick={updatePassword}>
                                            Reset Password
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </header>
                    <main className="flex">{children}</main>
                </div>
            </div>
            <Toaster />
        </>
    );
}
