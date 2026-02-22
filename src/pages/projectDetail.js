import React, { useEffect } from 'react';
import '../css/project-detail.css';

const DEFAULT_TITLE = 'Hassan Usmani | Portfolio';
const DEFAULT_DESCRIPTION =
  'Frontend developer portfolio of Hassan Usmani, focused on responsive web apps built with React and JavaScript.';

const updateDescriptionMeta = (content) => {
  const descriptionTag = document.querySelector('meta[name="description"]');
  if (descriptionTag) {
    descriptionTag.setAttribute('content', content);
  }
};

const updateOgMeta = (property, content) => {
  const tag = document.querySelector(`meta[property="${property}"]`);
  if (tag) {
    tag.setAttribute('content', content);
  }
};

export function ProjectDetailPage({ project }) {
  useEffect(() => {
    if (project) {
      const projectTitle = `${project.title} Case Study | Hassan Usmani`;
      document.title = projectTitle;
      updateDescriptionMeta(project.summary);
      updateOgMeta('og:title', projectTitle);
      updateOgMeta('og:description', project.summary);
      updateOgMeta('og:url', window.location.href);
    } else {
      document.title = 'Project Not Found | Hassan Usmani';
      updateDescriptionMeta('The requested portfolio project could not be found.');
      updateOgMeta('og:title', 'Project Not Found | Hassan Usmani');
      updateOgMeta('og:description', 'The requested portfolio project could not be found.');
      updateOgMeta('og:url', window.location.href);
    }

    return () => {
      document.title = DEFAULT_TITLE;
      updateDescriptionMeta(DEFAULT_DESCRIPTION);
      updateOgMeta('og:title', DEFAULT_TITLE);
      updateOgMeta('og:description', DEFAULT_DESCRIPTION);
      updateOgMeta('og:url', window.location.origin);
    };
  }, [project]);

  if (!project) {
    return (
      <main className="project-detail-page section">
        <div className="container text-center">
          <p className="section-subtitle">Project Case Study</p>
          <h1 className="section-title mb-4">Project Not Found</h1>
          <p className="project-detail-summary">
            The page you requested does not exist. Return to the portfolio and open a valid case
            study.
          </p>
          <a href="/#portfolio" className="btn btn-primary mt-3">
            Back to Portfolio
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="project-detail-page">
      <section className="section project-detail-hero">
        <div className="container">
          <a href="/#portfolio" className="project-back-link">
            Back to Portfolio
          </a>
          <p className="section-subtitle">Project Case Study</p>
          <h1 className="section-title project-detail-title">{project.title}</h1>
          <p className="project-detail-summary">{project.summary}</p>

          <div className="project-detail-actions">
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              Live Demo
            </a>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline-primary"
            >
              View Code
            </a>
          </div>
        </div>
      </section>

      <section className="section pt-0 project-detail-content">
        <div className="container">
          <img src={project.image} alt={`${project.title} project preview`} className="project-detail-image" />

          <div className="project-detail-grid">
            <article className="project-detail-card">
              <h2>Problem</h2>
              <p>{project.problem}</p>
            </article>
            <article className="project-detail-card">
              <h2>My Role</h2>
              <p>{project.role}</p>
            </article>
            <article className="project-detail-card">
              <h2>Outcome</h2>
              <p>{project.outcome}</p>
            </article>
          </div>

          <div className="project-detail-grid project-detail-grid-secondary">
            <article className="project-detail-card">
              <h2>Tech Stack</h2>
              <ul className="project-list">
                {project.stack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="project-detail-card">
              <h2>Challenges</h2>
              <ul className="project-list">
                {project.challenges.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
