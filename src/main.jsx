import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Database,
  Layers3,
  Menu,
  X,
  Mail,
  Phone,
  Link2,
  MapPin,
  Send,
} from "lucide-react";
import "./style.css";
import { projectLinks } from "./projectLinks.js";

const email = "shreysingh1238@gmail.com";
const linkedin = "https://www.linkedin.com/in/sshreyasingh1238";
function App() {
  const artRef = useRef(null);
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(pointer: fine)');
    let frame = 0;
    const updateScroll = () => {
      if (frame || reducedMotion.matches) return;
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty('--scroll-glow', Math.min(window.scrollY * 0.12, 500) + 'px');
        const heroScroll = Math.min(window.scrollY, window.innerHeight);
        document.documentElement.style.setProperty('--hero-foreground-y', heroScroll * -0.18 + 'px');
        document.documentElement.style.setProperty('--hero-background-y', heroScroll * 0.32 + 'px');
        frame = 0;
      });
    };
    const moveLogo = (event) => {
      if (reducedMotion.matches || !finePointer.matches || !artRef.current) return;
      const rect = artRef.current.getBoundingClientRect();
      const x = Math.max(-1, Math.min(1, (event.clientX - (rect.left + rect.width / 2)) / window.innerWidth * 2));
      const y = Math.max(-1, Math.min(1, (event.clientY - (rect.top + rect.height / 2)) / window.innerHeight * 2));
      artRef.current.style.setProperty('--pointer-x', x * 18 + 'px');
      artRef.current.style.setProperty('--pointer-y', y * 18 + 'px');
    };
    const resetLogo = () => {
      artRef.current?.style.removeProperty('--pointer-x');
      artRef.current?.style.removeProperty('--pointer-y');
    };
    const observer = !reducedMotion.matches && 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-entered');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.12 })
      : null;
    document.querySelectorAll('.section-head, .about-grid, .project, .job, .service-list > div').forEach((element) => observer?.observe(element));
    window.addEventListener('scroll', updateScroll, { passive: true });
    window.addEventListener('pointermove', moveLogo, { passive: true });
    window.addEventListener('blur', resetLogo);
    updateScroll();
    return () => {
      observer?.disconnect();
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('pointermove', moveLogo);
      window.removeEventListener('blur', resetLogo);
      cancelAnimationFrame(frame);
      document.documentElement.style.removeProperty('--scroll-glow');
      document.documentElement.style.removeProperty('--hero-foreground-y');
      document.documentElement.style.removeProperty('--hero-background-y');
    };
  }, []);
  const [menu, setMenu] = useState(false),
    [status, setStatus] = useState(""),
    [sending, setSending] = useState(false);
  async function submit(e) {
    e.preventDefault();
    setSending(true);
    setStatus("");
    const form = e.currentTarget;
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Something went wrong.");
      setStatus(
        data.confirmationSent
          ? "Thanks for reaching out! Your message has been sent."
          : "Your message was sent, but the confirmation email could not be delivered.",
      );
      form.reset();
    } catch (error) {
      setStatus(
        error.message ||
          "Could not send your message. Please email me directly instead.",
      );
    } finally {
      setSending(false);
    }
  }
  return (
    <>
      <header className="header">
        <a className="logo" href="#home" aria-label="Shreya Singh home">
          shreya<span>.</span>
        </a>
        <nav className={menu ? "nav open" : "nav"} aria-label="Main navigation">
          {[
            ["About", "#about"],
            ["Work", "#work"],
            ["Services", "#services"],
            ["Contact", "#contact"],
          ].map(([name, href]) => (
            <a key={name} href={href} data-label={name} className="nav-roll" onClick={() => setMenu(false)}>
              {name}
            </a>
          ))}
          <a className="nav-cta" href="#contact" onClick={() => setMenu(false)}>
            Let's talk <ArrowUpRight size={15} />
          </a>
        </nav>
        <button
          className="menu"
          onClick={() => setMenu(!menu)}
          aria-label={menu ? "Close menu" : "Open menu"}
        >
          {menu ? <X /> : <Menu />}
        </button>
      </header>
      <main>
        <section id="home" className="hero wrap">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="dot" /> AVAILABLE FOR OPPORTUNITIES
            </div>
            <h1>
              Building digital
              <br />
              <em>experiences</em>
              <br />
              that matter<span className="lime">.</span>
            </h1>
            <p>
              Hi, I'm Shreya - a full-stack developer turning ideas into
              thoughtful, functional experiences for the web.
            </p>
            <div className="hero-actions">
              <a className="button primary" href="#work">
                Explore my work <ArrowDown size={17} />
              </a>
              <a className="text-link" href="/Shreya_Singh_Resume.pdf" download>
                Download CV <ArrowDown size={17} />
              </a>
            </div>
          </div>
          <div ref={artRef} className="hero-art" aria-hidden="true">
            <div className="orbit orbit-one" />
            <div className="orbit orbit-two" />
            <div className="orbit orbit-three" />
            <div className="art-center">
              <span>CREATIVE DEVELOPMENT</span>
              <strong>
                S<span>.</span>
              </strong>
              <small>DESIGN x CODE</small>
            </div>
            <div className="art-label label-top">
              IDEAS INTO REALITY <span>*</span>
            </div>
            <div className="art-label label-bottom">
              <span>*</span> BUILT WITH PURPOSE
            </div>
          </div>
          <div className="hero-bottom">
            <span>BASED IN MUMBAI, INDIA</span>
            <span>
              SCROLL TO EXPLORE <ArrowDown size={14} />
            </span>
            <span>DEVELOPMENT & BEYOND</span>
          </div>
        </section>
        <div className="ticker" aria-hidden="true">
          <div>
            REACT <b>*</b> NODE.JS <b>*</b> NEXT.JS <b>*</b> MYSQL <b>*</b>{" "}
            JAVASCRIPT <b>*</b> REACT <b>*</b> NODE.JS <b>*</b> NEXT.JS <b>*</b>{" "}
            MYSQL <b>*</b> JAVASCRIPT <b>*</b>
          </div>
        </div>
        <section id="about" className="section wrap">
          <div className="section-head">
            <span className="kicker">01 / A LITTLE ABOUT ME</span>
            <h2>
              Curious by nature.
              <br />
              <span>Developer by choice.</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-mark">
              <div className="mark-star">*</div>
              <p>
                GOOD IDEAS DESERVE
                <br />
                GREAT EXECUTION.
              </p>
              <span>MUMBAI, INDIA </span>
            </div>
            <div className="about-copy">
              <p className="lead">
                I enjoy bringing the pieces together - from an intuitive
                interface to the logic that makes it work.
              </p>
              <p>
                I'm a full-stack developer with experience building web
                applications using React, Next.js, Node.js and MySQL. I've
                worked on production travel management tools, responsive
                dashboards and REST APIs, with a focus on building reliable
                experiences that solve real problems.
              </p>
              <p>
                Always learning, I'm currently deepening my backend skills in
                Java, Spring Boot and SQL. When there's a problem to solve, I'm
                excited to find a better way to build it.
              </p>
              <div className="stats">
                <div>
                  <strong>04</strong>
                  <span>
                    Business modules
                    <br />
                    delivered
                  </span>
                </div>
                <div>
                  <strong>
                    20<span>+</span>
                  </strong>
                  <span>
                    REST API endpoints
                    <br />
                    built
                  </span>
                </div>
                <div>
                  <strong>01</strong>
                  <span>
                    Goal: keep
                    <br />
                    building better
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="skills-section">
          <div className="wrap">
            <div className="section-head split">
              <div>
                <span className="kicker">THE TOOLKIT</span>
                <h2>
                  Ideas meet <span>execution.</span>
                </h2>
              </div>
              <p>
                A versatile toolkit for building the front end, the back end,
                and everything in between.
              </p>
            </div>
            <div className="skill-grid">
              {[
                [
                  "01",
                  "Frontend",
                  "React.js, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS, Bootstrap",
                ],
                [
                  "02",
                  "Backend",
                  "Node.js, Express.js, REST APIs, JWT, Java, Spring Boot",
                ],
                [
                  "03",
                  "Data & tools",
                  "MySQL, MongoDB, PostgreSQL, Git, GitHub, Postman",
                ],
              ].map(([n, t, d]) => (
                <div className="skill" key={n}>
                  <span>{n} /</span>
                  <h3>{t}</h3>
                  <p>{d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section id="work" className="section wrap">
          <div className="section-head split">
            <div>
              <span className="kicker">02 / SELECTED WORK</span>
              <h2>
                Made to make
                <br />
                <span>a difference.</span>
              </h2>
            </div>
            <p>
              A closer look at the systems and experiences I've helped bring to
              life.
            </p>
          </div>
          <div className="projects">
            <article className="project">
              {projectLinks.travel && (
                <a
                  className="project-card-link"
                  href={projectLinks.travel}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Travel Management System on GitHub"
                />
              )}
              <div className="project-visual travel">
                <div className="mock-window">
                  <div className="mock-top">
                    <i />
                    <i />
                    <i />
                    <span>TRAVEL MANAGEMENT</span>
                  </div>
                  <div className="mock-body">
                    <div className="mock-sidebar">
                      <b>*</b>
                      <span />
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="mock-content">
                      <small>OVERVIEW</small>
                      <h4>
                        Every journey,
                        <br />
                        beautifully managed.
                      </h4>
                      <div className="mock-cards">
                        <div>
                          Customers<strong></strong>
                        </div>
                        <div>
                          Bookings<strong></strong>
                        </div>
                        <div>
                          Packages<strong></strong>
                        </div>
                      </div>
                      <div className="mock-lines">
                        <span />
                        <span />
                        <span />
                      </div>
                    </div>
                  </div>
                </div>
                <span className="visual-tag">FULL-STACK DEVELOPMENT</span>
              </div>
              <div className="project-info">
                <div>
                  <span className="kicker">01 / PRODUCTION PROJECT</span>
                  <h3>Travel Management System</h3>
                  <p>
                    A platform for managing customers, packages, quotations and
                    bookings, with role-based dashboards and 20+ REST API
                    endpoints.
                  </p>
                </div>
                <div className="tags">
                  <span>React</span>
                  <span>Node.js</span>
                  <span>MySQL</span>
                  {projectLinks.travel && <span>View on GitHub</span>}
                </div>
              </div>
            </article>
            <article className="project">
              {projectLinks.event && (
                <a
                  className="project-card-link"
                  href={projectLinks.event}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Event Ticketing project on GitHub"
                />
              )}
              <div className="project-visual event">
                <div className="ticket">
                  <div className="ticket-top">
                    EVENT / PASS <span>*</span>
                  </div>
                  <div className="ticket-main">
                    <small>YOUR NEXT EXPERIENCE</small>
                    <strong>
                      Make
                      <br />
                      room for
                      <br />
                      <em>moments.</em>
                    </strong>
                  </div>
                  <div className="ticket-bottom">
                    <span>
                      ADMIT ONE
                      <br />
                      <b>EVENT TICKET</b>
                    </span>
                    <div className="qr">#</div>
                  </div>
                </div>
                <div className="event-circle">*</div>
                <span className="visual-tag">MERN STACK</span>
              </div>
              <div className="project-info">
                <div>
                  <span className="kicker">02 / FULL-STACK PROJECT</span>
                  <h3>Event Ticketing & QR Check-In</h3>
                  <p>
                    An event booking experience with digital tickets, QR
                    validation, admin tools and email confirmations.
                  </p>
                </div>
                <div className="tags">
                  <span>React</span>
                  <span>MongoDB</span>
                  <span>JWT</span>
                  {projectLinks.event && <span>View on GitHub</span>}
                </div>
              </div>
            </article>
          </div>
        </section>
        <section className="experience wrap section">
          <div className="section-head">
            <span className="kicker">THE JOURNEY SO FAR</span>
            <h2>
              Experience that
              <br />
              <span>shapes the work.</span>
            </h2>
          </div>
          <div className="job">
            <span>MAR 2026 - PRESENT</span>
            <div>
              <h3>Full Stack Developer</h3>
              <p>LPO Holidays Pvt. Ltd.</p>
            </div>
            <p>
              Building travel management modules, APIs and dashboards; improving
              stability through testing, debugging and database optimization.
            </p>
          </div>
          <div className="job">
            <span>SEP 2024 - MAR 2025</span>
            <div>
              <h3>Junior Web Developer Intern</h3>
              <p>Ratanmace IT Solutions</p>
            </div>
            <p>
              Built responsive pages for client projects and collaborated on UI
              improvements, debugging and performance.
            </p>
          </div>
          <div className="education">
            <span>EDUCATION</span>
            <p>
              B.Sc. in Computer Science <small>- Mumbai University</small>
            </p>
          </div>
        </section>
        <section id="services" className="services section">
          <div className="wrap">
            <div className="section-head split">
              <div>
                <span className="kicker">03 / WHAT I DO</span>
                <h2>
                  Let's make
                  <br />
                  <span>something useful.</span>
                </h2>
              </div>
              <p>
                Open to opportunities, collaborations and meaningful projects
                where thoughtful development makes a difference.
              </p>
            </div>
            <div className="service-list">
              <div>
                <Code2 />
                <h3>Frontend development</h3>
                <p>
                  Responsive, accessible interfaces built with care and
                  attention to the details.
                </p>
                <span>01</span>
              </div>
              <div>
                <Layers3 />
                <h3>Full-stack applications</h3>
                <p>
                  Connected web experiences, from user-facing features to the
                  logic behind them.
                </p>
                <span>02</span>
              </div>
              <div>
                <Database />
                <h3>APIs & databases</h3>
                <p>
                  REST APIs, data workflows and authentication for practical
                  business needs.
                </p>
                <span>03</span>
              </div>
            </div>
          </div>
        </section>
        <section id="contact" className="contact section wrap">
          <div className="contact-intro">
            <span className="kicker">04 / GET IN TOUCH</span>
            <h2>
              Have an idea?
              <br />
              <em>Let's talk.</em>
            </h2>
            <p>
              Whether it's an opportunity, a project, or just a hello - my inbox
              is open.
            </p>
            <div className="contact-links">
              <a href={"mailto:" + email}>
                <Mail size={18} />
                {email}
              </a>
              <a href="tel:+919970910879">
                <Phone size={18} />
                +91 99709 10879
              </a>
              <a href={linkedin} target="_blank" rel="noreferrer">
                <Link2 size={18} />
                LinkedIn <ArrowUpRight size={15} />
              </a>
              <span>
                <MapPin size={18} />
                Mumbai, Maharashtra
              </span>
            </div>
          </div>
          <form onSubmit={submit} className="contact-form">
            <div className="form-row">
              <label>
                Your name
                <input
                  name="name"
                  required
                  maxLength="100"
                  placeholder="Jane Smith"
                />
              </label>
              <label>
                Email address
                <input
                  name="email"
                  type="email"
                  required
                  maxLength="254"
                  placeholder="jane@example.com"
                />
              </label>
            </div>
            <label>
              Subject
              <input
                name="subject"
                required
                maxLength="150"
                placeholder="What's this about?"
              />
            </label>
            <label>
              Your message
              <textarea
                name="message"
                required
                maxLength="5000"
                rows="5"
                placeholder="Tell me a little about it..."
              />
            </label>
            <button className="button primary" disabled={sending}>
              {sending ? "Sending..." : "Send message"} <Send size={16} />
            </button>
            <p role="status" className="form-status">
              {status}
            </p>
          </form>
        </section>
      </main>
      <footer>
        <div className="wrap footer-inner">
          <a className="logo" href="#home">
            shreya<span>.</span>
          </a>
          <p>Designed with intention. Built with curiosity.</p>
          <span>(c) {new Date().getFullYear()} SHREYA SINGH</span>
          <a href="#home">BACK TO TOP </a>
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
import "./motion.css";
