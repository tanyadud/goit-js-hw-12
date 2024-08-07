'use strict';

import { fetchPhotos, searchParams } from './js/pixabay-api';
import { hideElem, showErrormsg } from './js/render-functions';

const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more-btn');

form.addEventListener('submit', startSearch);
loadMoreBtn.addEventListener('click', loadMorePhotos);

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
  fetchPhotos();
}

function loadMorePhotos() {
  searchParams.page += 1;
  fetchPhotos();
}
