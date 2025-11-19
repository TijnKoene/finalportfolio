const sections = document.querySelectorAll("section"); // pak al de secties van de pagina
const navLinks = document.querySelectorAll(".nav-list a"); // pak al de links in de navbar
const indicator = document.getElementById("nav-indicator"); // de bol die laat zien welke sectie actief is
const scrollIcon = document.querySelector('.scroll_icon'); // scroll-pijl onderaan

// Scroll Icon
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        scrollIcon.style.opacity = '0'; // verdwijnt wanneer je verder scrollt
        scrollIcon.style.pointerEvents = 'none';
    } else {
        scrollIcon.style.opacity = '0.6'; // je ziet hem weer als je bovenaan bent
        scrollIcon.style.pointerEvents = 'auto';
    }
});

// NavBar update
function updateActiveNav() {
    let scrollY = window.scrollY + window.innerHeight / 2;
    sections.forEach((section, index) => {
        const top = section.offsetTop;
        const bottom = top + section.offsetHeight;
        if (scrollY >= top && scrollY < bottom) { // check welke sectie in beeld is
            navLinks.forEach(link => link.classList.remove("active")); // reset alle links
            navLinks[index].classList.add("active"); // activeer de juiste link

            const navItem = navLinks[index];
            const offset = navItem.offsetTop; // positie van indicator
            indicator.style.top = `${offset}px`; // verplaats de bol
        }
    });
}

window.addEventListener("scroll", updateActiveNav);
window.addEventListener("load", updateActiveNav); // bij laden van pagina meteen updaten

// Carousel
const images = document.querySelectorAll(".carousel-image"); // alle carousel afbeeldingen
const prevBtn = document.getElementById("prev"); // vorige knop
const nextBtn = document.getElementById("next"); // volgende knop

let currentIndex = 0;
function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle("active", i === index); // zet de juiste afbeelding actief
    });
}
prevBtn.addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length; // terug knop
    showImage(currentIndex);
});
nextBtn.addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length; // vooruit knop
    showImage(currentIndex);
});

// Modals voor projecten
const modalContainer = document.querySelector(".modal_container");
const modalTitle = document.getElementById("modal-title");
const modalText = document.getElementById("modal-text");
const modalImages = document.getElementById("modal-images");
const closeBtn = document.getElementById("close");

// popup data laden
fetch("popups.json")
    .then(res => res.json())
    .then(popupData => {
        document.querySelectorAll(".open-modal").forEach(button => {
            button.addEventListener("click", () => {
                const popup = popupData.find(p => p.id === button.dataset.id); // match project
                if (popup) openModal(popup); // open modal
            });
        });
    })
    .catch(err => console.error("Fout bij laden van popups:", err));

function openModal(popup) {
    modalTitle.textContent = popup.title; // titel
    modalText.innerHTML = popup.text; // tekst
    modalImages.innerHTML = popup.images
        .map(src => `<img src="${src}" alt="${popup.title}">`) // afbeeldingen
        .join("");
    modalContainer.classList.add("show"); // laat modal zien
}
closeBtn.addEventListener("click", () => {
    modalContainer.classList.remove("show"); // sluit modal
});

// ---------------------------------- Animaties ---------------------------------- //
gsap.registerPlugin(ScrollTrigger); // activeer ScrollTrigger plugin

function generateStars(count, spread) {
    let shadows = [];
    for (let i = 0; i < count; i++) {
        const x = Math.random() * spread;  // random horizontale positie
        const y = Math.random() * window.innerHeight; // random verticale positie
        shadows.push(`${x}px ${y}px #FFF`); // voeg ster toe
    }
    return shadows.join(", ");
}

// Kleine sterren
const stars = document.getElementById("stars");
stars.style.width = "1px";
stars.style.height = "1px";
stars.style.boxShadow = generateStars(700, window.innerWidth*2); // aantal en spreiding

// Gemiddelde sterren
const stars2 = document.getElementById("stars2");
stars2.style.width = "2px";
stars2.style.height = "2px";
stars2.style.boxShadow = generateStars(200, window.innerWidth*2);

// Grote sterren
const stars3 = document.getElementById("stars3");
stars3.style.width = "3px";
stars3.style.height = "3px";
stars3.style.boxShadow = generateStars(100, window.innerWidth*2);

// ScrollTrigger animatie met parallax effect
gsap.to(stars, {
    x: 600,   // snelle sterren bewegen het meest
    ease: "none",
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8
    }
});

gsap.to(stars2, {
    x: 350,   // gemiddeld
    ease: "none",
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8
    }
});

gsap.to(stars3, {
    x: 150,   // langzaamste
    ease: "none",
    scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.8
    }
});

