import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { data as dummyData } from "../data";
import LeftArrow from "../assets/Arrow_Left.svg";

export default function Recipe () {
    const navigate = useNavigate();
    const [post, setPost] = useState(dummyData[1]);

    return (
        <section className="w-full h-full">
            <div className="bg-orange-200 p-4 w-full lg:w-5/6 mx-auto lg:my-8 lg:rounded-lg">
                
                <button className="btn btn-ghost p-0" onClick={() => navigate(-1)}>
                    <img className="w-8" src={LeftArrow} alt="Left arrow for back navigation" />
                </button>

                {/* Protected edit/delete buttons for author */}
                <div className="flex gap-4 pb-4 justify-end hidden">
                    <button className="btn btn-accent">Edit</button>
                    <button className="btn btn-error">Delete</button>
                </div>

                <div>
                    <h2 className="text-default text-lg mb-4">Posted by: <Link to={`user/${post.author}`} className="link link-info link-hover">{post.author}</Link></h2>
                </div>

                <div className="m-auto w-fit h-fit rounded-lg overflow-hidden">
                    <img src={post.media} alt={post.title} />
                </div>

                <h1 className="text-default text-2xl my-4 text-center">{post.title}</h1>

                <div className="flex flex-col items-center gap-4 my-4">

                    <div className="stats stats-vertical lg:stats-horizontal bg-orange-300 text-slate-600">
  
                      <div className="stat ">
                        <div className="stat-title text-slate-600">Prep Time</div>
                        <div className="stat-value">{post.prep_time_mins}</div>
                        <div className="stat-desc text-slate-600">Minutes</div>
                      </div>

                      <div className="stat">
                        <div className="stat-title text-slate-600">Cook Time</div>
                        <div className="stat-value">{post.cook_time_mins}</div>
                        <div className="stat-desc text-slate-600">Minutes</div>
                      </div>

                      <div className="stat">
                        <div className="stat-title text-slate-600">Servings</div>
                        <div className="stat-value">{post.servings}</div>
                      </div>

                    </div>

                    <p className="text-slate-600 text-xl">{"Found in: " + post.category}</p>

                    <p className="text-default">{post.body}</p>
                </div>
            </div>
        </section>
    );
}