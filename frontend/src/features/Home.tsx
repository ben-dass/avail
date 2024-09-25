import { useAppSelector } from "@src/store/store.ts";

const Home = () => {
	const authState = useAppSelector((state) => state.auth);

	return <div>LoggedIn Status: {authState.email}</div>;
};

export default Home;
