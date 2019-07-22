import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import baquetteBox from 'baguettebox.js';

const grid = document.querySelector('.grid');

imagesLoaded(grid, function() {
  // init Isotope after all images have loaded
  const msnry = new Masonry(grid, {
    itemSelector: '.grid-item',
    columnWidth: '.grid-sizer',
    percentPosition: true,
  });
});
baquetteBox.run('.gallery');

// document.addEventListener('DOMContentLoaded', function() {
//   const imageObserver = new IntersectionObserver((entries, imgObserver) => {
//     entries.forEach(entry => {
//       console.log(entry.target);
//       if (entry.isIntersecting) {
//         const lazyImage = entry.target;
//         lazyImage.src = lazyImage.dataset.src;
//         imgObserver.unobserve(lazyImage);
//       }
//     });
//   });
//   const imageItems = document.querySelectorAll('.grid-item > img');
//   imageItems.forEach(img => imageObserver.observe(img));
// });
