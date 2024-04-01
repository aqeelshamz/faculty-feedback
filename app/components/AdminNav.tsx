import {
    GraduationCap,
    User,
    Users,
    LayoutGrid,
    BookOpen,
    Building,
    Calendar,
    MessageSquare,
    Group,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminNav = () => {
    const pathname = usePathname();
    return (
        <>
            <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <LayoutGrid className="h-4 w-4" />
                Overview
            </Link>
            <Link
                href="/dashboard/programs"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/programs" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <GraduationCap className="h-4 w-4" />
                Programs
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useProgramStore((state) => state.programs).length}
                                </Badge> */}
            </Link>
            <Link
                href="/dashboard/courses"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/courses" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <BookOpen className="h-4 w-4" />
                Courses
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useStudentStore((state) => state.students).length}
                                </Badge> */}
            </Link>
            <Link
                href="/dashboard/departments"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/departments" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <Building className="h-4 w-4" />
                Departments
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useStudentStore((state) => state.students).length}
                                </Badge> */}
            </Link>
            <Link
                href="/dashboard/batches"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/batches" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <Group className="h-4 w-4" />
                Batches
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useStudentStore((state) => state.students).length}
                                </Badge> */}
            </Link>
            <Link
                href="/dashboard/semesters"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/semesters" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <Calendar className="h-4 w-4" />
                Semesters
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useStudentStore((state) => state.students).length}
                                </Badge> */}
            </Link>
            <Link
                href="/dashboard/faculty"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/faculty" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <User className="h-4 w-4" />
                Faculty
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useFacultyStore((state) => state.faculties).length}
                                </Badge> */}
            </Link>
            <Link
                href="/dashboard/students"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/students" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <Users className="h-4 w-4" />
                Students
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useStudentStore((state) => state.students).length}
                                </Badge> */}
            </Link>
            <Link
                href="/dashboard/feedbacks"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/feedbacks" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <MessageSquare className="h-4 w-4" />
                Feedbacks
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useStudentStore((state) => state.students).length}
                                </Badge> */}
            </Link>
        </>
    );
};
