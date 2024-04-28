import { useState } from "react";

//Dummy data
import AvatarPFP from "../assets/Avatar0.jpg";
import data, { authorDummyData } from "../data";

export default function User() {
    const [dummyData, setDummyData] = useState(data);
    const [authorData, setAuthorData] = useState(authorDummyData);

    return (
        <section className="grid grid-cols-3">

            {/* User info in first column */}
            <div className="col-span-1 p-4 justify-self-center">

                {/* TODO: Update image alt to username */}
                <img className="w-48 rounded-full border-4 border-sky-400" src={AvatarPFP} alt={"profile picture of user " + "USERNAME"} />

                <div className="py-4 text-2xl text-default">
                    <p>User: { authorData[0].name }</p>
                    <p>Posts: { authorData[0].posts }</p>
                    <p>Member since: 2018</p>
                </div>
            </div>

            {/* User posts populate columns 2 and 3*/}
            <div className="col-span-2 flex flex-col gap-4 pr-4 my-8">
                {
                    data.map((post) => {
                        return (
                            <div key={post.id} className="flex h-32 justify-between bg-slate-400 rounded-xl">
                                <img className="w-28 object-cover h-28 rounded-lg self-center mx-2" src={post.media} alt={post.title} />
                                <p className="text-default text-2xl self-center">
                                    {post.title.length > 30 ? post.title.slice(0, 30) + "..." : post.title }
                                </p>
                                <div className="flex gap-4 items-center px-4">
                                    <button className="btn btn-info">View</button>
                                    <button className="btn btn-accent">Edit</button>
                                    <button className="btn btn-error">Delete</button>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </section>
    );
}