import { Link } from "react-router-dom";
import PostSkeleton from "./skeletons/PostSkeleton";
import useGetFilteredPosts from "../hooks/useGetFilteredPosts";

export default function FilteredPosts (props) {
    const { queries, sortDirection } = props;
    const {loading, posts} = useGetFilteredPosts(queries);

    return (
      <section 
        className="
          grid 
          grid-cols-1 
          gap-4 
          gap-y-8
          sm:grid-cols-2
          md:grid-cols-3
          md:gap-8
          lg:grid-cols-2
          xl:grid-cols-3
          xl:gap-16 
          xl:px-16
        ">

        {loading === true && 
          <>
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
            <PostSkeleton />
          </>
        }

        {(sortDirection === 'descending' && (loading === false && posts.length > 0)) && posts.map((post, idx) => {
            return (
              <Link key={idx} to={`/recipe/${post.slug}`} className="card bg-slate-200 shadow-xl">
                  <figure><img className="w-full h-48 object-cover rounded-t-xl" src={post.media_url} alt={post.title}/></figure>
                  <div className="card-body">
                    <p className="text-orange-600 text-base flex-none">{post.category.slice(0, 1).toUpperCase() + post.category.slice(1)}</p>
                    <h2 className="card-title text-default text-lg">{post.title}</h2>
                    <div className="flex justify-between flex-grow items-end text-sm text-default">
                      <p>{post.author}</p>
                      <p className="text-end">{post.prep_time + post.cook_time} Minutes</p>
                    </div>
                  </div>
              </Link>
            );
        })}

        {(sortDirection === 'ascending' && (loading === false && posts.length > 0)) && 
          posts.toReversed().map((post, idx) => {
              return (
                <Link key={idx} to={`/recipe/${post.slug}`} className="card bg-slate-200 shadow-xl">
                    <figure><img className="w-full h-48 object-cover rounded-t-xl" src={post.media_url} alt={post.title}/></figure>
                    <div className="card-body">
                      <p className="text-orange-600 text-base flex-none">{post.category.slice(0, 1).toUpperCase() + post.category.slice(1)}</p>
                      <h2 className="card-title text-default text-lg">{post.title}</h2>
                      <div className="flex justify-between flex-grow items-end text-sm text-default">
                        <p>{post.author}</p>
                        <p className="text-end">{post.prep_time + post.cook_time} Minutes</p>
                      </div>
                    </div>
                </Link>
              );
          })}
      </section>
    );
}