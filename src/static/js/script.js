// ========================================
// MOBILE MENU
// ========================================

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

        mobileMenu.classList.toggle("active");

    });


    const links = mobileMenu.querySelectorAll("a");

    links.forEach((link) => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("active");

        });

    });

}


// ========================================
// TYPING EFFECT
// ========================================

const typingText =
    document.getElementById("typingText");


const words = [

    "Web Developer",
    "Software Developer",
    "CSE Student",
    "Programmer",
    "Coding Enthusiast"

];


let wordIndex = 0;
let letterIndex = 0;
let deleting = false;


function typingEffect() {

    if (!typingText) {
        return;
    }


    const word = words[wordIndex];


    if (!deleting) {

        letterIndex++;

    } else {

        letterIndex--;

    }


    typingText.textContent =
        word.substring(0, letterIndex);


    if (
        !deleting &&
        letterIndex === word.length
    ) {

        deleting = true;

        setTimeout(
            typingEffect,
            1500
        );

        return;

    }


    if (
        deleting &&
        letterIndex === 0
    ) {

        deleting = false;

        wordIndex++;

        if (wordIndex >= words.length) {

            wordIndex = 0;

        }

    }


    setTimeout(
        typingEffect,
        deleting ? 60 : 100
    );

}


typingEffect();


// ========================================
// HEADER SCROLL
// ========================================

window.addEventListener(
    "scroll",
    () => {

        const header =
            document.querySelector(".header");

        if (!header) {
            return;
        }


        if (window.scrollY > 50) {

            header.style.background =
                "rgba(5, 5, 5, 0.98)";

        } else {

            header.style.background =
                "rgba(5, 5, 5, 0.92)";

        }

    }
);