import { useState } from "react";

import { data as dummyPosts } from "../data";

export default function Posts () {
    const [posts, setPosts] = useState(dummyPosts);
    const titleLength = 50;
    const descriptionLength = 150;
    
    return (
      <section className="lg:grid lg:grid-cols-3">
        {posts.length > 0 ? posts.map((post) => {
            return (
                <div key={post.id} className="card bg-slate-200 shadow-xl m-4">
                  <figure><img className="object-cover w-96 h-60" src={post.media} alt={post.title}/></figure>
                  <div className="card-body">
                    <h2 className="card-title text-default">{post.title.length > titleLength ? post.title.slice(0, titleLength) + "..." : post.title}</h2>
                    <p className="text-default">{post.body.length > descriptionLength ? post.body.slice(0, descriptionLength) + "..." : post.body}</p>
                    <div className="card-actions justify-end">
                      <button className="btn btn-neutral">View</button>
                    </div>
                  </div>
                </div>
            );
        }) : <h1>No posts available!</h1>}
      </section>
    );
}