import Masonry from 'masonry-layout';
import imagesLoaded from 'imagesloaded';
import GLightbox from './js/glightbox';

import {
  studioShots,
  weddingDay,
  roadTrip,
  processResponsiveTags,
} from './js/photoSections';

window.addEventListener('load', () => {
  const grid = document.querySelector('.grid');

  const sectionSetting = {
    studioShots: {
      titleH2: 'Studio shoot',
      innerTag: studioShots.reverse(),
    },
    weddingDay: {
      titleH2: 'Wedding day',
      innerTag: weddingDay.reverse(),
    },
    roadTrip: {
      titleH2: 'Road trip',
      innerTag: roadTrip.reverse(),
    },
  };

  const initMasonry = gridArea => {
    const hideGrid = () => {
      gridArea.style.opacity = 0;
      document.body.style.height = '100vh';
      document.body.style.overflow = 'hidden';
    };
    const showGrid = () => {
      gridArea.style.opacity = 1;
      document.body.style.height = 'auto';
      document.body.style.overflow = 'auto';
    };
    hideGrid();
    imagesLoaded(gridArea, function() {
      showGrid();
      return new Masonry(gridArea, {
        itemSelector: '.grid-item',
        columnWidth: '.grid-sizer',
        percentPosition: true,
      });
    });
  };

  const getSectionTags = (section = studioShots) =>
    section.reduce(
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

  const switchSection = (titleH2, innerTag) => {
    document.querySelector('.currently_showing').innerHTML = titleH2;
    grid.innerHTML = getSectionTags(innerTag);
    initiateGridAndLightbox();
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const sectionHandler = e => {
    const targetSection = e.target.className;
    const { titleH2, innerTag } = sectionSetting[targetSection];
    menuToggle();
    switchSection(titleH2, innerTag);
  };
  const initBinding = () => {
    document.querySelector('.menu-btn').addEventListener('click', menuToggle);
    document
      .querySelectorAll('.menu-toggle ul li')
      .forEach(li => li.addEventListener('click', sectionHandler));
  };

  grid.innerHTML = getSectionTags(studioShots);
  initBinding();
  initiateGridAndLightbox();
});
