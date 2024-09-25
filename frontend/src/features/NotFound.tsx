import { useRouteError } from "react-router-dom";

const NotFound = () => {
	const error: unknown = useRouteError();
	console.log(error);

	return (
		<div className="flex items-center justify-center">
			<h1>Oops!</h1>
			<p>Sorry, an unexpected error has occurred.</p>
			<p>
				<em>{error}</em>
			</p>
		</div>
	);
};

export default NotFound;
