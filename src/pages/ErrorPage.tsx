import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
	const error = useRouteError();

	return (
		<div className="flex items-center justify-center">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<em>{error.statusText || error.message}</em>
			</p>
		</div>
	);
};

export default ErrorPage;
