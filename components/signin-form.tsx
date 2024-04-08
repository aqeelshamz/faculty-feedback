"use client";

import { HTMLAttributes, useState, SyntheticEvent } from "react";
import { RxEyeOpen, RxEyeClosed } from "react-icons/rx";

import { cn, serverURL } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store";
import axios from "axios";
import { toast } from "sonner";
import { produce } from "immer";
import { useRouter } from "next/navigation";
interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export function SignInForm({ className, ...props }: UserAuthFormProps) {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const { role, setRole } = useUserStore((state) => ({
        role: state.role,
        setRole: state.setRole,
    }));

    const signIn = async (email: string, password: string) => {
        try {
            const response = await axios.post(`${serverURL}/users/login`, { email, password });
            setRole(response.data.user.role);
            localStorage.setItem("token", response.data.token);
            router.push("/dashboard");
        } catch (err: any) {
            toast.error(err.response?.data?.message);
        }
    };

    async function onSubmit(event: SyntheticEvent) {
        event.preventDefault();
        setIsLoading(true);

        signIn(email, password);

        setIsLoading(false);
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
                            onChange={(e) => setEmail(e.target.value)}
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
                            onChange={(e) => setPassword(e.target.value)}
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
                    <Button disabled={isLoading}>
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
