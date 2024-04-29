import { useState } from "react";
import { Link } from "react-router-dom";

//Dummy data
import AvatarPFP from "../assets/Avatar0.jpg";
import data, { authorDummyData } from "../data";
import paginatePosts from "../utils/paginatePosts";

export default function User() {
    const [dummyData, setDummyData] = useState(data);
    const [authorData, setAuthorData] = useState(authorDummyData);
    const [currentPage, setCurrentPage] = useState(0);

    //More than 8 posts results in pagination on user page;
    const [pages, isArray] = paginatePosts(dummyData);

    function handleBackPage() {
        if(currentPage < 1) return;
        setCurrentPage(prevPage => prevPage-1);
    }

    function handleForwardPage() {
        if(currentPage === pages.length-1) return;
        setCurrentPage(prevPage => prevPage+1);
    }

    return (
        <section className="max-w-6xl mx-auto h-[43rem]">
            <div className="flex flex-col lg:flex-row justify-between h-full">
                {/* User info in first column */}
                <div className="flex flex-col items-center p-12 bg-orange-200 h-fit my-8 rounded-lg min-w-96">

                    {/* TODO: Update image alt to username */}
                    <img className="w-48 rounded-full border-4 border-sky-400" src={AvatarPFP} alt={"profile picture of user " + "USERNAME"} />

                    <div className="flex flex-col gap-1 py-4 text-md text-default font-small">
                        <p>User: { authorData[0].name }</p>
                        <p>Posts: { authorData[0].posts }</p>
                        <p>Member since: September, 2018</p>
                        <div className="my-4">
                            <p className="font-medium">Upload New Profile Picture:</p>
                            <input type="file" className="file-input file-input-bordered file-input-sm file-input-neutral w-full max-w-xs text-slate-200" />
                        </div>
                        <Link to={`/user/TESTUSER/update`} className="link link-hover text-blue-600">Update Account Information</Link>
                    </div>
                </div>

                {/* User posts populate columns 2 and 3*/}
                <div className={"p-8 my-8 mx-4 bg-gray-100 rounded-lg flex flex-col gap-4 items-center justify-between w-full " + (isArray ? "h-full" : "h-fit")}>
                    <div className="flex flex-col w-full gap-4">
                        {
                            isArray === true ?
                            pages[currentPage].map((post) => {
                                return (
                                    <div key={post.id} className="flex h-14 w-full justify-between bg-gray-300 rounded-xl text-md">
                                        <div className="flex">
                                            <img className="object-cover h-3/4 aspect-square rounded-lg self-center mx-2" src={post.media} alt={post.title} />
                                            <p className="text-default self-center">
                                                {post.title.length > 20 ? post.title.slice(0, 20) + "..." : post.title }
                                            </p>
                                        </div>

                                        <div className="flex gap-4 items-center px-4">
                                            <button className="btn btn-sm btn-info">View</button>
                                            <button className="btn btn-sm btn-accent">Edit</button>
                                            <button className="btn btn-sm btn-error">Delete</button>
                                        </div>
                                    </div>
                                );
                            }) : pages.map((post) => {
                                return (
                                    <div key={post.id} className="flex h-14 w-full justify-between bg-gray-300 rounded-xl text-md">
                                        <div className="flex">
                                            <img className="object-cover h-3/4 aspect-square rounded-lg self-center mx-2" src={post.media} alt={post.title} />
                                            <p className="text-default self-center">
                                                {post.title.length > 20 ? post.title.slice(0, 20) + "..." : post.title }
                                            </p>
                                        </div>

                                        <div className="flex gap-4 items-center px-4">
                                            <button className="btn btn-sm btn-info">View</button>
                                            <button className="btn btn-sm btn-accent">Edit</button>
                                            <button className="btn btn-sm btn-error">Delete</button>
                                        </div>
                                    </div>
                                );
                            }) 
                        }
                    </div>

                    {/* Pagination if many posts */}
                    {
                        isArray && 
                        <div className="join">
                          <button className="join-item btn btn-warning" 
                            onClick={handleBackPage}>«</button>
                          <button className="join-item btn btn-warning">Page {currentPage + 1}</button>
                          <button className="join-item btn btn-warning"
                            onClick={handleForwardPage}>»</button>
                        </div>
                    }
                </div>
            </div>
        </section>
    );
}