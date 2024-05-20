import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function useGetSinglePost () {
    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});
    const { id } = useParams();

    useEffect(() => {
        async function getPost() {
            try {
                const response = await axios.get(`http://localhost:3000/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                toast.error("Unable to communicate with server: " + error.response.data);
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        getPost();
    }, [id]);
    

    return { loading, post };
}