// GSAP TOP ANIMATIES
gsap.from(".top-content ", {
    opacity: 0,
    y: 200,
    duration: 2,
    ease: "power2.out"
});
gsap.from(".vertical-nav ", {
    opacity: 0,
    x: 250,
    duration: 2,
    ease: "power2.out"
});

// GSAP About me ANIMATIES
gsap.from(".about-text", {
    scrollTrigger: {
        trigger: ".about-text",
        start: "top 85%",
        end: "top 60%",
        scrub: 1,
    },
    opacity: 0,
    y: 150,
    duration: 1.8,
    ease: "power3.out"
});

gsap.from(".carousel-container", {
    scrollTrigger: {
        trigger: ".carousel-container",
        start: "top 85%",
        end: "top 60%",
        scrub: 1,
    },
    opacity: 0,
    x: 200,
    duration: 1.8,
    ease: "power3.out"
});


// Projecten
gsap.fromTo(".titel-animatie",
    {
        opacity: 0,
        y: -120,
        scale: 0.9,
        filter: "blur(10px)"
    },
    {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".titel-animatie",
            start: "bottom 100%",
            end: "bottom 80%",
            scrub: 0.6,
        }
    }
);

//rij1
gsap.from(".rij1", {
    scrollTrigger: {
        trigger: ".rij1",
        start: "bottom 100%",
        end: "bottom 80%",
        scrub: 0.6,
    },
    opacity: 0,
    x: -1000,
    y: 100,
    scale: 0.9,
    duration: 2.5,
    ease: "back.out(0.8)",
    stagger: 0.1
});

gsap.from(".project-image1", {
    scrollTrigger: {
        trigger: ".project-image1",
        start: "bottom 100%",
        end: "bottom 80%",
        scrub: 0.6,
    },
    opacity: 0,
    x: -550,
    rotation: -5,
    scale: 0.8,
    duration: 2.8,
    ease: "expo.out"
});

//rij2
gsap.from(".rij2", {
    scrollTrigger: {
        trigger: ".rij2",
        start: "bottom 90%",
        end: "bottom 75%",
        scrub: 0.6,
    },
    opacity: 0,
    x: 1000,
    rotation: -5,
    scale: 0.8,
    duration: 2.8,
    ease: "expo.out"
});

gsap.from(".project-image2", {
    scrollTrigger: {
        trigger: ".project-image2",
        start: "bottom 100%",
        end: "bottom 80%",
        scrub: 0.6,
    },
    opacity: 0,
    x: 550,
    rotation: -5,
    scale: 0.8,
    duration: 2.8,
    ease: "expo.out"
});

//rij3
gsap.from(".rij3", {
    scrollTrigger: {
        trigger: ".rij3",
        start: "bottom 100%",
        end: "bottom 80%",
        scrub: 0.6,
    },
    opacity: 0,
    x: -1000,
    y: 100,
    scale: 0.9,
    duration: 2.5,
    ease: "back.out(0.8)",
    stagger: 0.1
});

gsap.from(".project-image3", {
    scrollTrigger: {
        trigger: ".project-image3",
        start: "bottom 100%",
        end: "bottom 80%",
        scrub: 0.6,
    },
    opacity: 0,
    x: -550,
    rotation: -5,
    scale: 0.8,
    duration: 2.8,
    ease: "expo.out"
});

// SKILLS
gsap.utils.toArray('.progress-fill').forEach(fill => {
    gsap.to(fill, {
        width: fill.style.getPropertyValue('--target'), // animatie van balk
        duration: 1.5,
        ease: "power3.out",
        delay: 0.3
    });
});

// Subtiele floating animatie op iconen
gsap.utils.toArray('.icon-circle').forEach(icon => {
    gsap.to(icon, {
        y: "+=" + gsap.utils.random(-10, 10), // zweef op en neer
        x: "+=" + gsap.utils.random(-5, 5),   // beetje zijdelings
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        duration: gsap.utils.random(2, 4)
    });
});

// Animaties voor Skills-sectie
gsap.utils.toArray('.skill').forEach((skill, i) => {
    gsap.from(skill, {
        scrollTrigger: {
            trigger: skill,
            start: "top 90%",   // start wanneer skill bijna in beeld is
            end: "top 70%",     // eindpunt van de animatie
            scrub: 0.8,
        },
        opacity: 0,
        y: 50,
        scale: 0.9,
        duration: 1.5,
        ease: "power2.out"
    });
});
gsap.utils.toArray('.progress-fill').forEach((fill) => {
    gsap.to(fill, {
        scrollTrigger: {
            trigger: fill.closest('.skills-wrapper'),
            start: "top 90%",
            end: "bottom 60%",
            scrub: 1
        },
        width: fill.style.getPropertyValue('--target'),
        ease: "power3.out"
    });
});
