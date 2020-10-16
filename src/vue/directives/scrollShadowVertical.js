import throttle from 'lodash/throttle';

// this value is wrapper padding that prevents content shadowing
const WRAPPER_PADDING_TOP = 2;
const WRAPPER_PADDING_BOTTOM = 5;

function scrollStyling(e) {
  const target = e.target ? e.target : e;
  const { parentNode } = target;
  const isBottomShadowNeeded = target.scrollTop
    >= target.scrollHeight - target.offsetHeight - WRAPPER_PADDING_BOTTOM;
  const isTopShadowNeeded = target.scrollTop > WRAPPER_PADDING_TOP;

  // eslint-disable-next-line
  isBottomShadowNeeded
    ? parentNode.classList.remove('app__scroll-shadow-vertical-bottom')
    : parentNode.classList.add('app__scroll-shadow-vertical-bottom');
  // eslint-disable-next-line
  isTopShadowNeeded
    ? parentNode.classList.add('app__scroll-shadow-vertical-top')
    : parentNode.classList.remove('app__scroll-shadow-vertical-top');
}

export const tableScrollShadow = (() => {
  let scrollHandler = null;
  let resizeHandler = null;

  return {
    bind(el) {
      scrollHandler = throttle(scrollStyling, 10);
      resizeHandler = throttle(scrollStyling.bind(null, el), 200);

      el.addEventListener('scroll', scrollHandler);
      window.addEventListener('resize', resizeHandler);
    },
    inserted(el) {
      scrollStyling(el);
    },
    unbind(el) {
      el.removeEventListener('scroll', scrollHandler);
      window.removeEventListener('resize', resizeHandler);
    },
  };
})();
