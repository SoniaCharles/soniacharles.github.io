// ==== SMOOTH SCROLLING FOR ANCHOR LINKS ====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        const targetId = this.getAttribute("href");
        // Only apply smooth scroll to same-page anchors
        if (targetId !== "#" && targetId.startsWith("#")) {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        }
    });
});

// ==== REVEAL ELEMENTS ON SCROLL ====
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const triggerPoint = window.innerHeight * 0.85;
    
    revealElements.forEach(element => {
        const top = element.getBoundingClientRect().top;
        if (top < triggerPoint) {
            element.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// ==== HIGHLIGHT ACTIVE NAVIGATION LINK ====
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("nav a");

function highlightNav() {
    let current = "";
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute("id");
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        
        // Check if it's a hash link and matches current section
        if (href && href.startsWith("#") && href === `#${current}`) {
            link.classList.add("active");
        }
    });
}

window.addEventListener("scroll", highlightNav);
window.addEventListener("load", highlightNav);

// ==== THEME TOGGLE (Optional - only if element exists) ====
const toggle = document.getElementById("themeToggle");

if (toggle) {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        toggle.textContent = "☀️ Light Mode";
    }
    
    toggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");
        
        toggle.textContent = isDark ? "☀️ Light Mode" : "🌙 Dark Mode";
        
        // Save preference
        localStorage.setItem("theme", isDark ? "dark" : "light");
    });
}
