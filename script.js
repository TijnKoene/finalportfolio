const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-list a");
const indicator = document.getElementById("nav-indicator");
const line = document.querySelector(".nav-line");
const scrollIcon = document.querySelector('.scroll_icon');
// Scroll Icon

//Cookies
let popUp = document.getElementById("cookiePopup");
//When user clicks the accept button
document.getElementById("acceptCookie").addEventListener("click", () => {
    //Create date object
    let d = new Date();
    //Increment the current time by 1 minute (cookie will expire after 1 minute)
    d.setMinutes(2 + d.getMinutes());
    //Create Cookie withname = myCookieName, value = thisIsMyCookie and expiry time=1 minute
    document.cookie = "myCookieName=thisIsMyCookie; expires = " + d + ";";
    //Hide the popup
    popUp.classList.add("hide");
    popUp.classList.remove("show");
});
//Check if cookie is already present
const checkCookie = () => {
    //Read the cookie and split on "="
    let input = document.cookie.split("=");
    //Check for our cookie
    if (input[0] == "myCookieName") {
        //Hide the popup
        popUp.classList.add("hide");
        popUp.classList.remove("show");
    } else {
        //Show the popup
        popUp.classList.add("show");
        popUp.classList.remove("hide");
    }
};
//Check if cookie exists when page loads
window.onload = () => {
    setTimeout(() => {
        checkCookie();
    }, 2000);
};
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
// Map each button to its project HTML file
const projectPages = {
    popup1: "project1.html",
    popup2: "project2.html",
    popup3: "project3.html"
};

const popupContainer = document.getElementById("popupContainer");
const popupFrame = document.getElementById("popupFrame");
const closeBtn = document.querySelector(".close-btn");

// Attach click events to each button
document.querySelectorAll(".button-more-info").forEach(button => {
    button.addEventListener("click", () => {
        const projectPage = projectPages[button.id];
        popupFrame.src = projectPage;
        popupContainer.style.display = "flex";
    });
});

// Close popup
closeBtn.addEventListener("click", () => {
    popupContainer.style.display = "none";
    popupFrame.src = ""; // Clear iframe
});

// Close when clicking outside content
window.addEventListener("click", (e) => {
    if (e.target === popupContainer) {
        popupContainer.style.display = "none";
        popupFrame.src = "";
    }
});