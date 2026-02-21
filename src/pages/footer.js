import React from 'react';
import '../css/footer.css';

const socialLinks = [
  {
    href: 'https://www.instagram.com/hassanusmanix/',
    label: 'Visit Instagram',
    iconClass: 'ti-instagram',
    external: true,
  },
  {
    href: 'https://github.com/hassanusmani21',
    label: 'Visit GitHub',
    iconClass: 'ti-github',
    external: true,
  },
  {
    href: 'https://www.linkedin.com/in/hassan-usmani21/',
    label: 'Visit LinkedIn',
    iconClass: 'ti-linkedin',
    external: true,
  },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-wrapper" id="footer">
      <div className="container">
        <div className="footer">
          <div className="footer-meta">
            <p className="mb-0 footer-copy">
              Copyright {currentYear}. Hassan Usmani. All rights reserved.
            </p>
          </div>

          <div className="social-links">
            {socialLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="link"
                aria-label={link.label}
                title={link.label}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noopener noreferrer' : undefined}
              >
                <i className={link.iconClass}></i>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
