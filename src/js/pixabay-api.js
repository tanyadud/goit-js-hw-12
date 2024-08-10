'use strict';

import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45266338-df116589a90e1c76fc0e83bf8';

const searchParams = {
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

async function fetchPhotos() {
  return axios.get(`${BASE_URL}`, { params: searchParams });
}

export { fetchPhotos, searchParams };