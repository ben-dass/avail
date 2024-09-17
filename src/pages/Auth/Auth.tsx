import { useAppDispatch, useAppSelector } from "@/src/store.ts";
import { logIn, logOut } from "@/src/pages/Auth/authSlice.ts";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { useState } from "react";

const Auth = () => {
	const dispatch = useAppDispatch();
	const authState = useAppSelector((state) => state.auth);

	const [username, setUsername] = useState("");

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
					// onChange={(e) => setUsername(e.target.value)}
					className="active:border-gay-100 focus:border-1 border-gray-600 transition duration-300 ease-in-out hover:border-gray-300 focus:border-gray-100"
				/>
				{authState.loggedIn ? (
					<Button
						type="submit"
						onClick={() => dispatch(logOut())}
						className="mt-2 bg-slate-700 transition duration-300 ease-in-out hover:bg-slate-600"
					>
						Logout
					</Button>
				) : (
					<Button
						type="submit"
						onClick={() => dispatch(logIn(username))}
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
