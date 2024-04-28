import Posts from "../components/Posts";

export default function Home () {
    return (
        <section className="">
            <h1 className="text-default font-semibold text-4xl lg:text-6xl mx-4 my-6 lg:px-16">Discover</h1>
            <Posts />
        </section>
    );
}