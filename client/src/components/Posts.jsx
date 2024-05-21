import PostSkeleton from "./skeletons/PostSkeleton";
import useGetPosts from "../hooks/useGetPosts";
import PostCard from "./PostCard";

export default function Posts () {
    const {loading, posts} = useGetPosts();

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

        {(loading === false && posts.length > 0) && posts.map((post, idx) => {
            return (
              <PostCard post={post} key={idx}/>
            );
        })}
      </section>
    );
}