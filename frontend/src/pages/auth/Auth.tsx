import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import { logOut } from "./authSlice.ts";
import { Button } from "@components/ui/button.tsx";
import { Input } from "@components/ui/input.tsx";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@src/store/apiSlice.ts";

const Auth = () => {
	const dispatch = useAppDispatch();
	const authState = useAppSelector((state) => state.auth);
	const [login] = useLoginMutation();

	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const navigate = useNavigate();

	const handleLogin = async () => {
		const payload = {
			email: username,
			password: password,
		};

		const result = await login(JSON.stringify(payload)).unwrap();
		console.log("Auth: ", result);
		navigate("/");
	};

	const handleLogout = () => {
		dispatch(logOut());
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="mt-5 flex h-full w-[20rem] flex-col justify-center gap-3">
				<Input
					type="text"
					placeholder="Username"
					name="username"
					onChange={(e) => setUsername(e.target.value)}
					className="active:border-gay-100 border-gray-600 transition duration-300 ease-in-out hover:border-gray-400 focus:border-[0.1rem] focus:border-gray-100"
				/>
				<Input
					type="password"
					placeholder="Password"
					name="username"
					onChange={(e) => setPassword(e.target.value)}
					className="active:border-gay-100 focus:border-1 border-gray-600 transition duration-300 ease-in-out hover:border-gray-300 focus:border-gray-100"
				/>
				{authState.loggedIn ? (
					<Button
						type="submit"
						onClick={handleLogout}
						className="mt-2 bg-slate-700 transition duration-300 ease-in-out hover:bg-slate-600"
					>
						Logout
					</Button>
				) : (
					<Button
						type="submit"
						onClick={handleLogin}
						className="mt-2 bg-slate-700 transition duration-300 ease-in-out hover:bg-slate-600"
					>
						Login
					</Button>
				)}
			</div>
		</div>
	);
};

export default Auth;
