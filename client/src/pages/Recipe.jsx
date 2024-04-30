import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { data as dummyData } from "../data";
import LeftArrow from "../assets/Arrow_Left.svg";
import BoxArrowDown from "../assets/BoxArrowDown.svg";

export default function Recipe () {
    const navigate = useNavigate();
    const [post, setPost] = useState(dummyData[1]);

    function handleIngredientCheckbox(itemIndex) {
        const item = document.getElementById("desc" + itemIndex);

        if(item.style.textDecorationLine === "" || item.style.textDecorationLine === "none") {
            item.setAttribute("style", "text-decoration-line: line-through");
        } else {
            item.setAttribute("style", "text-decoration-line: none");
        }
    }

    return (
        <article className="w-full h-full">
            <div className="lg:bg-orange-100 p-4 w-full max-w-xl xl:max-w-2xl mx-auto lg:my-8 lg:rounded-lg">
                
                <div className="flex justify-between">
                    <button className="btn btn-ghost p-0" onClick={() => navigate(-1)}>
                        <img className="w-8" src={LeftArrow} alt="Left arrow for back navigation" />
                    </button>

                    {/* Protected edit/delete buttons for author */}
                    <div className="flex gap-4 pb-4 justify-end">
                        <Link to={`/recipe/${post.id}/edit`}>
                            <button className="btn btn-accent">Edit</button>
                        </Link>
                        <Link to={`/recipe/${post.id}/delete`}>
                            <button className="btn btn-error">Delete</button>
                        </Link>
                    </div>
                </div>
                
                {/* Title */}
                <h1 className="text-default text-3xl mt-4">{post.title}</h1>
                {/* Post user info */}
                <div className="flex flex-col mt-2">
                    <div className="flex flex-col">
                        <h2 className="text-default text-sm">Posted by: <Link to={`/user/${post.author}`} 
                            className="link link-info link-hover">{post.author}</Link> on {new Date(post.date_posted).toLocaleDateString()}</h2>
                    <p className="text-default text-sm">{"Found in: " + post.category}</p>

                    {/* If this is not an origial recipe, this link will appear. */}
                    <a href="https://blog.fatfreevegan.com/2013/06/kale-and-quinoa-salad-with-black-beans.html"><p className="link link-info link-hover">Original Post</p></a>
                    </div>
                </div>

                {/* Short description, no more than 45 words. */}
                <p className="italic text-slate-600 my-4">{post.description}</p>

                <div className="m-auto w-fit h-fit rounded-lg overflow-hidden">
                    <img src={post.media} alt={post.title} />
                </div>

                {/* Jump to recipe and possible share links */}
                <button className="btn btn-info flex mx-auto my-4" onClick={() => document.getElementById('recipe').scrollIntoView({behavior: 'smooth', block: 'start'})}>
                    <img className="w-8" src={BoxArrowDown} alt="skip to recipe icon button" />
                    Skip to Recipe
                </button>

                <p className="text-default leading-relaxed my-4">{post.body}</p>

                <div id="recipe" className="flex flex-col gap-4 my-4">

                    <div className="flex flex-col sm:flex-row gap-4 sm:justify-center">
                        <div className="stats stats-horizontal mt-4 sm:mt-0 self-center bg-slate-200 text-slate-700 text-xs w-64 sm:w-fit">
                          <div className="stat">
                            <div className="stat-title text-slate-700 font-semibold">Prep Time</div>
                            <div className="stat-value">{post.prep_time_mins}</div>
                            <div className="stat-desc text-slate-700 font-medium">Minutes</div>
                          </div>

                          <div className="stat">
                            <div className="stat-title text-slate-700 font-semibold">Cook Time</div>
                            <div className="stat-value">{post.cook_time_mins}</div>
                            <div className="stat-desc text-slate-700 font-medium">Minutes</div>
                          </div>
                        </div>

                        <div className="stats stats-horizontal mb-4 sm:mb-0 self-center bg-slate-200 text-slate-700 text-xs w-64 sm:w-fit">
                            <div className="stat">
                              <div className="stat-title text-slate-700 font-semibold">Total Time</div>
                              <div className="stat-value">{post.cook_time_mins + post.prep_time_mins}</div>
                              <div className="stat-desc text-slate-700 font-medium">Minutes</div>
                            </div>

                            <div className="stat">
                              <div className="stat-title text-slate-700 font-semibold">Servings</div>
                              <div className="stat-value">{post.servings}</div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 text-default">
                        {
                            post.ingredients.map((item, idx) => {
                                return (
                                    <div key={idx} className="flex gap-1">
                                        <input type="checkbox" id={"item" + idx} className="checkbox checkbox-info" onClick={() => handleIngredientCheckbox(idx)}/>
                                        <label htmlFor={"item" + idx} id={"desc" + idx}>{item}</label>
                                    </div>
                                );
                            })
                        }
                    </div>

                    <ol type="1" className="text-default list-decimal px-4">
                        {
                            post.instructions.map((item, idx) => {
                                return (
                                    <li key={idx} className="my-4">
                                        {item}
                                    </li>
                                );
                            })
                        }
                    </ol>
                </div>
            </div>
        </article>
    );
}