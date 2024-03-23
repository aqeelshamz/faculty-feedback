import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { FiBell, FiFileText, FiFolderMinus } from "react-icons/fi";

export default function Dashboard({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <main>
            <div className="border-b">
                <div className="flex h-16 justify-between items-center px-4">
                    <Link href="/"><div className="w-full max-w-xs relative z-20 flex items-center text-lg font-medium">
                        <FiFileText className="mr-2" />
                        <p className="hidden lg:flex">Faculty Feedback System</p>
                    </div>
                    </Link>
                    <nav
                        className={cn("flex items-center space-x-4 lg:space-x-6")}
                    >
                        <Link
                            href="/dashboard"
                            className="text-sm font-medium transition-colors hover:text-primary"
                        >
                            Overview
                        </Link>
                        <Link
                            href="/dashboard/batches"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Batches
                        </Link>
                        <Link
                            href="/dashboard/students"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Students
                        </Link>
                        <Link
                            href="/dashboard/faculty"
                            className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                        >
                            Faculty
                        </Link>
                    </nav>
                    <div className="w-full max-w-xs flex justify-end items-center space-x-4">
                        <Button variant="ghost" size="icon">
                            <FiBell className="h-4 w-4" />
                        </Button>
                        <Avatar>
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>A</AvatarFallback>
                        </Avatar>
                    </div>
                </div>
            </div>
            {children}
        </main>
    );
}
