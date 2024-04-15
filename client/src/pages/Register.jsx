import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/register.module.css';

function Register() {
  const [inputs, setInputs] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  function handleChange (event) {
    setInputs(prevState => {
      return {
        ...prevState,
        [event.target.name]: event.target.value
      }
    });
  }

  function handleSubmit(event) {
    return ;
  }

  return (
    <section>
      <div className={styles.register}>
        <h2>Sign Up</h2>
        <form className={styles.register_form}>
          <p className={styles.error}>This is an error message</p>
          <input type="text" name="firstname" placeholder='First Name' value={inputs.firstname} onChange={handleChange} autoFocus/>
          <input type="text" name="lastname" placeholder='Last Name' value={inputs.lastname} onChange={handleChange} />
          <input type="email" name="email" placeholder='Email' value={inputs.email} onChange={handleChange} />
          <input type="password" name="password" placeholder='Password' value={inputs.password} onChange={handleChange} />
          <input type="password" name="confirmPassword" placeholder='Confirm Password' value={inputs.confirmPassword} onChange={handleChange} />
          <button type='submit' onClick={handleSubmit} className={styles.register_button}>Register</button>
        </form>
      <small>Signed up already? <Link to="/login">Log in here</Link></small>
      </div>
    </section>
  )
}

export default Register