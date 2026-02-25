// Femme Fatale Fest 2025 - Main JS
// Mobile nav, FAQ accordion, scroll reveal, smooth scroll

// Mobile Navigation Toggle
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");

navToggle.addEventListener("click", () => {
    navToggle.classList.toggle("active");
    navMenu.classList.toggle("open");

    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", !expanded);
});




// FAQ Accordion
document.querySelectorAll(".faq-question").forEach(button => {
    button.addEventListener("click", () => {
        const expanded = button.getAttribute("aria-expanded") === "true";

        button.setAttribute("aria-expanded", !expanded);

        const answer = button.nextElementSibling;

        if (!expanded) {
            answer.style.maxHeight = answer.scrollHeight + "px";
        } else {
            answer.style.maxHeight = null;
        }
    });
});


// Stats Count-Up Animation
function animateCountUp(el, target, duration = 1200) {
    let start = 0;
    let startTime = null;
    const isMoney = el.textContent.trim().startsWith('$');
    const isPlus = el.textContent.trim().endsWith('+');
    const cleanTarget = parseInt(target.replace(/[^\d]/g, ''));
    function step(ts) {
        if (!startTime) startTime = ts;
        const progress = Math.min((ts - startTime) / duration, 1);
        const value = Math.floor(progress * cleanTarget);
        el.textContent =
            (isMoney ? '$' : '') +
            value.toLocaleString() +
            (isPlus ? '+' : '');
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target;
        }
    }
    requestAnimationFrame(step);
}
const statEls = document.querySelectorAll('.stat-number');
if (statEls.length) {
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                animateCountUp(el, el.getAttribute('data-count') || el.textContent.trim());
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statEls.forEach(el => {
        statsObserver.observe(el);
    });
}

// Scroll Reveal Animation
const revealEls = document.querySelectorAll('.scroll-reveal');
const revealOptions = {
    threshold: 0.15
};
const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
        }
    });
}, revealOptions);
revealEls.forEach(el => {
    revealOnScroll.observe(el);
});

// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href').slice(1);
        const target = document.getElementById(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Optionally update URL hash
            history.replaceState(null, '', '#' + targetId);
        }
    });
});

const header = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        header.style.background = "rgba(10,10,10,0.95)";
        header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.4)";
    } else {
        header.style.background = "rgba(10,10,10,0.85)";
        header.style.boxShadow = "none";
    }
});

