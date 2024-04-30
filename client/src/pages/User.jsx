import { useState } from "react";
import { Link } from "react-router-dom";

//Dummy data
import AvatarPFP from "../assets/Avatar0.jpg";
import data, { authorDummyData } from "../data";
import paginatePosts from "../utils/paginatePosts";
import MiniPost from "../components/MiniPost";

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
        <section className="max-w-6xl mx-auto">
            <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between h-full">
                {/* User info in first column */}
                <div className="flex flex-col items-center p-12 bg-orange-200 w-fit mx-4 h-fit lg:my-8 rounded-lg lg:min-w-96">

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
                <div className={"px-4 lg:p-8 my-4 lg:my-8 mx-4 lg:bg-gray-100 rounded-lg flex flex-col-reverse lg:flex-col-reverse gap-4 items-center justify-between max-w-[40em] lg:max-w-none w-full " + (isArray ? "h-full" : "h-fit")}>
                    <div className="flex flex-col w-full gap-4">
                        {
                            isArray === true ?
                            pages[currentPage].map((post) => {
                                return (
                                    <MiniPost key={post.id} post={post}/>
                                );
                            }) : pages.map((post) => {
                                return (
                                    <MiniPost key={post.id} post={post}/>
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