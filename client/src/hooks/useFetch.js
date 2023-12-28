import { useState, useEffect } from "react";
import axios from "axios";
const BASE_URL = `http://localhost:8000`;

const useFetch = () => {
    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users`);
                setData(await response.data);
            } catch (error) {
                console.log(error.message);
            }
        };
        fetchData();
    }, []);

    return { data };
}

export default useFetch;