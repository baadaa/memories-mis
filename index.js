import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import GLightbox from './js/glightbox';
import { shuffle } from './js/shuffle';

import {
  testShots,
  studioShots,
  weddingDay,
  roadTrip,
  processTags,
  processResponsiveTags,
} from './js/photoSections';

window.addEventListener('load', () => {
  const grid = document.querySelector('.grid');

  const sectionSetting = {
    studioShots: {
      category: 'studioShots',
      titleH2: 'Studio shoot',
      innerTag: testShots,
    },
    weddingDay: {
      category: 'weddingDay',
      titleH2: 'Wedding day',
      innerTag: weddingDay,
    },
    roadTrip: {
      category: 'roadTrip',
      titleH2: 'Road trip',
      innerTag: roadTrip,
    },
  };

  const initMasonry = gridArea => {
    gridArea.style.opacity = 0;
    document.body.style.height = '100vh';
    document.body.style.overflow = 'hidden';
    imagesLoaded(gridArea, function() {
      gridArea.style.opacity = 1;
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
      // init Isotope after all images have loaded
      return new Masonry(gridArea, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
      });
    });
  };

  const getSectionTags = (section = studioShots) =>
    shuffle([...section]).reduce(
      (acc, item) => acc + processResponsiveTags(item),
      '<div class="grid-sizer"></div>'
    );
  const initGLightbox = () =>
    GLightbox({
      selector: 'glightbox',
      touchNavigation: true,
    });

  const menuToggle = () => {
    document.querySelector('.menu-toggle').classList.toggle('active');
  };

  const initiateGridAndLightbox = () => {
    initGLightbox();
    initMasonry(grid);
  };

  const switchSection = (category, titleH2, innerTag) => {
    document.querySelector('.currently_showing').innerHTML = titleH2;
    grid.innerHTML = getSectionTags(innerTag);
    initiateGridAndLightbox();
  };
  // const handleSwitch = e => {
  //   if (currentSection === 'Studio shoot') {
  //     currentSection = 'Wedding day';
  //     grid.innerHTML = getSectionTags(weddingDay);
  //   } else {
  //     currentSection = 'Studio shoot';
  //     grid.innerHTML = getSectionTags(studioShots);
  //   }
  //   sectionTitle.innerHTML = currentSection;
  //   window.scroll({
  //     top: 0,
  //     behavior: 'smooth',
  //   });
  //   initiateGridAndLightbox();
  // };

  grid.innerHTML = getSectionTags();

  const sectionHandler = e => {
    const targetSection = e.target.className;
    const { category, titleH2, innerTag } = sectionSetting[targetSection];
    menuToggle();
    switchSection(category, titleH2, innerTag);
  };
  const initBinding = () => {
    document.querySelector('.menu-btn').addEventListener('click', menuToggle);
    document
      .querySelectorAll('.menu-toggle ul li')
      .forEach(li => li.addEventListener('click', sectionHandler));
  };

  initBinding();
  initiateGridAndLightbox();
});
