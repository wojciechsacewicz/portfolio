import { ActionLink } from '../../components/InterfaceElements';
import { experience, type ExperienceEntry } from '../../content/portfolioContent';
import './profile-module.css';

function ExperienceArticle({ entry }: { readonly entry: ExperienceEntry }) {
  return (
    <article data-reveal>
      <time>{entry.period}</time>
      <div className="experience-title">
        <h3>{entry.role}</h3>
        <p>{entry.company}</p>
      </div>
      <p className="experience-summary">{entry.lead}</p>
    </article>
  );
}

function ExperienceSection() {
  return (
    <section className="section experience-section" id="experience">
      <header className="profile-section-heading" data-reveal>
        <p className="eyebrow">Work history</p>
        <h2>Experience</h2>
      </header>

      <div className="experience-list">
        {experience.map((entry) => (
          <ExperienceArticle key={`${entry.company}-${entry.role}`} entry={entry} />
        ))}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className="section about-section" id="about">
      <header className="about-heading" data-reveal>
        <p className="eyebrow">About</p>
        <h2>21-year-old developer in Tricity.</h2>
      </header>

      <div className="about-copy" data-reveal>
        <p>
          I build web products, internal tools and automation. Most of my current work uses
          React, TypeScript and Cloudflare.
        </p>
        <p>
          I work at IDEGO and study Computer Science and Econometrics at the University of
          Gdańsk. Outside work, I build and maintain my own products.
        </p>
        <div className="about-links">
          <ActionLink href="https://github.com/wojciechsacewicz" target="_blank" rel="noreferrer">
            GitHub
          </ActionLink>
          <ActionLink href="https://linkedin.com/in/wojciech-sacewicz" target="_blank" rel="noreferrer">
            LinkedIn
          </ActionLink>
          <ActionLink href="/resume">Resume</ActionLink>
        </div>
      </div>
    </section>
  );
}

function HomeContactSection() {
  return (
    <section className="home-contact" id="contact">
      <div data-reveal>
        <p className="eyebrow">Contact</p>
        <h2>
          <a href="mailto:wojciechsacewicz@outlook.com">wojciechsacewicz@outlook.com</a>
        </h2>
        <p>For a role, a project or a direct question.</p>
      </div>

      <footer>
        <span>Wojciech Sacewicz © 2026</span>
        <span>Tricity, Poland</span>
      </footer>
    </section>
  );
}

export function ProfileModule() {
  return (
    <>
      <ExperienceSection />
      <AboutSection />
      <HomeContactSection />
    </>
  );
}
