import LeftNav from "@/components/local/left-nav/LeftNav.tsx";
import Content from "@/components/local/Content.tsx";
import TopNav from "@/components/local/TopNav.tsx";

const App = () => {
	return (
		<div className="flex h-svh justify-center bg-gray-800">
			<div className="w-[70rem]">
				<TopNav />
				<div className="mt-4 flex w-full flex-row gap-4">
					<LeftNav />
					<Content />
				</div>
			</div>
		</div>
	);
};

export default App;
