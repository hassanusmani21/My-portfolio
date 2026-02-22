import React, { useEffect, useRef, useState } from 'react';
import { projectCards } from '../data/projectsData';
import '../css/projects-actions.css';

export function Projects(){
    const [activeCard, setActiveCard] = useState(null);
    const cardsRef = useRef({});

    useEffect(() => {
      const handleOutsideClick = (event) => {
        if (!activeCard) return;
        const activeNode = cardsRef.current[activeCard];
        if (activeNode && !activeNode.contains(event.target)) {
          setActiveCard(null);
        }
      };

      document.addEventListener('click', handleOutsideClick);
      return () => document.removeEventListener('click', handleOutsideClick);
    }, [activeCard]);

    const handleCardClick = (cardId, event) => {
      event.stopPropagation();
      setActiveCard((prev) => (prev === cardId ? null : cardId));
    };

    const handleActionClick = (event) => {
      event.stopPropagation();
      setActiveCard(null);
    };

    return (
      <section className="section" id="portfolio">
      <div className="container text-center">
          <h6 className="section-title mb-6">Portfolio</h6>
         
          <div className="row">
              {projectCards.map((card) => (
                <div className="col-md-4" key={card.id}>
                  <article
                    ref={(node) => { cardsRef.current[card.id] = node; }}
                    className={`portfolio-card action-card ${activeCard === card.id ? 'show-actions' : ''}`}
                    onClick={(event) => handleCardClick(card.id, event)}
                  >
                      <img src={card.image} className="portfolio-card-img" alt={`${card.title} project preview`} />
                      <div className="project-actions-overlay" onClick={(event) => event.stopPropagation()}>
                        <a
                          href={card.demoUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-btn"
                          onClick={handleActionClick}
                        >
                          View Demo
                        </a>
                        <a
                          href={card.codeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="project-action-btn project-action-btn-secondary"
                          onClick={handleActionClick}
                        >
                          View Code
                        </a>
                        <a
                          href={`/projects/${card.slug}`}
                          className="project-action-btn project-action-btn-tertiary"
                          onClick={handleActionClick}
                        >
                          Case Study
                        </a>
                      </div>
                      <span className="portfolio-card-overlay">
                          <span className="portfolio-card-caption">
                             <h4>{card.title}</h4>
                                  <p className="font-weight-normal">{card.subtitle}</p>
                          </span>
                      </span>
                  </article>
                </div>
              ))}
          </div>
      </div>
  </section>
        
    );
};
