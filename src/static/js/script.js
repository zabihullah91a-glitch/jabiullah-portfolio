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


document.addEventListener("DOMContentLoaded", typingEffect);

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
/* =====================================================
   SCROLL REVEAL ANIMATION
===================================================== */

const revealElements = document.querySelectorAll(
    ".section-heading, .about-text, .about-card, .skill-card, .learning-box, .education-card, .project-card, .achievement-card, .career-card, .hobby-card, .contact-box"
);

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("reveal-show");
                revealObserver.unobserve(entry.target);

            }

        });
    },
    {
        threshold: 0.12
    }
);

revealElements.forEach((element) => {
    element.classList.add("reveal-hidden");
    revealObserver.observe(element);
});
/* =====================================================
   PREMIUM LOADING SCREEN
===================================================== */

window.addEventListener("load", () => {

    const loadingScreen =
        document.getElementById("loadingScreen");

    setTimeout(() => {

        loadingScreen.classList.add("hide");

    }, 2000);

});
/* =====================================================
   BACK TO TOP BUTTON
===================================================== */

const backToTop = document.getElementById("backToTop");

document.addEventListener("DOMContentLoaded", () => {

    const loadingScreen =
        document.getElementById("loadingScreen");

    setTimeout(() => {
        loadingScreen.classList.add("hide");
    }, 1200);

});

if (backToTop) {
    backToTop.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

// INTERACTIVE TERMINAL

const terminalInput = document.getElementById("terminalInput");
const terminalOutput = document.getElementById("terminalOutput");

if (terminalInput && terminalOutput) {

    terminalInput.addEventListener("keydown", (event) => {

        if (event.key !== "Enter") return;

        const command = terminalInput.value
            .trim()
            .toLowerCase();

        if (!command) return;

        const commandLine = document.createElement("p");

        commandLine.innerHTML =
            `<span>jabiullah@portfolio:~$</span> ${command}`;

        terminalOutput.appendChild(commandLine);

        let response = "";

        switch (command) {

            case "help":
                response =
                    "Available commands: about, skills, projects, education, achievements, projects, contact, resume, github, clear";
                break;

            case "about":
                response =
                    "Jabiullah — B.Tech CSE Student & Aspiring Web Developer.";
                break;

            case "skills":
                response =
                    "C, HTML, CSS, JavaScript, Python, Data Structures, Java.";
                break;

            case "projects":
                response =
                    "Personal Portfolio — HTML, CSS, JavaScript, Node.js, Express & EJS.";

                document.getElementById("projects").scrollIntoView({
                    behavior: "smooth"
                });
                break;
            case "education":
                response =
                    "B.Tech CSE — Vidya Vihar Institute of Technology, Purnia.";

                document.getElementById("education").scrollIntoView({
                    behavior: "smooth"
                });

                break;
            case "achievements":
                response =
                    "Web Development Intern — Invigo Infotech.";

                document.getElementById("achievements").scrollIntoView({
                    behavior: "smooth"
                });

                break;
            case "github":
                window.open(
                    "https://github.com/zabihullah91a-glitch/jabiullah-portfolio",
                    "_blank"
                );
                response = "Opening GitHub...";
                break;
            case "resume":
                window.open(
                    "/resume/Jabiullah_Resume.pdf",
                    "_blank"
                );
                response = "Opening resume...";
                break;
            case "contact":
                response =
                    "Email: zabibullah91a@gmail.com";
                break;

            case "clear":
                terminalOutput.innerHTML = "";
                terminalInput.value = "";
                return;

            default:
                response =
                    `Command not found: ${command}. Type "help" for available commands.`;
        }

        const responseLine = document.createElement("p");
        responseLine.textContent = response;

        terminalOutput.appendChild(responseLine);

        terminalInput.value = "";

        terminalOutput.scrollTop =
            terminalOutput.scrollHeight;
    });

}
// HERO TYPING EFFECT
