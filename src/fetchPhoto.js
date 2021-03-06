export default async function fetchPhoto({ name, page, per_page }) {
  const options = new URLSearchParams({
    key: '25200959-586511bb06bd2df2dfd3be190',
    q: name,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page,
    page,
  });

  const photo = await fetch(`https://pixabay.com/api/?${options}`);
  return photo;
}
