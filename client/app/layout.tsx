import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";

import { cn } from "@/lib/utils";

export const fontSans = FontSans({
	subsets: ["latin"],
	variable: "--font-sans",
});

export const metadata: Metadata = {
	title: "Faculty Feedback System",
	description: "Enables faculties to accept feedback from students",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<head>
				<link rel="icon" type="image/x-icon" href="/teacher-student.png" sizes="any" />
			</head>
			<body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>{children}</body>
		</html>
	);
}
