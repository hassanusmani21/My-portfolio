import React from 'react';
import '../css/Header.css';
import Typed from "typed.js";
import '../css/humburg.css'
import { useState , useEffect } from 'react';


export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };
  useEffect(() => {
    const options = {
      strings: ["FrontEnd Developer", "Dreamer"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    };
    const targetElement = document.querySelector(".typing");
    const typed = new Typed(targetElement, options);

    // Cleanup the Typed instance when the component unmounts
    return () => {
      typed.destroy();
    };
  }, []);

  

  return (
    <>
      <nav className="custom-navbar" data-spy="affix" data-offset-top="20">
        <div className="container">
          <a className="logo" href="#home">
          &lt;Hassan/&gt;
          </a>
    <div  id='nav-toggle' className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
      <button
        type="button"
        className="menu-icon hamburger-box"
        onClick={toggleMenu}
        aria-label="Toggle navigation menu"
        aria-expanded={isOpen}
      >
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <ul className="menu">
        <li><a href="#home" onClick={closeMenu}>Home</a></li>
        <li><a href="#contact" onClick={closeMenu}>Contact</a></li>
        <li><a href="#about" onClick={closeMenu}>About</a></li>
      </ul>
    </div>
        </div>
      </nav>
      {/* End of Page Navbar */}

      {/* Page Header */}
      <header id="home" className="header">
        <div className="overlay"></div>
        <div className="header-content container">
          <h1 className="header-title">
            <span className="up">HI!</span>
            <span className="down">I'm Hassan Usmani</span>
          </h1>
          <div className="content">
              And I'm a <span className="typing"></span>
          </div>
          {/* <p className="header-subtitle">FRONTEND WEB DESIGNER</p> */}
          <button className="btn btn-primary">Hire Me</button>
        </div>
      </header>
    </>
  );
}
