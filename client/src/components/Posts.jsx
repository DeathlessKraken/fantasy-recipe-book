import { useState } from "react";
import { Link } from "react-router-dom";

import { data as dummyPosts } from "../data";

export default function Posts () {
    const [posts, setPosts] = useState(dummyPosts);
    const titleLength = 50;
    const descriptionLength = 150;
    
    return (
      <section className="lg:grid lg:grid-cols-3 lg:gap-16 lg:px-16 lg:pb-16">
        {posts.length > 0 ? posts.map((post) => {
            return (
                <div key={post.id} className="card bg-slate-200 shadow-xl m-4">
                  <figure><img className="object-cover w-full h-60" src={post.media} alt={post.title}/></figure>
                  <div className="card-body">
                    <h2 className="card-title text-default">{post.title.length > titleLength ? post.title.slice(0, titleLength) + "..." : post.title}</h2>
                    <p className="text-default">{post.body.length > descriptionLength ? post.body.slice(0, descriptionLength) + "..." : post.body}</p>
                    <div className="card-actions justify-end">
                      <Link to={`/recipe/${post.id}`}>
                        <button className="btn btn-neutral">View</button>
                      </Link>
                    </div>
                  </div>
                </div>
            );
        }) : <h1>No posts available!</h1>}
      </section>
    );
}