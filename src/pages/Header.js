import { useEffect, useRef, useState } from 'react';
import '../css/Header.css';
import Typed from 'typed.js';
import '../css/humburg.css';

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const typingRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const options = {
      strings: ['Frontend Developer', 'Dreamer'],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    };

    if (!typingRef.current) {
      return undefined;
    }

    const typed = new Typed(typingRef.current, options);
    return () => typed.destroy();
  }, []);

  return (
    <>
      <nav className="custom-navbar" data-spy="affix" data-offset-top="20">
        <div className="container">
          <a className="logo" href="#home">
            &lt;Hassan/&gt;
          </a>
          <div id="nav-toggle" className={`hamburger-menu ${isOpen ? 'open' : ''}`}>
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
              <li>
                <a href="#home" onClick={closeMenu}>Home</a>
              </li>
              <li>
                <a href="#contact" onClick={closeMenu}>Contact</a>
              </li>
              <li>
                <a href="#about" onClick={closeMenu}>About</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <header id="home" className="header">
        <div className="overlay"></div>
        <div className="header-content container">
          <h1 className="header-title">
            <span className="up">Hi!</span>
            <span className="down">I'm Hassan Usmani</span>
          </h1>
          <div className="content">
            And I'm a <span className="typing" ref={typingRef}></span>
          </div>
          <a href="#contact" className="btn btn-primary">Hire Me</a>
        </div>
      </header>
    </>
  );
}
