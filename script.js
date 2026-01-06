// ============================================
// SMOOTH SCROLLING & ACTIVE NAV
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// NAVBAR ACTIVE STATE
// ============================================
const navLinks = document.querySelectorAll('.nav-link');

function updateActiveNav() {
    navLinks.forEach(link => {
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                link.style.color = 'var(--primary)';
            } else {
                link.style.color = 'var(--text-secondary)';
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Osserva tutti i project-card e skill-card
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// ============================================
// HAMBURGER MENU
// ============================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
        navMenu.style.position = 'absolute';
        navMenu.style.top = '70px';
        navMenu.style.left = '0';
        navMenu.style.right = '0';
        navMenu.style.flexDirection = 'column';
        navMenu.style.gap = '1rem';
        navMenu.style.padding = '2rem';
        navMenu.style.background = 'rgba(15, 23, 42, 0.95)';
        navMenu.style.backdropFilter = 'blur(10px)';
        navMenu.style.borderBottom = '1px solid var(--border-color)';
    });

    // Chiudi menu quando clicchi su un link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.style.display = 'none';
        });
    });
}

// ============================================
// PARALLAX EFFECT
// ============================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElement = document.querySelector('.stars');
    if (parallaxElement) {
        parallaxElement.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ============================================
// FORM SUBMISSION
// ============================================
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Ottieni i valori del form
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;

        // Crea il link mailto
        const mailtoLink = `mailto:ashif@example.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`)}`;

        // Apri il client email
        window.location.href = mailtoLink;

        // Reset del form
        contactForm.reset();

        // Mostra un messaggio di feedback
        const button = contactForm.querySelector('.btn');
        const originalText = button.textContent;
        button.textContent = 'Messaggio inviato! ✓';
        button.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';

        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 3000);
    });
}

// ============================================
// TYPING EFFECT HERO
// ============================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    let index = 0;

    function typeEffect() {
        if (index < text.length) {
            heroTitle.innerHTML += text.charAt(index);
            index++;
            setTimeout(typeEffect, 50);
        }
    }

    // Avvia il typing effect quando la pagina è carica
    window.addEventListener('load', typeEffect);
}

// ============================================
// SKILL CARDS HOVER EFFECT
// ============================================
const skillCards = document.querySelectorAll('.skill-card');

skillCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        skillCards.forEach(c => {
            if (c !== card) {
                c.style.opacity = '0.5';
                c.style.filter = 'blur(2px)';
            }
        });
    });

    card.addEventListener('mouseleave', () => {
        skillCards.forEach(c => {
            c.style.opacity = '1';
            c.style.filter = 'blur(0)';
        });
    });
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const sections = document.querySelectorAll('section');

const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
});

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    revealOnScroll.observe(section);
});

// ============================================
// COUNTER ANIMATION
// ============================================
const stats = document.querySelectorAll('.stat h3');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.counted) {
            const target = entry.target;
            const finalValue = parseInt(target.textContent);
            const increment = finalValue / 60;
            let current = 0;

            const counter = setInterval(() => {
                current += increment;
                if (current >= finalValue) {
                    target.textContent = finalValue + '+';
                    clearInterval(counter);
                    target.dataset.counted = true;
                } else {
                    target.textContent = Math.floor(current) + '+';
                }
            }, 30);
        }
    });
}, { threshold: 0.5 });

stats.forEach(stat => {
    counterObserver.observe(stat);
});

// ============================================
// NAVBAR HIDE ON SCROLL
// ============================================
let lastScrollPosition = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;

    if (currentScroll <= 0) {
        navbar.style.transform = 'translateY(0)';
    } else if (currentScroll > lastScrollPosition) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollPosition = currentScroll <= 0 ? 0 : currentScroll;
});

navbar.style.transition = 'transform 0.3s ease';

// ============================================
// FLOATING CARDS INTERACTIVE
// ============================================
const floatingCards = document.querySelectorAll('.floating-card');

floatingCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.animation = 'none';
        setTimeout(() => {
            card.style.animation = 'float 3s ease-in-out infinite';
        }, 10);
    });
});

// ============================================
// MOUSE FOLLOW EFFECT ON HERO
// ============================================
const hero = document.querySelector('.hero');

if (hero) {
    hero.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        hero.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
    });
}