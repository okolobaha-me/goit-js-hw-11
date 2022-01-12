import renderGallery from './renderGallery';
import getPhotosList from './getPhotos';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Messages from './messages';

const NEW_PAGE_DISTANCE = 300;
const PHOTOS_PER_PAGE = 40;
const TRIGGER_DIV = `<div class='trigger' style='margin-top: -${NEW_PAGE_DISTANCE}px;'></div>`;
const messages = new Messages();

const refs = {
  input: document.querySelector('.input'),
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

let pageCounter = 0;
let maxPage = 1;

let links = {};

function addPhotosToGallery(photos) {
  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(photos, pageCounter));
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function isEmpty(count) {
  return !count;
}

function createTriggerDiv() {
  refs.gallery.insertAdjacentHTML('afterend', TRIGGER_DIV);
}

function setMaxPage(total) {
  maxPage = Math.ceil(total / PHOTOS_PER_PAGE);
}

function addObserverToTriggerDiv() {
  intersectionObserver.observe(document.querySelector('.trigger'));
}

function isGalleryEnd() {
  return pageCounter > maxPage;
}

function scrollWindow() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 3,
    behavior: 'smooth',
  });
}

async function loadMorePhotos() {
  if (isGalleryEnd()) {
    intersectionObserver.disconnect();
    messages.galleryEnd();
    return;
  }

  const fetchOptions = {
    name: refs.input.value,
    page: pageCounter,
    per_page: PHOTOS_PER_PAGE,
  };

  const photos = await getPhotosList(fetchOptions);

  addPhotosToGallery(photos.list);
  updateLightBox();
  scrollWindow();
  pageCounter++;
}

function checkLightBoxEnd() {
  const currentPage = document.querySelector('.sl-current');
  const total = document.querySelector('.sl-total');
  console.log(currentPage.textContent, total.textContent);
  if (currentPage.textContent === total.textContent) {
    lightbox.on('closed.simplelightbox', () => {
      loadMorePhotos();
    });
  }
}

function updateLightBox() {
  lightbox.refresh();
  lightbox.on('nextDone.simplelightbox', checkLightBoxEnd);
}

const onclickSearchBtn = async e => {
  e.preventDefault();
  pageCounter = 1;
  const fetchOptions = {
    name: refs.input.value,
    page: pageCounter,
    per_page: PHOTOS_PER_PAGE,
  };

  clearGallery();

  const photos = await getPhotosList(fetchOptions);
  if (isEmpty(photos.total)) {
    messages.searchFailure();
    return;
  }

  messages.numberOfResults(photos.total);
  setMaxPage(photos.total);
  addPhotosToGallery(photos.list);
  pageCounter += 1;
  createTriggerDiv();
  addObserverToTriggerDiv();
  updateLightBox();
};

const observerFunc = entries => {
  if (entries[0].intersectionRatio <= 0) return;

  loadMorePhotos();
};

refs.form.addEventListener('submit', onclickSearchBtn);

const intersectionObserver = new IntersectionObserver(observerFunc);

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const onClickImg = e => {
  if (e.target.nodeName !== 'img') {
    e.preventDefault();
  }
};

refs.gallery.addEventListener('click', onClickImg);
