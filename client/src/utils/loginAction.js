import { redirect } from "react-router-dom";

export async function loginAction ({request}) {
    const data = await request.formData();

    const submission = {
        username: data.get('username'),
        password: data.get('password'),
    }

    //Client-side check
    //if ANY field is empty
    //if email is invalid format
    //if password is LESS THAN 8 chars (password strength display?)
    //if password and confirmpassword do not match

    //Send data to API
    //see if email or username is already used

    return redirect('/');
}