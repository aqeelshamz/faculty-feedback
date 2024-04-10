import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignInForm } from "@/components/signin-form";

import { RxRulerSquare } from "react-icons/rx";
import { Toaster } from "@/components/ui/sonner";

export default function SignIn() {
    return (
        <>
            <div className="container relative h-screen flex flex-col items-center justify-center sm:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                {/* <Link
                    href="/signup"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8",
                    )}
                >
                    Create an account
                </Link> */}
                {/* Changed the 'hidden' class to 'flex' to ensure the content is displayed on large screens */}
                <div className="relative hidden h-full flex-col bg-muted text-white lg:flex dark:border-r">
                    {/* For true black background: <div className="absolute inset-0 bg-black" /> */}
                    {/* Removed the Image component for small screens */}
                    <div className="absolute inset-0 lg:block">
                        <Image
                            src="/mountain.jpg"
                            alt="Image"
                            width="1920"
                            height="1080"
                            priority={true}
                            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <div className="relative z-20 flex items-center text-lg p-10 font-medium">
                        <RxRulerSquare className="mr-2" />
                        <p className="hidden lg:flex">Faculty Feedback System</p>
                    </div>
                    <div className="relative z-20 p-10 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-md">
                                &ldquo;This is the mark of perfection of character – to spend each
                                day as if it were your last, without frenzy, laziness, or any
                                pretending.&rdquo;
                            </p>
                            <footer className="text-sm">Marcus Aurelius</footer>
                        </blockquote>
                    </div>
                </div>
                {/* Added a flex container with justify-center and items-center to center the content on small screens */}
                <div className="flex justify-center items-center ">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Sign in to your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your credentials to login
                            </p>
                        </div>
                        <SignInForm />
                        {/* <p className="px-8 text-center text-sm text-muted-foreground">
							By clicking continue, you agree to our{" "}
							<Link href="/terms" className="underline underline-offset-4 hover:text-primary">
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link href="/privacy" className="underline underline-offset-4 hover:text-primary">
								Privacy Policy
							</Link>
							.
						</p> */}
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    );
}
