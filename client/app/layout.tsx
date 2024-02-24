import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
			<body className={inter.className}>{children}</body>
		</html>
	);
}
