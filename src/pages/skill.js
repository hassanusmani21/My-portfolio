import React from 'react';
import '../css/skill.css'
import html from '../assets/html.png'
import css from '../assets/css.png'
import javascript from '../assets/javascript.png'
import react from '../assets/javascript.png'


export function Skill(){
  return (
<div className="container">
 <h1 className='skill-name'>Skill's</h1>
  <div className='whole-card'>

  <div class="card">
    <div class="face back">
      <div class="content">
      <img src={html} alt="" />
        <span class="stars"></span>
        <p class="desc"></p>
      </div>
    </div>
    <div class="face front">
      <b>HTML</b>
    </div>
  </div>


  <div class="card">
    <div class="face back">
      <div class="content">
      <img src={css} alt="" width="330"/>
        <span class="stars"></span>
        <p class="desc"></p>
      </div>
    </div>
    <div class="face front">
      <b>CSS</b>
    </div>
  </div>


  <div class="card">
    <div class="face back">
      <div class="content">
      <img src={javascript} alt="" width="380"/>
        <span class="stars"></span>
        <p class="desc">
          
        </p>
      </div>
    </div>
    <div class="face front">
      <b>JS</b>
    </div>
  </div>

  <div class="card">
    <div class="face back">
      <div class="content">
   <img src={react} alt="" width="200"/>
        <span class="stars"></span>
        <p class="desc">
          
        </p>
      </div>
    </div>
    <div class="face front">
      <b>REACT</b>
    </div>
  </div>
    </div>
  </div>
  );
};

