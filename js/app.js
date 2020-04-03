/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const sections = document.querySelectorAll("section");
const navbar = document.getElementById("navbar__list");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const createNavLi = (sectionId, navLabel) => {
  const newLi = document.createElement("li");
  newLi.innerHTML = 
    `<a href="#${sectionId}" class="menu__link">
      ${navLabel}
    </a>`;
  return navbar.appendChild(newLi);
}

//Is Section in View - logic from https://vanillajstoolkit.com/helpers/isinviewport/
const isInViewport = (el) => {
  let distance = el.getBoundingClientRect();
	return (
		distance.top >= 0 &&
		distance.left >= 0 &&
		distance.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
		distance.right <= (window.innerWidth || document.documentElement.clientWidth)
	);
};

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = () => {
  for (const section of sections) {
    const sectionId = section.getAttribute("id");
    const navLabel = section.getAttribute("data-nav");
    createNavLi(sectionId, navLabel);
  }
}

// Add class 'active' to section when near top of viewport
const addActiveClass = (link, id) => {
  if (isInViewport(link)) {
    for (const section of sections) {
      section.classList.remove('your-active-class')
    }
    const selectedSection = document.getElementById(id.slice(1))
    selectedSection.classList.add('your-active-class')
  }
}

// Scroll to anchor ID using scrollTO event
const scrollToSection = (id) => {
  const location = document.querySelector(`${id}`).offsetTop;
  window.scrollTo({
    top: location,
    left: 0,
    behavior: 'smooth'
  });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
buildNav();

// Scroll to section on link click
for (link of document.querySelectorAll('.menu__link')) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const id = e.target.getAttribute('href');
    // Set sections as active
    addActiveClass(link, id);
    scrollToSection(id);
  });
}



