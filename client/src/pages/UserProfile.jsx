import { Link } from 'react-router-dom';
import styles from '../styles/userprofile.module.css';

import Avatar from '../images/Avatar0.jpg';

export default function UserProfile() {

  return (
    <section>
      <div className={styles.userprofile}>
        <Link to={`/myposts/Testuser`}>My Posts</Link>

        <div className={styles.userprofile_details}>
          <div className={styles.avatar}>
            <img src={Avatar} alt="" />
          </div>
          <form className={styles.avatar_form}>
            <label htmlFor="avatar"><i className="fa-solid fa-pen-to-square"></i></label>
            <input type="file" name='avatar' id='avatar' />
          </form>
        </div>
      </div>
    </section>
  );
}