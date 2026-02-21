import React, { useEffect, useRef, useState } from 'react';
import moviesImage from '../assets/movies.png';
import ecommerceImage from '../assets/ecommerce.png';
import periodImage from '../assets/perioid.png';
import '../css/projects-actions.css';

export function Projects(){
    const [activeCard, setActiveCard] = useState(null);
    const cardsRef = useRef({});
    const projectCards = [
      {
        id: 'movies',
        title: 'Moviesflix',
        subtitle: 'Category: Web App',
        demoUrl: 'https://moviesflixapp.netlify.app/',
        codeUrl: 'https://github.com/hassanusmani21/Moviesflix',
        image: moviesImage,
      },
      {
        id: 'ecommerce',
        title: 'E-commerce',
        subtitle: 'Category: Web App',
        demoUrl: 'https://willowy-naiad-9e85dc.netlify.app/',
        codeUrl: 'https://github.com/hassanusmani21/E-commerce',
        image: ecommerceImage,
      },
      {
        id: 'period-tracker',
        title: 'Period Tracker',
        subtitle: 'Category: Web App',
        demoUrl: 'https://app.netlify.com/projects/splendorous-genie-f22c62/overview',
        codeUrl: 'https://github.com/hassanusmani21/A-women-s-wellness-and-period-tracker',
        image: periodImage,
      },
    ];

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
