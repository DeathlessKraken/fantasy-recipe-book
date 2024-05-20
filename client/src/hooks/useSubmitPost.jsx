import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../components/context/AuthContext";

export default function useSubmitPost() {
    //If there are errors from API, toast it.
    const [loading, setLoading] = useState(false);
    const { currentUser } = useAuthContext();

    async function submit(post) {
        setLoading(true);

        
        if((post.is_personal === false || post.is_personal === "false") && post.post_origin) {
            delete post.is_personal;
        } else if(post.is_personal === true || post.is_personal === 'true') {
            delete post.post_origin;
        }
        
        if(post.description === "") {
            delete post.description;
        }

        if(post.charCount < 1) {
            delete post.body;
        }
        
        console.log(post);
        try {
            //grab token from localstorage, send along with request
            const result = await axios.post("http://localhost:3000/api/posts/submit", post, 
                { headers: {'Authorization': `Bearer ${currentUser.token}`}});

            if(result.status === 201) return result.data.slug;
        } catch (error) {
            toast.error(error.response.data);
        } finally {
            setLoading(false);
        }
    }

    return {loading, submit};
}