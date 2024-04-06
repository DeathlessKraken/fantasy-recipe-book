import { useState } from 'react';
import PostItem from '../components/PostItem';
import styles from '../styles/posts.module.css';

import dummy from '../data';

export default function FandomPosts() {
  const [data, setData] = useState(dummy);

  return (
    <section className={styles.posts}>
        {data.length > 0 ? <div className={styles.posts_container}>
            {
                data.map(({id, title, category, date_posted, prep_time_mins, cook_time_mins,
                servings, author, body, media}) => <PostItem key={id} postId={id} title={title} category={category} 
                date_posted={date_posted} prep_time_mins={prep_time_mins} cook_time_mins={cook_time_mins} 
                servings={servings} author={author} body={body} media={media} />)
            }
        </div> : <h2 style={{marginTop: '5em'}}>No posts available.</h2> 
        }
    </section>
  );
}
