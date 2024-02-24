"use client";

import Link from "next/link";
import { useState } from "react";
import { FiEyeOff, FiEye } from "react-icons/fi";
import "./Login.css";

const SignIn = () => {
	const [userId, setUserId] = useState("");
	const [pass, setPass] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = (e) => {
		console.log("Submit");
	};

	// const navigate = useNavigate();

	// const handleSubmit = (e) => {
	// 	e.preventDefault();
	// 	setUserId(e.target[0].value);
	// 	setPass(e.target[1].value);
	// 	if (userId && pass) {
	// 		api.post("/user/login", { userId, password: pass })
	// 			.then((response) => {
	// 				localStorage.setItem("token", response.data?.token);
	// 				navigate("/");
	// 			})
	// 			.catch((err) => alert(err.response.data.error));
	// 	} else {
	// 		alert("Please fill all the fields");
	// 	}
	// };

	return (
		<main className="h-screen w-screen text-center flex text-black min-h-screen items-center justify-center">
			<section>
				<div className="login">
					<div className="pb-[20px]">
						<p className="text-4xl font-extrabold text-gray-200">Faculty Feedback System</p>

						<p className="text-xl text-gray-100 mt-2">Student - Faculty feedbacking made easy.</p>
					</div>
					<div className="auth-form-container">
						{/* <h2 className="font-bold pb-5 text-2xl">Sign In</h2> */}
						<form className="flex flex-col pt-4" onSubmit={handleSubmit}>
							<input
								value={userId}
								onChange={(e) => setUserId(e.target.value)}
								type="text"
								placeholder="User ID"
								id="userId"
								name="userId"
								autoComplete="off"
								autoCapitalize="none"
								required
							/>
							<div className="relative">
								<input
									value={pass}
									onChange={(e) => setPass(e.target.value)}
									type={showPassword ? "text" : "password"}
									placeholder="Password"
									id="password"
									name="password"
									required
								/>
								<div
									className="absolute h-full flex flex-col justify-center top-0 right-4 cursor-pointer"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
								</div>
							</div>

							<button
								type="submit"
								className="bg-gray-800 border-none p-5 rounded-md cursor-pointer text-gray-300 mt-2"
							>
								Sign In
							</button>
							<br />
							{/* <p>
								Don&apos;t have an account?&ensp;
								<Link href="/signup" className="link-btn">
									Sign up
								</Link>
							</p> */}
						</form>
					</div>
				</div>
			</section>
		</main>
	);
};
export default SignIn;
