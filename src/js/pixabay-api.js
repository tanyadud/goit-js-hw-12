'use strict';

import axios from 'axios';

import { displayPhotos, showErrormsg, hideElem, showElem } from './render-functions';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '45266338-df116589a90e1c76fc0e83bf8';
const loader = document.querySelector('.loader');

const searchParams = {
    key: API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

async function fetchPhotos() {
    showElem(loader);
    try {
      const response = await axios.get(`${BASE_URL}`, { params: searchParams });
      displayPhotos(response.data);
    } catch (error) {
        showErrormsg(error.message);
    }
    hideElem(loader);
}

export { fetchPhotos, searchParams };