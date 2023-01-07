import axios from "axios";
import { API_KEY, ApiOptions } from "./options";

axios.defaults.baseURL= 'https://pixabay.com/api/';

export const fetchData = async (request, page) => {
    const searchParam = new URLSearchParams (ApiOptions);
    const url = `?key=${API_KEY}&q=${request}&page=${page}&${searchParam}`;

    const respone = await axios.get(url);
    return respone.data;
}