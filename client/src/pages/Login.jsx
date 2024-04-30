import { Form, Link } from "react-router-dom";

export default function Login () {
    //const data = useActionData()
    // if return error from loginAction, pop error toast

    return (
        <section className="w-full">
            <h1 className="text-3xl text-default mx-auto w-fit my-4 lg:pt-4">Log In</h1>
            <Form method="POST" action="/login" className="flex flex-col p-4 gap-4 max-w-96 mx-auto">

                <label className="input input-bordered flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                  <input type="text" className="grow" placeholder="Username" name="username" />
                </label>

                <div>
                    <label className="input input-bordered flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                      <input type="password" className="grow" name="password" id="password" />
                    </label>
                </div>

                <button className="btn btn-info" type="submit">Log In</button>
            </Form>
            <h2 className="mx-auto w-fit p-4 text-default">Don&apos;t have an account? <Link to="/register" className="link link-primary">Sign up here</Link></h2>
        </section>
    );
}