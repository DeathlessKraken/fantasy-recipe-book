import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/login.module.css';

function Login() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
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
      <div className={styles.login}>
        <h2>Sign Up</h2>
        <form className={styles.login_form}>
          <p className={styles.error}>This is an error message</p>
          <input type="text" name="email" placeholder='Email' value={inputs.email} onChange={handleChange} />
          <input type="text" name="password" placeholder='Password' value={inputs.password} onChange={handleChange} />
          <button type='submit' onClick={handleSubmit} className={styles.login_button}>Login</button>
        </form>
      <small>Don&apos;t have an account? <Link to="/register">Sign up here</Link></small>
      </div>
    </section>
  )
}

export default Login