import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function useLogin() {
    const [loading, setLoading] = useState(false);
    
    async function login({username, password}) {
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {username, password});

            //set localstorage from auth header
            
        } catch (error) {
            toast.error("Unable to login: " + error.response.data);
        }
    }

}