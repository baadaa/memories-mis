import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import GLightbox from 'glightbox';
import { studioShots, weddingDay, processTags } from './js/photoSections';

window.addEventListener('load', () => {
  let currentSection = 'Studio Shoot';
  const sectionTitle = document.querySelector('.currently_showing');

  const grid = document.querySelector('.grid');
  const initMasonry = gridArea => {
    imagesLoaded(gridArea, function() {
      // init Isotope after all images have loaded
      return new Masonry(gridArea, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
      });
    });
  };

  const getSectionTags = (section = studioShots) =>
    section.reduce(
      (acc, item) => acc + processTags(item),
      '<div class="grid-sizer"></div>'
    );

  const initGLightbox = () =>
    GLightbox({
      selector: 'glightbox',
      touchNavigation: true,
    });

  const mobileToggle = () => {
    document.querySelector('.menu-toggle').classList.toggle('active');
  };
  const handleSwitch = e => {
    if (currentSection === 'Studio Shoot') {
      currentSection = 'Wedding Day';
      grid.innerHTML = getSectionTags(weddingDay);
    } else {
      currentSection = 'Studio Shoot';
      grid.innerHTML = getSectionTags(studioShots);
    }
    sectionTitle.innerHTML = currentSection;
    window.scroll({
      top: 0,
      behavior: 'smooth',
    });
    initGLightbox();
    initMasonry(grid);
  };

  grid.innerHTML = getSectionTags();

  const initBinding = () => {
    document.querySelector('.menu-btn').addEventListener('click', mobileToggle);
  };
  initBinding();
  initGLightbox();
  initMasonry(grid);
});
