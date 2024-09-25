import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@src/features/auth/authAPISlice.ts";
import { useAppDispatch } from "@src/store/store.ts";

import { Button } from "@components/ui/button.tsx";
import { Input } from "@components/ui/input.tsx";
import { setCredentials } from "@src/features/auth/authSlice.ts";

const Login = () => {
	const navigate = useNavigate();
	const userRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const errorRef = useRef<HTMLInputElement | null>(null);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) =>
		setEmail(e.target.value);
	const handlePasswordInput = (e: React.ChangeEvent<HTMLInputElement>) =>
		setPassword(e.target.value);

	useEffect(() => {
		userRef.current?.focus();
	}, []);

	useEffect(() => {
		setError("");
	}, [email, password]);

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();

		try {
			const userData = await login({ email, password }).unwrap();
			console.log("userData: ", userData);
			dispatch(setCredentials({ ...userData, email }));
			navigate("/");
		} catch (e) {
			console.log("error: ", e);
		}
	};

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<form onSubmit={handleLogin}>
			<div className="flex h-full w-full items-center justify-center">
				<p ref={errorRef}>{error}</p>
				<div className="mt-5 flex h-full w-[20rem] flex-col justify-center gap-3">
					<Input
						ref={userRef}
						type="text"
						placeholder="Email"
						name="email"
						autoComplete="off"
						onChange={handleUserInput}
						className="active:border-gay-100 border-gray-600 transition duration-300 ease-in-out hover:border-gray-400 focus:border-[0.1rem] focus:border-gray-100"
					/>
					<Input
						ref={passwordRef}
						type="password"
						placeholder="Password"
						name="password"
						autoComplete="off"
						onChange={handlePasswordInput}
						className="active:border-gay-100 focus:border-1 border-gray-600 transition duration-300 ease-in-out hover:border-gray-300 focus:border-gray-100"
					/>

					<Button
						type="submit"
						className="mt-2 bg-slate-700 transition duration-300 ease-in-out hover:bg-slate-600"
					>
						Login
					</Button>
				</div>
			</div>
		</form>
	);
};

export default Login;
