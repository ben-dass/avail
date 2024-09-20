import { useAppSelector } from "@src/store/store.ts";

const Home = () => {
	const authState = useAppSelector((state) => state.auth);

	return <div>LoggedIn Status: {authState.loggedIn.toString()}</div>;
};

export default Home;
