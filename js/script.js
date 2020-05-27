// Initialize lax plugin
window.onload = function () {
  lax.setup({
    breakpoints: { small: 0, large: 924 },
  }); // init

  const updateLax = () => {
    lax.update(window.scrollY);
    window.requestAnimationFrame(updateLax);
  };

  window.requestAnimationFrame(updateLax);
};

// Hamburger

const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', (e) => {
  if (!menuOpen) {
    menuBtn.classList.add('open');
    menuOpen = true;
  } else {
    menuBtn.classList.remove('open');
    menuOpen = false;
  }
});

// !  Working on LAX sliding the portfolio!!!!

/**
 *
 * @param {element} target - landing for smoothscroll event
 * @param {*} duration - length of time for smoothscroll event
 * Causes smooth scroll from top of page to the about section
 */

function smoothScroll(target, duration) {
  const end = document.querySelector(target);
  const endPosition = end.getBoundingClientRect().top;
  const startPosition = window.pageYOffset;
  const distance = endPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime == null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

const arrow = document.querySelector('#arrow');

arrow.addEventListener('click', (e) => {
  smoothScroll('.about', 1400);
});
