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
const section = document.querySelector('section')
const navbar = document.getElementById("navbar__list");
const navItems = document.getElementsByClassName("menu__link");

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
  
const isSectionInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.top <=
     0.4 * (window.innerHeight || document.documentElement.clientHeight)
  )
}
    
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
  if (isSectionInViewport(link)) {
    for (const section of sections) {
      section.classList.remove('your-active-class')
    }
    for (const navItem of navItems) {
      navItem.classList.remove('active')
    }
    const selectedSection = document.getElementById(id.slice(1))
    const selectedLink = document.querySelector(`a[href="${id}"]`);
    selectedSection.classList.add('your-active-class')
    selectedLink.classList.add('active')
  }
}

// Scroll to anchor ID using scrollTO event
// Subtract 70 from location to see top of section in view
const scrollToSection = (id) => {
  const location = document.querySelector(`${id}`).offsetTop;
  window.scrollTo({
    top: location - 70,
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

window.onscroll = () => {
  for (const section of sections) {
    isSectionInViewport(section) ? section.classList.add('your-active-class') : section.classList.remove('your-active-class') 
  }
}
    
