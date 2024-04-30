import Posts from "../components/Posts";

export default function Home () {
    return (
        <section className="max-w-7xl flex flex-col mx-auto p-8 lg:px-64 xl:px-36 2xl:px-8">
            <h1 className="text-default font-semibold text-4xl lg:text-6xl my-6 xl:px-16">Discover</h1>
            <Posts />
        </section>
    );
}