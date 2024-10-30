import { useGetCurrentCatalogQuery } from "@src/app/services/movies.ts";


const ManageCatalogue = () => {
	const {  data  } = useGetCurrentCatalogQuery({})
	console.log(data)
	
	
	return <div>ManageCatalogue</div>;
};

export default ManageCatalogue;
