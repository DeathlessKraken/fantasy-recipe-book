import { Link } from 'react-router-dom';
import PostAuthor from './PostAuthor';
import styles from '../styles/postitem.module.css';

export default function PostItem({postId, title, category, date_posted, prep_time_mins, cook_time_mins,
    servings, author, body, media}) {

    const truncatedBody = body.length > 175 ? body.substr(0, 175) + "..." : body;
    const truncatedTitle = title.length > 36 ? title.substr(0, 36) + "..." : title;

    return (
        <article className={styles.post_item}>
            <div className={styles.thumbnail}>
                <img src={media} alt={title} />
            </div>
            <div className={styles.content}>
                <Link to={`/posts/${postId}`}>
                    <h3>{truncatedTitle}</h3>
                </Link>
                <p>{truncatedBody}</p>
                <div className={styles.post_footer}>
                    <PostAuthor />
                    <Link to={`/posts/categories/${category}`} className={styles.category}>
                        {category}
                    </Link>
                </div>
            </div>
        </article>
    );
}