import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { SignUpForm } from "@/components/signup-form";

import { RxRulerSquare } from "react-icons/rx";

export default function SignUp() {
    return (
        <>
            <div className="md:hidden">
                <Image
                    src="/examples/authentication-light.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="block dark:hidden"
                />
                <Image
                    src="/examples/authentication-dark.png"
                    width={1280}
                    height={843}
                    alt="Authentication"
                    className="hidden dark:block"
                />
            </div>
            <div className="container relative hidden h-screen flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/signin"
                    className={cn(
                        buttonVariants({ variant: "ghost" }),
                        "absolute right-4 top-4 md:right-8 md:top-8",
                    )}
                >
                    Login
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    {/* For true black background: <div className="absolute inset-0 bg-black" /> */}
                    <div className="absolute inset-0 lg:block">
                        <Image
                            src="/mountain.jpg"
                            alt="Image"
                            width="1920"
                            height="1080"
                            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                        />
                    </div>
                    <div className="relative z-20 flex items-center text-lg font-medium">
                        <RxRulerSquare className="mr-2" />
                        <p className="hidden lg:flex">Faculty Feedback System</p>
                    </div>
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2">
                            <p className="text-md">
                                &ldquo;Very little is needed to make a happy life; it is all within
                                yourself, in your way of thinking.&rdquo;
                            </p>
                            <footer className="text-sm">Marcus Aurelius</footer>
                        </blockquote>
                    </div>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Create your account
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your details below to create an account
                            </p>
                        </div>
                        <SignUpForm />
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
        </>
    );
}
