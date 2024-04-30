import { useState } from "react";
import { Link } from "react-router-dom";

import { data as dummyPosts } from "../data";

export default function Posts () {
    const [posts, setPosts] = useState(dummyPosts);
    const titleLength = 50;
    const descriptionLength = 150;
    
    return (
      <section 
        className="
          grid 
          grid-cols-1 
          gap-4 
          gap-y-8
          md:grid-cols-2
          md:gap-8
          lg:grid-cols-1
          xl:grid-cols-2
          xl:gap-16 
          xl:px-16
        ">
        {posts.length > 0 ? posts.map((post) => {
            return (
                <div key={post.id} className="card bg-slate-200 shadow-xl">
                  <Link to={`/recipe/${post.id}`}><figure><img className="h-56 w-full object-cover rounded-t-xl" src={post.media} alt={post.title}/></figure></Link>
                  <div className="card-body">
                    <h2 className="card-title text-default">{post.title.length > titleLength ? post.title.slice(0, titleLength) + "..." : post.title}</h2>
                    <p className="text-default">{post.body.length > descriptionLength ? post.body.slice(0, descriptionLength) + "..." : post.body}</p>
                    <div className="card-actions justify-end">
                      <Link to={`/recipe/${post.id}`}>
                        <button className="btn btn-ghost text-primary">View Recipe</button>
                      </Link>
                    </div>
                  </div>
                </div>
            );
        }) : <h1>No posts available!</h1>}
      </section>
    );
}