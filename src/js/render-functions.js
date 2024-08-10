'use strict';

import iziToast from 'izitoast';
import SimpleLightbox from 'simplelightbox';
import errorIcon from '/img/error.svg';
import { searchParams } from './pixabay-api';

const gallery = document.querySelector('.gallery');
const form = document.querySelector('.form');
const searchInput = document.querySelector('.search-input');
const loadMoreBtn = document.querySelector('.load-more-btn');

const simpleGallery = new SimpleLightbox('.gallery a', {
    overlayOpacity: 0.8,
    captionsData: 'alt',
    captionDelay: 250,
});

function displayPhotos(photos) {
    if (photos.total === 0) {
      showErrormsg(
        'Sorry, there are no images matching your search query. Please try again!'
      );
      searchInput.value = '';
      return;
    }
    const markup = photos.hits
      .map(
        ({
          largeImageURL,
          webformatURL,
          tags,
          likes,
          views,
          comments,
          downloads,
        }) => {
          return `
          <li class="gallery-item">
            <a href="${largeImageURL}">
              <img class="gallery-image" src="${webformatURL}" alt="${tags}">
              <div class="img-desc">
                <span><b>Likes:</b> <br/>${likes}</span>
                <span><b>Views:</b> <br/>${views}</span>
                <span><b>Comments:</b> <br/>${comments}</span>
                <span><b>Downloads:</b> <br/>${downloads}</span>
              </div>
            </a>
          </li>
           `;
        }
      )
      .join('');
    gallery.insertAdjacentHTML('beforeend', markup);
    checkLimit(photos.totalHits);
    scrollPage();
    simpleGallery.refresh();
    form.reset();
}

function checkLimit(limit) {
    if (Math.ceil(limit / searchParams.per_page) === searchParams.page) {
      showErrormsg("We're sorry, but you've reached the end of search results.");
      hideElem(loadMoreBtn);
    } else {
      showElem(loadMoreBtn);
    }
}

function scrollPage() {
    if (searchParams.page > 1) {
      const rect = document
        .querySelector('.gallery-item')
        .getBoundingClientRect();
      window.scrollBy({ top: rect.height * 2, left: 0, behavior: 'smooth' });
    }
}

function showElem(elem) {
    elem.style.display = 'inline-block';
  }
  function hideElem(elem) {
    elem.style.display = 'none';
  }

function showErrormsg(msg) {
    iziToast.show({
      position: 'topRight',
      iconUrl: errorIcon,
      messageColor: '#FAFAFB',
      messageSize: '16px',
      backgroundColor: '#EF4040',
      close: false,
      closeOnClick: true,
      closeOnEscape: true,
      message: msg,
    });
  }

export { displayPhotos, showErrormsg, showElem, hideElem };