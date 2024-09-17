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
		<div>
			<Input
				type="text"
				placeholder="username"
				onChange={(e) => setUsername(e.target.value)}
			/>
			{authState.loggedIn ? (
				<Button
					type="submit"
					onClick={() => dispatch(logOut())}
				>
					Logout
				</Button>
			) : (
				<Button
					type="submit"
					onClick={() => dispatch(logIn(username))}
				>
					Login
				</Button>
			)}
		</div>
	);
};

export default Auth;
