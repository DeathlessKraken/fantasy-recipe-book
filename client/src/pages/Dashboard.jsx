import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/dashboard.module.css';

import data from '../data';

export default function Dashboard() {
  const [posts, setPosts] = useState('');

  return (
    <section className={styles.dashboard}>
      { 
        posts.length ? 
        <div className={styles.dashboard_posts}>

          {posts.map(post => {
            return (
              <article key={post.id} className={styles.dashboard_post}>
                <div className={styles.post_info}>
                  <div className={styles.post_thumbnail}>
                    <img src={post.avatar} alt="" />
                  </div>
                  <h4>{post.title}</h4>
                </div>
                <div className={styles.dashboard_buttons}>
                  <Link></Link>
                </div>
              </article>
            );
          })}

        </div> : <h2>No posts available.</h2>
      }

    </section>
  );
}
