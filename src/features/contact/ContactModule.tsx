import { ActionLink } from '../../components/InterfaceElements';
import { getTechnologyIconUrl, technologies } from '../../content/portfolioContent';
import './contact-module.css';

function TechnologyBand() {
  const repeatedTechnologies = [...technologies, ...technologies];

  return (
    <section className="technology-band" aria-label="Core technologies">
      <div className="technology-track">
        {repeatedTechnologies.map((technology, index) => (
          <div className="technology-item" key={`${technology.slug}-${index}`}>
            <img
              src={getTechnologyIconUrl(technology.slug)}
              alt=""
              loading="lazy"
              aria-hidden="true"
            />
            <span>{technology.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <p className="eyebrow">Next step</p>
      <h2>Give me a hard product problem.</h2>
      <p>
        I am interested in AI-native product engineering, internal tools,
        developer workflows and software where speed still needs judgment.
      </p>

      <ActionLink
        className="contact-link"
        href="mailto:wojciechsacewicz@outlook.com"
      >
        wojciechsacewicz@outlook.com
      </ActionLink>

      <footer>
        <span>Wojciech Sacewicz © 2026</span>
        <span>Built with React, Three.js and a strict evidence policy.</span>
      </footer>
    </section>
  );
}

export function ContactModule() {
  return (
    <>
      <TechnologyBand />
      <ContactSection />
    </>
  );
}
