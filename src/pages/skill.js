import React from 'react';
import '../css/skill.css'
import html from '../assets/html.png'
import css from '../assets/css.png'
import javascript from '../assets/javascript.png'
import react from '../assets/react.png'


export function Skill(){
  return (
<section className="section skill-section" id="skills">
  <div className="container">
    <h1 className='skill-name'>Skill's</h1>
    <div className='whole-card'>
      <div className="card">
        <div className="face back">
          <div className="content">
            <img src={html} alt="HTML logo" />
            <span className="stars"></span>
            <p className="desc"></p>
          </div>
        </div>
        <div className="face front">
          <b>HTML</b>
        </div>
      </div>


      <div className="card">
        <div className="face back">
          <div className="content">
            <img src={css} alt="CSS logo" width="330"/>
            <span className="stars"></span>
            <p className="desc"></p>
          </div>
        </div>
        <div className="face front">
          <b>CSS</b>
        </div>
      </div>


      <div className="card">
        <div className="face back">
          <div className="content">
            <img src={javascript} alt="JavaScript logo" width="380"/>
            <span className="stars"></span>
            <p className="desc"></p>
          </div>
        </div>
        <div className="face front">
          <b>JS</b>
        </div>
      </div>

      <div className="card">
        <div className="face back">
          <div className="content">
            <img src={react} alt="React logo" width="200"/>
            <span className="stars"></span>
            <p className="desc"></p>
          </div>
        </div>
        <div className="face front">
          <b>REACT</b>
        </div>
      </div>
    </div>
  </div>
</section>
);
};
