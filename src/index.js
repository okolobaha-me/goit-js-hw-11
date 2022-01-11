import fetchPhoto from './fetchPhoto';
import renderGallery from './renderGallery';

const refs = {
  input: document.querySelector('.input'),
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

let counter = 0;

const getPhotos = async () => {
  const response = await fetchPhoto(refs.input.value, counter);
  const photos = await response.json();

  return photos.hits;
};

const onclickSearchBtn = async e => {
  e.preventDefault();

  counter = 1;

  const photos = await getPhotos();
  refs.gallery.innerHTML = renderGallery(photos, counter);
  counter += 1;

  refs.gallery.insertAdjacentHTML('afterend', "<div class='trigger'></div>");

  intersectionObserver.observe(document.querySelector('.trigger'));
};

refs.form.addEventListener('submit', onclickSearchBtn);

const observerFunc = async entries => {
  if (entries[0].intersectionRatio <= 0) return;

  const photos = await getPhotos();
  renderGallery(photos, counter);

  refs.gallery.insertAdjacentHTML('beforeend', renderGallery(photos, counter));
  counter++;
};

const intersectionObserver = new IntersectionObserver(observerFunc);
