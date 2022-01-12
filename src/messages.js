import { Notify } from 'notiflix';

export default class Messages {
  numberOfResults(total) {
    Notify.info(`Hooray! We found ${total} images.`);
  }

  searchFailure() {
    Notify.failure('Sorry, there are no images matching your search query. Please try again.');
  }

  galleryEnd() {
    Notify.warning("We're sorry, but you've reached the end of search results.");
  }
}
