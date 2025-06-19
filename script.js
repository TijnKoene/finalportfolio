const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-list a");
const indicator = document.getElementById("nav-indicator");
const line = document.querySelector(".nav-line");
const scrollIcon = document.querySelector('.scroll_icon');
// Scroll Icon
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        scrollIcon.style.opacity = '0';
        scrollIcon.style.pointerEvents = 'none';
    } else {
        scrollIcon.style.opacity = '0.6';
        scrollIcon.style.pointerEvents = 'auto';
    }
});
// NavBar
function updateActiveNav() {
    let scrollY = window.scrollY + window.innerHeight / 2;

    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
//check midden van t scherm
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

// caroucel
window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav);

const images = document.querySelectorAll(".carousel-image");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

let currentIndex = 0;

function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle("active", i === index);
    });
}

prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    showImage(currentIndex);
});

nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    showImage(currentIndex);
});

