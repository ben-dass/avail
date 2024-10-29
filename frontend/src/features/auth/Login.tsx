import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "@src/app/services/auth";
import { useAppDispatch } from "@src/app/store.ts";
import { setCredentials } from "@src/features/auth/authSlice.ts";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@components/ui/form";
import { Button } from "@components/ui/button.tsx";
import { Input } from "@components/ui/input.tsx";

const formSchema = z.object({
	email: z
		.string()
		.min(1, { message: "Email is required" })
		.email({ message: "Invalid email address" }),
	password: z.string().min(1, { message: "Password is required" }),
});

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();
	const [login, { isLoading }] = useLoginMutation();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		const email = values.email;
		const password = values.password;

		try {
			const userData = await login({
				email,
				password,
			}).unwrap();

			dispatch(
				setCredentials({
					email: values.email,
					access_token: userData.access_token,
					refresh_token: userData.refresh_token,
				}),
			);
			navigate("/");
		} catch (e) {
			console.log("error: ", e);
		}
	};

	return isLoading ? (
		<p>Loading...</p>
	) : (
		<div className="flex w-full flex-col items-center">
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="flex w-[25rem] flex-col gap-5 pt-5"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										placeholder="admin@example.com"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										placeholder="secret"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button
						type="submit"
						className="hover:bg-slate-800"
					>
						Login
					</Button>
				</form>
			</Form>
		</div>
	);
};

export default Login;
