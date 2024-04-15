import { useState } from 'react';
import styles from '../styles/dashboard.module.css';

import data from '../data';

export default function Dashboard() {
  const [posts, setPosts] = useState('');

  return (
    <section className={styles.dashboard}>
      { 
        posts.length ? 
        <div className={styles.dashboard_posts}>


        </div> : <h2>No posts available.</h2>
      }

    </section>
  );
}
