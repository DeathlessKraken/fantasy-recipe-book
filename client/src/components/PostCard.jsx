import { Link } from "react-router-dom";

export default function PostCard(props) {
    const { post } = props;
    return (
        <Link to={`/recipe/${post.slug}`} className="card bg-slate-200 shadow-xl">
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
}