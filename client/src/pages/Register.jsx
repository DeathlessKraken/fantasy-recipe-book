import { Form, Link, redirect } from "react-router-dom";

export default function Register () {
    //const data = useActionData()
    // if return error from registerAction, pop error toast

    return (
        <section className="w-full">
            <h1 className="text-3xl text-default mx-auto w-fit my-4 lg:pt-4">Sign Up</h1>
            <Form method="POST" action="/register" className="flex flex-col p-4 gap-4 w-96 mx-auto">
                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                  <input type="email" className="grow" placeholder="Email" name="email" />
                </label>

                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                  <input type="text" className="grow" placeholder="Username" name="username" />
                </label>

                <div>
                    <label htmlFor="password" className="text-default">Password:</label>
                    <label className="input input-bordered flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                      <input type="password" className="grow" name="password" id="password" />
                    </label>
                </div>
                
                <div>
                    <label htmlFor="confirmPassword" className="text-default">Confirm Password:</label>
                    <label className="input input-bordered flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                      <input type="password" className="grow" name="confirmPassword" id="confirmPassword" />
                    </label>
                </div>

                <button className="btn btn-info" type="submit">Sign Up</button>
            </Form>
            <h2 className="mx-auto w-fit py-4 text-default">Already signed up? <Link to="/login" className="link link-primary">Log in here</Link></h2>
        </section>
    );
}

//Export this function to utils or other fitting directory
export async function registerAction ({request}) {
    const data = await request.formData();

    const submission = {
        email: data.get('email'),
        username: data.get('username'),
        password: data.get('password'),
        confirmPassword: data.get('confirmPassword'),
    }

    console.log(submission);

    //Client-side check
    //if ANY field is empty
    //if email is invalid format
    //if password is LESS THAN 8 chars (password strength display?)
    //if password and confirmpassword do not match

    //Send data to API
    //see if email or username is already used

    return redirect('/');
}