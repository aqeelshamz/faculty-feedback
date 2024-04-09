import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Metadata } from "next";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});

// const CalSans = localFont({ src: "../font/webfonts/CalSans.ttf", variable: "--cal-sans" });

export const metadata: Metadata = {
    title: "Faculty Feedback System",
    description:
        "Enables faculties to collect feedbacks from students and analyze them effectively.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <head>
                <link rel="icon" type="image/x-icon" href="/RxRulerSquare.svg" sizes="any" />
            </head>
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased",
                    fontSans.variable,
                )}
            >
                {children}
            </body>
        </html>
    );
}
