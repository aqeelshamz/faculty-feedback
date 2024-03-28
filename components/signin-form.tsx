"use client";

import { HTMLAttributes, useState } from "react";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store";
interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: UserAuthFormProps) {
    const email = useUserStore((state) => state.email);
    const password = useUserStore((state) => state.password);

    const signIn = useUserStore((state) => state.signIn);

    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        signIn(email, password);

        setTimeout(() => {
            setIsLoading(false);
        }, 3000);
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={onSubmit}>
                <div className="grid gap-2">
                    <div className="grid gap-2">
                        <Label className="sr-only" htmlFor="email">
                            Email
                        </Label>
                        <Input
                            value={email}
                            onChange={(e) => useUserStore.setState({ email: e.target.value })}
                            id="email"
                            placeholder="Email"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="grid gap-2 relative">
                        <Label className="sr-only" htmlFor="password">
                            Password
                        </Label>
                        <Input
                            value={password}
                            onChange={(e) => useUserStore.setState({ password: e.target.value })}
                            id="password"
                            name="password"
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            autoCapitalize="none"
                            autoComplete="none"
                            autoCorrect="off"
                            disabled={isLoading}
                            required
                        />
                        <div
                            className="absolute inset-y-0 right-4 flex items-center cursor-pointer"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <RxEyeOpen size={20} /> : <RxEyeClosed size={20} />}
                        </div>
                    </div>
                    <Button disabled={isLoading} className={cn("bg-black hover:bg-black/90")}>
                        {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
                        Login
                    </Button>
                </div>
            </form>
            {/* <div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">Or continue with</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.gitHub className="mr-2 h-4 w-4" />
				)}{" "}
				GitHub
			</Button> */}
        </div>
    );
}
