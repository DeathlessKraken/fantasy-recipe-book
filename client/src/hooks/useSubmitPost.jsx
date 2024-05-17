import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useSubmitPost() {
    //If there are errors from API, toast it.
    const [loading, setLoading] = useState(false);

    async function submit(post) {
        setLoading(true);

        try {
            //grab token from localstorage, send along with request
            const result = await axios.post("http://localhost:3000/api/posts/submit", post);
            console.log(result);
        } catch (error) {
            toast.error("Unable to submit post: " + error.response.data);
        } finally {
            setLoading(false);
        }
    }

    return {loading, submit};
}