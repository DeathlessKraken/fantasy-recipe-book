import { useEffect, useState } from "react";
import axios from "axios";

export default function useGetPosts () {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        async function getPosts() {
            setLoading(true);
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/`);
                setPosts(response.data);
            } catch (error) {
                //Pop toast
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getPosts();
    }, []);
    

    return { loading, posts };
}