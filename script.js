const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-list a");
const indicator = document.getElementById("nav-indicator");
const line = document.querySelector(".nav-line");

// Position values will be dynamically calculated
function updateActiveNav() {
    let scrollY = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;

        if (scrollY >= top && scrollY < bottom) {
            navLinks.forEach(link => link.classList.remove("active"));
            navLinks[index].classList.add("active");

            // Move the indicator
            const navItem = navLinks[index];
            const offset = navItem.offsetTop;
            indicator.style.top = `${offset}px`;
        }
    });
}

// Init
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);
