import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function useGetFilteredPosts ({category, sort, time}) {
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

    
    useEffect(() => {
        async function getPosts() {
            setLoading(true);
            try {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                if(category === 'all') category = null;
                // eslint-disable-next-line react-hooks/exhaustive-deps
                if(sort === 'popularity') sort = null;
                // eslint-disable-next-line react-hooks/exhaustive-deps
                if(time === 'all') time = null;

                const response = await axios.get(`http://localhost:3000/api/posts/`, {
                        params: {category, sort, time}
                    })

                setPosts(response.data);

            } catch (error) {
                if(error.response.data.error) {
                    toast.error("Error: " + error.response.data.error);
                } else {
                    toast.error("Error: " + error.response.data);
                }
                setPosts([]);
            } finally {
                setLoading(false);
            }
        }

        getPosts();
    }, [category, sort, time]);
    

    return { loading, posts };
}