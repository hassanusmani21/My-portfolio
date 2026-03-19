import React from 'react';
import '../css/skill.css';
import html from '../assets/html.png';
import css from '../assets/css.png';
import javascript from '../assets/javascript.png';
import react from '../assets/react.png';

const skills = [
  { label: 'HTML', icon: html, alt: 'HTML logo' },
  { label: 'CSS', icon: css, alt: 'CSS logo', width: 330 },
  { label: 'JS', icon: javascript, alt: 'JavaScript logo', width: 380 },
  { label: 'REACT', icon: react, alt: 'React logo', width: 200 },
];

export function Skill() {
  return (
    <section className="section skill-section" id="skills">
      <div className="container">
        <h1 className="skill-name">Skills</h1>
        <div className="whole-card">
          {skills.map((skill) => (
            <div className="card" key={skill.label}>
              <div className="face back">
                <div className="content">
                  <img src={skill.icon} alt={skill.alt} width={skill.width} />
                </div>
              </div>
              <div className="face front">
                <b>{skill.label}</b>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
