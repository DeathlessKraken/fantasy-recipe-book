import { Link } from 'react-router-dom';
import { useState } from 'react';
import styles from '../styles/userprofile.module.css';

import Avatar from '../images/Avatar0.jpg';

export default function UserProfile() {
  const [avatar, setAvatar] = useState(Avatar);
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  function handleFileChange (event) {
    setAvatar(event.target.files[0]);
  }

  function handleChange(event) {
    setInputs(prevState => {
      return ({
        ...prevState,
        [event.target.name]: event.target.value
      });
    });
  }

  function handleSubmit(event) {
    return ;
  }

  return (
    <section>
      <div className={styles.userprofile}>
        <Link to={`/myposts/Testuser`}>My Posts</Link>

        <div className={styles.userprofile_details}>
          <div className={styles.avatar}>
            <img src={avatar} alt="" />
          </div>
          <form className={styles.avatar_form}>
            <label htmlFor="avatar"><i className="fa-solid fa-pen-to-square"></i></label>
            <input type="file" name='avatar' id='avatar' onChange={handleFileChange} accept='png, jpg, jpeg'/>
          </form>
        </div>
        <h1>TestUser</h1>

        <form className={styles.userprofile_form}>
          <p className={styles.error}>This is an error</p>
          <input type="text" name="firstname" placeholder='First Name' value={inputs.firstname} onChange={handleChange} autoFocus/>
          <input type="text" name="lastname" placeholder='Last Name' value={inputs.lastname} onChange={handleChange} />
          <input type="email" name="email" placeholder='Email' value={inputs.email} onChange={handleChange} />
          <input type="password" name="currentPassword" placeholder='Current Password' value={inputs.currentPassword} onChange={handleChange} />
          <input type="password" name="newPassword" placeholder='New Password' value={inputs.newPassword} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder='Confirm Password' value={inputs.confirmPassword} onChange={handleChange} />
          <button type='submit' onClick={handleSubmit} className={styles.update_button}>Update</button>
        </form>
      </div>
    </section>
  );
}