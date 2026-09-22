'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}



// theme toggle (dark / light) variables
const rootEl = document.documentElement;
const themeToggleBtn = document.querySelector("[data-theme-toggle]");
const themeIcon = document.querySelector("[data-theme-icon]");

const applyTheme = function (theme) {
  if (theme === "light") {
    rootEl.setAttribute("data-theme", "light");
    themeIcon.setAttribute("name", "moon-outline");
  } else {
    rootEl.removeAttribute("data-theme");
    themeIcon.setAttribute("name", "sunny-outline");
  }
}

// apply saved theme, falling back to the visitor's system preference
const storedTheme = localStorage.getItem("portfolio-theme");
const prefersLight = window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
applyTheme(storedTheme || (prefersLight ? "light" : "dark"));

themeToggleBtn.addEventListener("click", function () {
  const isLight = rootEl.getAttribute("data-theme") === "light";
  const nextTheme = isLight ? "dark" : "light";
  applyTheme(nextTheme);
  localStorage.setItem("portfolio-theme", nextTheme);
});



// timeline: click any heading (Education, Experience, Research, Leadership,
// Achievements) for a small "pop" highlight animation
const timelineTitles = document.querySelectorAll(".timeline-item-title");

for (let i = 0; i < timelineTitles.length; i++) {
  const triggerPop = function () {
    const item = this.closest(".timeline-item");

    item.classList.remove("pop");
    this.classList.remove("pop-text");
    void item.offsetWidth; // restart animation on repeat clicks

    item.classList.add("pop");
    this.classList.add("pop-text");
  };

  timelineTitles[i].addEventListener("click", triggerPop);
  timelineTitles[i].addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      triggerPop.call(this);
    }
  });
}



// skills: mirror-shine sweep on tap/click (hover handles desktop cursor via CSS)
const skillTags = document.querySelectorAll(".tag");

for (let i = 0; i < skillTags.length; i++) {
  skillTags[i].addEventListener("click", function () {
    this.classList.remove("shine");
    void this.offsetWidth; // restart animation on repeat clicks
    this.classList.add("shine");
  });
}