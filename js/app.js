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
  
const isSectionInViewport = (el) => {
  const view = el.getBoundingClientRect();
  return (
    view.top >= 0 &&
    view.top <=
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

// Add class 'active' to navbar item when section is in viewport
// used space between elements to determine section in view
const addActiveClass = () => {
  for (const section of sections) {
    // Subtract 250 so section and nav highlight at same time
    const elPosition = section.offsetTop - 250;
    const nextElPosition = section.nextElementSibling ? section.nextElementSibling.offsetTop -250 : null;
    if ( elPosition < window.scrollY && (!section.nextElementSibling || (section.nextElementSibling && nextElPosition > window.scrollY))) {

      // Add active to nav
      if (!document.querySelector(`[href="#${section.id}"`).classList.contains('active')) {
        document.querySelector(`[href="#${section.id}"`).classList.add('active');
      }
    } else {
      section.classList.remove('active');
      document.querySelector(`[href="#${section.id}"`).classList.remove('active');
    }
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
    scrollToSection(id)
  });
}

// Set sections as active
window.onscroll = () => {
  addActiveClass()
  // Highlight section in view
  for (const section of sections) {
    isSectionInViewport(section) ? section.classList.add('your-active-class') : section.classList.remove('your-active-class') 
  }
}
    
