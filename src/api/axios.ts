import axiosClass from 'axios';

const API_URL = 'https://api.jikan.moe';

export const axios = axiosClass.create({
    baseURL: API_URL,
    timeout: 5000,
});
