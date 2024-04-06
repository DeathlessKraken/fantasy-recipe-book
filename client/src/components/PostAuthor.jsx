import { Link } from "react-router-dom";
import TestAvatar from '../images/pfp.jpeg';
import styles from '../styles/postauthor.module.css';

export default function PostAuthor() {
    const user = 'TestUser';
    return (
        <Link to={`/posts/users/${user}`} className={styles.author}>
            <div className={styles.avatar}>
                <img src={TestAvatar} alt="" />
            </div>
            <div className={styles.author_details}>
                <h5>Posted by: TestUser</h5>
                <small>Three hours ago</small>
            </div>
        </Link>
    );
}