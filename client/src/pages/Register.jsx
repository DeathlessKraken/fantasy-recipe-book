import { Link, useNavigate } from "react-router-dom";
import useRegister from "../hooks/useRegister";
import { useAuthContext } from "../components/context/AuthContext";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import isEmail from "validator/lib/isEmail";

export default function Register () {
  const { loading, register } = useRegister();
  const { currentUser } = useAuthContext();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
      email: "",
      username: "",
      password: "",
      confirmPassword: ""
  });


  useEffect(() => {
      if(currentUser) navigate('/');
  });

  async function handleSubmit(e) {
      e.preventDefault();
      
      //perform client-side validation
      if(!inputs.email || !inputs.username || !inputs.password || !inputs.confirmPassword){
        toast.error("Please fill in all fields");
        return;
      } else if(!isEmail(inputs.email)) {
        toast.error("Please enter a valid email");
        return;
      } else if(inputs.password !== inputs.confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }

      await register(inputs);

      //Navigate to home
      if(currentUser) navigate('/');
  }

  function handleChange(e) {
      setInputs(prevState => {
          return {
              ...prevState,
              [e.target.name]: e.target.value
          }
      })
  }

    return (
        <section className="w-full">
            <h1 className="text-3xl text-default mx-auto w-fit my-4 lg:pt-4">Sign Up</h1>
            <form method="POST" onSubmit={handleSubmit} className="flex flex-col p-4 gap-4 max-w-96 mx-auto">
                <label className="input input-bordered input-ghost flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                  <input type="email" className="grow" placeholder="Email" name="email"
                    value={inputs.email} onChange={handleChange} />
                </label>

                <label className="input input-bordered input-ghost flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                  <input type="text" className="grow" placeholder="Username" name="username" 
                    value={inputs.username} onChange={handleChange}/>
                </label>

                <div>
                    <label htmlFor="password" className="text-default">Password:</label>
                    <label className="input input-bordered input-ghost flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                      <input type="password" className="grow" name="password" id="password" 
                        value={inputs.password} onChange={handleChange}/>
                    </label>
                </div>
                
                <div>
                    <label htmlFor="confirmPassword" className="text-default">Confirm Password:</label>
                    <label className="input input-bordered input-ghost flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                      <input type="password" className="grow" name="confirmPassword" id="confirmPassword" 
                        value={inputs.confirmPassword} onChange={handleChange}/>
                    </label>
                </div>

                {!loading ? <button className="btn btn-info" type="submit" onClick={handleSubmit}>Sign Up</button>
                    :   <button className="btn btn-info btn-disabled" disabled>
                            <span className="loading loading-spinner loading-sm"></span>
                        </button>}
                <p className="mx-auto w-fit text-slate-500 text-sm">
                  By signing up, you agree to the <Link className="link link-hover link-info">Terms of Service</Link> and <Link className="link link-hover link-info">Privacy Policy</Link>.
                </p>
            </form>
            <h2 className="mx-auto w-fit p-4 text-default">Already signed up? <Link to="/login" className="link link-primary">Log in here</Link></h2>
        </section>
    );
}