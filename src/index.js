import fetchPhoto from './fetchPhoto';
import renderGallery from './renderGallery';

const refs = {
  input: document.querySelector('.input'),
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
};

const onclickSearchBtn = async e => {
  e.preventDefault();

  const response = await fetchPhoto(refs.input.value);
  const photos = await response.json();

  refs.gallery.innerHTML = renderGallery(photos.hits, counter);
};

refs.form.addEventListener('submit', onclickSearchBtn);
