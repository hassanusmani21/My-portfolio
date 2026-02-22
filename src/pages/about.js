import React from 'react';
import AboutPhoto from '../assets/about-photo.jpeg';
import '../css/ForAllpage.css';
import '../css/about-section.css';

export function Home() {
  return (
    <div>
      <section className="section about-section" id="about">
        <div className="container">
          <div className="about">
            <div className="about-img-holder">
              <img
                src={AboutPhoto}
                className="about-img"
                alt="Portrait of Hassan Usmani"
              />
            </div>
            <div className="about-caption">
              <p className="section-subtitle">Who Am I ?</p>
              <h2 className="section-title mb-3">About Me</h2>
              <p className="about-text">
                I am an aspiring Frontend Developer with a strong foundation in HTML, CSS,
                JavaScript, and React.js, and a passion for building clean, responsive, and
                user-friendly web interfaces. Currently, I am expanding my technical skill set
                by learning Java and strengthening my understanding of programming fundamentals,
                object-oriented programming, and problem-solving. I am also continuously
                improving my knowledge of modern frontend development, API integration, and
                version control using Git and GitHub. My goal is to grow into a versatile
                developer capable of building efficient, scalable, and high-quality web
                applications while contributing to real-world projects and innovative teams.
              </p>
              <a
                href="https://drive.google.com/file/d/1SrE9H9ke-NI5-14uqbGyHBj0J56-wmdo/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-rounded btn btn-outline-primary mt-4"
              >
                Download CV
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
