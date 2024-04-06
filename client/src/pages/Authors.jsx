import { useState } from 'react';
import { data, authorDummyData } from '../data.js';
import styles from '../styles/authors.module.css';
import { Link } from 'react-router-dom';

export default function Authors () {
  const [authorData, setAuthorData] = useState(authorDummyData);

  return (
    <section>
      {authorData.length > 0 ? <div className={styles.author_section}>

        {authorData.map(({id, avatar, name, posts}) => {
          return (<Link key={id} to={`/posts/users/${id}`} className={styles.author}>
            <div className={styles.author_avatar}>
              <img src={avatar} alt={`Profile picture of ${name}`} />
            </div>
            <div className={styles.author_info}>
              <h4>{name}</h4>
              <p>{posts} posts</p>
            </div>
          </Link>);
        })}

      </div> : <h2 style={{marginTop: '5em'}}>No authors found.</h2> }
    </section>
  );
}