import axios from 'axios';

const BASE_URL = 'https://api.thecatapi.com/v1';
const END_POINT_BREEDS = 'breeds';
const END_POINT_IMAGES = 'images/search';
const API_KEY = 'live_AbsO56CeV5Ww8HCrfxmUss0tIs2A5zgn61sfNh3I1R2LhgNOZl3NT5JEPdzt9HbT';

axios.defaults.headers.common['x-api-key'] = API_KEY;

export function fetchBreeds() {
    return axios.get(`${BASE_URL}/${END_POINT_BREEDS}`);
}

export function fetchCatByBreed(breedId) {
    return axios.get(`${BASE_URL}/${END_POINT_IMAGES}?breed_ids=${breedId}`);
}
