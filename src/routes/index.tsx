import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from "react";
import manifest from "../../public/manifest.json";
import { Linkedin, Github, Mail } from "lucide-react";
import LetterGlitch from "../components/LetterGlitch";
import "../styles/landing.css";

export const Route = createFileRoute("/")({ component: App });

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const navbarRef = useRef<HTMLElement>(null);

  // Logic from script.js: Typing Effect
  useEffect(() => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && !heroTitle.getAttribute('data-typed')) {
      const text = heroTitle.textContent?.trim() || "Ciao, sono Ashif";
      heroTitle.innerHTML = '';
      heroTitle.setAttribute('data-typed', 'true');
      let index = 0;

      function typeEffect() {
        if (index < text.length) {
          heroTitle!.innerHTML += text.charAt(index);
          index++;
          setTimeout(typeEffect, 50);
        }
      }
      // Small delay to start
      setTimeout(typeEffect, 100);
    }
  }, []);

  // Logic from script.js: Scroll interactions (Navbar, Reveal, Parallax)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Parallax
      const stars = document.querySelector('.stars') as HTMLElement;
      if (stars) {
        stars.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      }

      // Active Nav & Navbar Hide
      const navbar = navbarRef.current;
      if (navbar) {
        if (scrollPosition > lastScrollPosition.current && scrollPosition > 0) {
          navbar.style.transform = 'translateY(-100%)';
        } else {
          navbar.style.transform = 'translateY(0)';
        }
        lastScrollPosition.current = scrollPosition <= 0 ? 0 : scrollPosition;
      }

      updateActiveNav();
    };

    const updateActiveNav = () => {
      document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
          const section = document.querySelector(href) as HTMLElement;
          if (section) {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const scrollPosition = window.scrollY;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
              (link as HTMLElement).style.color = 'var(--primary)';
            } else {
              (link as HTMLElement).style.color = 'var(--text-secondary)';
            }
          }
        }
      });
    }

    let lastScrollPosition = { current: 0 }; // Mutable ref-like object for closure

    window.addEventListener('scroll', handleScroll);

    // Intersection Observer for Animations (Reveal on Scroll)
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          (entry.target as HTMLElement).style.opacity = '1';
          (entry.target as HTMLElement).style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('section, .project-card, .skill-card').forEach(el => {
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = 'opacity 0.8s ease, transform 0.8s ease';
      revealObserver.observe(el);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealObserver.disconnect();
    };
  }, []);

  // Logic from script.js: Mouse Follow on Hero
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        heroRef.current.style.backgroundPosition = `${x * 100}% ${y * 100}%`;
      }
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (hero) hero.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar" ref={navbarRef}>
        <div className="nav-container">
          <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <img src="/Logo/185x185/-1 Circle 185x185.png" alt="Logo" style={{ width: '40px', height: '40px' }} />
            <span className="logo-text">{manifest.short_name}</span>
          </div>
          <ul className="nav-menu" style={{ display: isMenuOpen ? 'flex' : undefined }}>
            <li><a href="#home" class="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a></li>
            <li><a href="#about" class="nav-link" onClick={() => setIsMenuOpen(false)}>Chi Sono</a></li>
            <li><a href="#contact" class="nav-link" onClick={() => setIsMenuOpen(false)}>Contatti</a></li>
            {/* Keeping the external link as is for now */}
            <li><a href="/password_generator.html" class="nav-link" target="_blank">Password Generator</a></li>
          </ul>
          <div className="hamburger" onClick={toggleMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero" ref={heroRef}>
        {/* Background Component */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
          <LetterGlitch glitchSpeed={50} centerVignette={true} outerVignette={false} smooth={true} />
        </div>

        <div className="stars"></div>
        <div className="hero-content">
          <h1 className="hero-title">
            Ciao, sono Ashif
          </h1>
          <p className="hero-subtitle">
            Benvenuto nel mio portfolio!
          </p>
          <p className="hero-description">
            {'{ Edge Developer }'}
          </p>
          <div className="hero-cta">
            <a href="#about" className="btn btn-primary">Cosa faccio?</a>
            <a href="#contact" className="btn btn-secondary">Contattami</a>
          </div>
        </div>
        <div className="scroll-indicator">
          <span></span>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <h2 className="section-title">Chi Sono</h2>
          <div className="about-content">
            <div className="about-text">
              <p className="about-intro">
                Sono uno appassionato di informatica e in generale tutto quello che riguarda in mondo della tecnologia.
              </p>
              <p>
                Ogni giorno cerco di imparare qualcosa di nuovo a migliorare le mie conoscenze.
              </p>
              <p>
                Attualmente lavoro in Front-Desk di un Hotel e frequento il Corso "<a href="https://www.itsprodigi.it/corsi/edge-developer/" target="_blank" rel="noreferrer">Edge Developer</a>"&nbsp; presso ITS Prodigi.
              </p>

              <p>
                Se vuoi sapere di più su cosa sto studiando, <a href="Programma EDGE DEVELOPER.pdf" target="_blank" rel="noreferrer">qui trovi il programma completo</a>.
              </p>
            </div>

            <div className="about-image">
              <div className="floating-card" style={{ '--delay': '0s' } as React.CSSProperties}>
                <div className="card-content">📱</div>
              </div>

              <div className="floating-card" style={{ '--delay': '1s' } as React.CSSProperties}>
                <div className="card-content"> &lt;/&gt; </div>
              </div>

              <div className="floating-card" style={{ '--delay': '2s' } as React.CSSProperties}>
                <div className="card-content"> {'{ }'} </div>
              </div>

              <div className="floating-card" style={{ '--delay': '3s' } as React.CSSProperties}>
                <div className="card-content">💻</div>
              </div>

              <div className="floating-card" style={{ '--delay': '4s' } as React.CSSProperties}>
                <div className="card-content">🧠</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <div className="container">
          <h2 className="section-title">Cosa sto imparando</h2>
          <div className="skills-grid">
            <div className="skill-card" data-skill="html">
              <div className="skill-icon">🏗️</div>
              <h3>Frontend</h3>
              <p>HTML5, CSS3, JavaScript, React, Vue.js, Tailwind CSS</p>
            </div>
            <div className="skill-card" data-skill="node">
              <div className="skill-icon">⚙️</div>
              <h3>Backend</h3>
              <p>Node.js, Python, PHP, Express, REST APIs, Databases</p>
            </div>
            <div className="skill-card" data-skill="design">
              <div className="skill-icon">🎯</div>
              <h3>Design</h3>
              <p>UI/UX Design, Figma, Responsive Design, Prototyping</p>
            </div>
            <div className="skill-card" data-skill="tools">
              <div className="skill-icon">🛠️</div>
              <h3>Tools & DevOps</h3>
              <p>Git, Docker, AWS, GitHub, VS Code, CI/CD</p>
            </div>
          </div>
        </div>
      </section>

      {false && (<> {/* Projects Section */}
        <section id="projects" className="projects">
          <div className="container">
            <h2 className="section-title">I Miei Progetti</h2>
            <div className="projects-grid">
              {/* Project Card 1 */}
              <div className="project-card">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=870&auto=format&fit=crop" alt="Progetto 1" />
                  <div className="project-overlay">
                    <a href="#" className="project-link">Vedi Progetto →</a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>E-Commerce Platform</h3>
                  <p>Piattaforma e-commerce completa con React, Node.js e Stripe. Supporta autenticazione utente, carrello, pagamenti e admin dashboard.</p>
                  <div className="project-tags">
                    <span className="tag">React</span>
                    <span className="tag">Node.js</span>
                    <span className="tag">MongoDB</span>
                  </div>
                </div>
              </div>

              {/* Project Card 2 */}
              <div className="project-card">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=870&auto=format&fit=crop" alt="Progetto 2" />
                  <div className="project-overlay">
                    <a href="#" className="project-link">Vedi Progetto →</a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>Dashboard Analytics</h3>
                  <p>Dashboard di analytics in tempo reale con grafici interattivi, export dati e visualizzazioni personalizzate per il monitoraggio KPI.</p>
                  <div className="project-tags">
                    <span className="tag">Vue.js</span>
                    <span className="tag">Chart.js</span>
                    <span className="tag">API REST</span>
                  </div>
                </div>
              </div>

              {/* Project Card 3 */}
              <div className="project-card">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=870&auto=format&fit=crop" alt="Progetto 3" />
                  <div className="project-overlay">
                    <a href="#" className="project-link">Vedi Progetto →</a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>Social Media App</h3>
                  <p>Applicazione social media con feed, messaggi, profili utente e notifiche in tempo reale utilizzando WebSockets.</p>
                  <div className="project-tags">
                    <span className="tag">React Native</span>
                    <span className="tag">Firebase</span>
                    <span className="tag">WebSockets</span>
                  </div>
                </div>
              </div>

              {/* Project Card 4 */}
              <div className="project-card">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1516321318423-f06f70d504f0?q=80&w=870&auto=format&fit=crop" alt="Progetto 4" />
                  <div className="project-overlay">
                    <a href="#" className="project-link">Vedi Progetto →</a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>Password Generator</h3>
                  <p>Generatore di password personalizzabile con opzioni avanzate, valutazione della forza e copia negli appunti.</p>
                  <div className="project-tags">
                    <span className="tag">JavaScript</span>
                    <span className="tag">HTML/CSS</span>
                    <span className="tag">Security</span>
                  </div>
                </div>
              </div>

              {/* Project Card 5 */}
              <div className="project-card">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1511376979264-da6635d67151?q=80&w=870&auto=format&fit=crop" alt="Progetto 5" />
                  <div className="project-overlay">
                    <a href="#" className="project-link">Vedi Progetto →</a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>Task Management System</h3>
                  <p>Sistema di gestione compiti collaborativo con team workspace, automazioni e integrazioni con Slack e GitHub.</p>
                  <div className="project-tags">
                    <span className="tag">Full Stack</span>
                    <span className="tag">Real-time</span>
                    <span className="tag">PostgreSQL</span>
                  </div>
                </div>
              </div>

              {/* Project Card 6 */}
              <div className="project-card">
                <div className="project-image">
                  <img src="https://images.unsplash.com/photo-1512941691920-25bda36be85d?q=80&w=870&auto=format&fit=crop" alt="Progetto 6" />
                  <div className="project-overlay">
                    <a href="#" className="project-link">Vedi Progetto →</a>
                  </div>
                </div>
                <div className="project-info">
                  <h3>AI Content Generator</h3>
                  <p>Generatore di contenuti alimentato da AI che crea testi marketing, blog posts e copywriting in multipli linguaggi.</p>
                  <div className="project-tags">
                    <span className="tag">Python</span>
                    <span className="tag">OpenAI API</span>
                    <span className="tag">Next.js</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section></>)}

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          <h2 className="section-title">Contattami</h2>
          <p className="section-description">
            Hai un progetto interessante? Parliamone! Sono sempre disponibile per discutere di nuove opportunità.
          </p>

          <div className="contact-content">
            <form className="contact-form" onSubmit={(e) => {
              e.preventDefault();
              const form = e.target as HTMLFormElement;
              const formData = new FormData(form);
              const inputs = form.querySelectorAll('input');
              const name = (inputs[0] as HTMLInputElement).value;
              const email = (inputs[1] as HTMLInputElement).value;
              const subject = (inputs[2] as HTMLInputElement).value;
              const message = (form.querySelector('textarea') as HTMLTextAreaElement).value;

              const mailtoLink = `mailto:ashifc99.github.io.bounce673@passfwd.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMessaggio:\n${message}`)}`;
              window.location.href = mailtoLink;
              form.reset();
              alert('Messaggio inviato (apertura client email)!');
            }}>
              <div className="form-group">
                <input type="text" placeholder="Il tuo nome" required />
              </div>
              <div className="form-group">
                <input type="email" placeholder="La tua email" required />
              </div>
              <div className="form-group">
                <input type="text" placeholder="Oggetto" required />
              </div>
              <div className="form-group">
                <textarea placeholder="Il tuo messaggio" rows={5} required></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-large">Invia Messaggio</button>
            </form>

            <div className="contact-info">
              <div className="info-item">
                <div className="info-icon">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4>Email</h4>
                  <p>ashifc99.github.io.bounce673@passfwd.com</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Linkedin className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4>LinkedIn</h4>
                  <p>linkedin.com/in/ashifchowdhury/</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  <Github className="w-8 h-8 text-primary" />
                </div>
                <div>
                  <h4>GitHub</h4>
                  <p>github.com/AshifC99</p>
                </div>
              </div>
              <div className="info-item">
                <div className="info-icon">
                  {/* X Logo SVG */}
                  <svg viewBox="0 0 24 24" className="w-8 h-8 text-primary" fill="currentColor" style={{ width: '32px', height: '32px' }}>
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </div>
                <div>
                  <h4>X (Twitter)</h4>
                  <p>@__ASHIF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2026 Ashif C. Tutti i diritti riservati. | Fatto con ❤️ e JavaScript</p>
          <div className="footer-links">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
