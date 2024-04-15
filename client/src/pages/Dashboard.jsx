import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/dashboard.module.css';

import data from '../data';

export default function Dashboard() {
  const [posts, setPosts] = useState(data);

  return (
    <section className={styles.dashboard}>
      { 
        posts.length ? 
        <div className={styles.dashboard_posts}>

          {posts.map(post => {
            const truncatedTitle = post.title.length > 36 ? post.title.substr(0, 36) + "..." : post.title;

            return (
              <article key={post.id} className={styles.dashboard_post}>
                <div className={styles.post_info}>
                  <div className={styles.post_media}>
                    <img src={post.media} alt="" />
                  </div>
                  <h4>{truncatedTitle}</h4>
                </div>
                <div className={styles.dashboard_buttons}>
                  <Link to={`/posts/${post.id}`} className={styles.post_view}>View</Link>
                  <Link to={`/posts/${post.id}/edit`} className={styles.post_edit}>Edit</Link>
                  <Link to={`/posts/${post.id}/delete`} className={styles.post_delete}>Delete</Link>
                </div>
              </article>
            );
          })}

        </div> : <h2>No posts available.</h2>
      }

    </section>
  );
}
