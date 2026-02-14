// ============================================
// LETTER GLITCH EFFECT
// ============================================
const { useRef, useEffect } = React;

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  glitchSpeed = 50,
  centerVignette = false,
  outerVignette = true,
  smooth = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const letters = useRef([]);
  const grid = useRef({ columns: 0, rows: 0 });
  const context = useRef(null);
  const lastGlitchTime = useRef(Date.now());

  const lettersAndSymbols = Array.from(characters);

  const fontSize = 16;
  const charWidth = 10;
  const charHeight = 20;

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const hexToRgb = hex => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16)
        }
      : null;
  };

  const interpolateColor = (start, end, factor) => {
    const result = {
      r: Math.round(start.r + (end.r - start.r) * factor),
      g: Math.round(start.g + (end.g - start.g) * factor),
      b: Math.round(start.b + (end.b - start.b) * factor)
    };
    return `rgb(${result.r}, ${result.g}, ${result.b})`;
  };

  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows };
  };

  const initializeLetters = (columns, rows) => {
    grid.current = { columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
      targetColor: getRandomColor(),
      colorProgress: 1
    }));
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);

    drawLetters();
  };

  const drawLetters = () => {
    if (!context.current || letters.current.length === 0) return;
    const ctx = context.current;
    const { width, height } = canvasRef.current.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    letters.current.forEach((letter, index) => {
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    });
  };

  const updateLetters = () => {
    if (!letters.current || letters.current.length === 0) return;

    const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      if (!letters.current[index]) continue;

      letters.current[index].char = getRandomChar();
      letters.current[index].targetColor = getRandomColor();

      if (!smooth) {
        letters.current[index].color = letters.current[index].targetColor;
        letters.current[index].colorProgress = 1;
      } else {
        letters.current[index].colorProgress = 0;
      }
    }
  };

  const handleSmoothTransitions = () => {
    let needsRedraw = false;
    letters.current.forEach(letter => {
      if (letter.colorProgress < 1) {
        letter.colorProgress += 0.05;
        if (letter.colorProgress > 1) letter.colorProgress = 1;

        const startRgb = hexToRgb(letter.color);
        const endRgb = hexToRgb(letter.targetColor);
        if (startRgb && endRgb) {
          letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
          needsRedraw = true;
        }
      }
    });

    if (needsRedraw) {
      drawLetters();
    }
  };

  const animate = () => {
    const now = Date.now();
    if (now - lastGlitchTime.current >= glitchSpeed) {
      updateLetters();
      drawLetters();
      lastGlitchTime.current = now;
    }

    if (smooth) {
      handleSmoothTransitions();
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext('2d');
    resizeCanvas();
    animate();

    let resizeTimeout;

    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current);
        resizeCanvas();
        animate();
      }, 100);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [glitchSpeed, smooth]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    overflow: 'hidden'
  };

  const canvasStyle = {
    display: 'block',
    width: '100%',
    height: '100%'
  };

  const outerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)'
  };

  const centerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'
  };

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  );
};

const glitchRoot = document.getElementById('glitch-root');
if (glitchRoot && typeof ReactDOM !== 'undefined') {
  const root = ReactDOM.createRoot(glitchRoot);
  root.render(
    <LetterGlitch
      glitchSpeed={60}
      centerVignette={true}
      outerVignette={false}
    />
  );
}

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