import LeftNav from "@/src/components/LeftNav/LeftNav.tsx";
import Content from "@/src/components/Content.tsx";

const App = () => {
	return (
		<div className="flex h-svh justify-center bg-gray-800">
			<div className="w-[70rem]">
				<div className="mt-[1.5rem] flex items-center justify-between rounded-lg bg-black bg-opacity-20 pb-[0.5rem] pt-[0.5rem] outline outline-[0.13rem] outline-black drop-shadow-lg backdrop-blur-lg">
					<h1 className="z-10 ml-[1rem] text-2xl font-bold tracking-widest text-slate-100">
						AVAIL
					</h1>
					<a
						href="#"
						className="mr-[1rem] text-sm text-white underline"
					>
						Login
					</a>
				</div>
				<div className="mt-4 flex w-full flex-row gap-3">
					<LeftNav />
					<Content />
				</div>
			</div>
		</div>
	);
};

export default App;
