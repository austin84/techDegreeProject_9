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

// dropdown
// Hamburger

const dropBtn = document.querySelector('.drop-btn');
const dropDown = document.querySelector('.dropdown-content');
let menuOpen = false;
let dropdownShown = false;
dropBtn.addEventListener('click', (e) => {
  if (!menuOpen && !dropdownShown) {
    dropBtn.classList.add('open');
    dropDown.classList.add('show');
    menuOpen = true;
    dropdownShown = true;
  } else {
    dropBtn.classList.remove('open');
    dropDown.classList.remove('show');
    menuOpen = false;
    dropdownShown = false;
  }
});

// close dropdown on clickoff
window.onclick = function (event) {
  if (!event.target.matches('.drop-btn')) {
    var dropdowns = document.getElementsByClassName('dropdown-content');
    for (let i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
    const opens = document.getElementsByClassName('open');
    if (opens.length > 0) {
      for (let i = 0; i < opens.length; i++) {
        opens[i].classList.toggle('open');
      }
    }
  }
};

// ! ////
// Modal Display

MicroModal.init({
  onShow: (modal) => console.info(`${modal.id} is shown`), // [1]
  onClose: (modal) => console.info(`${modal.id} is hidden`), // [2]
  openTrigger: 'data-custom-open', // [3]
  closeTrigger: 'data-custom-close', // [4]
  openClass: 'is-open', // [5]
  disableScroll: true, // [6]
  disableFocus: false, // [7]
  awaitOpenAnimation: true, // [8]
  awaitCloseAnimation: true, // [9]
  debugMode: false, // [10]
});

for (let i = 0; i < 6; i++) {
  const port = document.querySelector(`.port-${i + 1}`);
  port.addEventListener('click', (e) => {
    MicroModal.show(`modal-${i + 1}`);
  });
}
