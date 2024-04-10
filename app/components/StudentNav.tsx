import { GraduationCap, User, Users, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const StudentNav = () => {
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
                href="/dashboard/feedbacks"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${pathname === "/dashboard/programs" ? "bg-muted text-primary" : "text-muted-foreground"}`}
            >
                <GraduationCap className="h-4 w-4" />
                Feedbacks
                {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    {useProgramStore((state) => state.programs).length}
                                </Badge> */}
            </Link>
        </>
    );
};
