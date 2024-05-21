import PostSkeleton from "./skeletons/PostSkeleton";
import useGetFilteredPosts from "../hooks/useGetFilteredPosts";
import PostCard from "./PostCard";

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
              <PostCard post={post} key={idx}/>
            );
        })}

        {(sortDirection === 'ascending' && (loading === false && posts.length > 0)) && 
          posts.toReversed().map((post, idx) => {
              return (
                <PostCard post={post} key={idx}/>
              );
          })}
      </section>
    );
}