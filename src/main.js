'use strict';

import { fetchPhotos, searchParams } from './js/pixabay-api';
import { displayPhotos, showErrormsg, hideElem, showElem  } from './js/render-functions';

const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');
const loader = document.querySelector('.loader');

form.addEventListener('submit', startSearch);
loadMoreBtn.addEventListener('click', loadMorePhotos);

async function onFetchPhotos() {
    showElem(loader);
    try {
      const response = await fetchPhotos();
      displayPhotos(response.data);
      searchParams.page += 1;
    } catch (error) {
        showErrormsg(error.message);
    }
    hideElem(loader);
}

async function startSearch(event) {
  event.preventDefault();
  if (!searchInput.value.trim()) {
    showErrormsg('Please, fill out the search field');
    return;
  }
  gallery.innerHTML = '';
  searchParams.q = searchInput.value.trim();
  searchParams.page = 1;
  hideElem(loadMoreBtn);

  onFetchPhotos();
}

function loadMorePhotos(){
  onFetchPhotos();
}