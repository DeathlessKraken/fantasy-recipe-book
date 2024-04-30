import { useSearchParams } from "react-router-dom";
import Posts from "../components/Posts";

export default function SearchContent () {
    const [searchParams, setSearchParams] = useSearchParams();

    //Call api to return recipes with title/tags matching param.
    //Add a loading spinner while getting data from api.

    return (
        <section className="max-w-7xl flex flex-col mx-auto p-8 lg:px-64 xl:px-36 2xl:px-8">
            <h1 className="text-default font-semibold text-4xl lg:text-3xl my-6 xl:px-16">Searched for: {searchParams.get('query')}</h1>
            <Posts />
        </section>
    );
}