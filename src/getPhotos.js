import fetchPhoto from './fetchPhoto';

export default async function getPhotosList(fetchOptions) {
  const response = await fetchPhoto(fetchOptions);
  const photos = await response.json();

  return {
    list: photos.hits,
    total: photos.totalHits,
  };
}

// if (isFirstPage && !photos.totalHits) {
//   Notify.failure('Sorry, there are no images matching your search query. Please try again.');
//   return false;
// }
//
// if (page > maxPage(perPage, photos.totalHits)) {
//   Notify.warning("We're sorry, but you've reached the end of search results.");
//   return false;
// }
//
// if (isFirstPage) {
//   Notify.info(`Hooray! We found ${photos.totalHits} images.`);
//   return {
//     list: photos.hits,
//     maxPage: maxPage(perPage, photos.totalHits),
//   };
// }
