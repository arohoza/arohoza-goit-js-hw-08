// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

// console.log(galleryItems);

import SimpleLightbox from 'simplelightbox';
// Additional styles import

import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

const makeGalleryMarkup = () => {
  const markup = galleryItems
    .map(({ preview, original, description }) => {
      return `
          <a class="gallery__item" href=${original}>
            <img href=${original}
              class="gallery__image"
              src=${preview}
              alt="${description}"
            />
          </a>
        `;
    })
    .join('');
  galleryRef.innerHTML = markup;
};

makeGalleryMarkup(galleryItems);

let gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'Alt',
  captionsDelay: 250,
});
gallery.on('show.simplelightbox', function () {
  //   // do something…
});

// console.log(gallery);
