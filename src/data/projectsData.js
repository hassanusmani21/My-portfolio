import moviesImage from '../assets/movies.png';
import ecommerceImage from '../assets/ecommerce.png';
import periodImage from '../assets/perioid.png';

export const projectCards = [
  {
    id: 'moviesflix',
    slug: 'moviesflix',
    title: 'Moviesflix',
    subtitle: 'Category: Web App',
    summary:
      'A responsive movie discovery app where users can browse trending titles, search quickly, and review key movie details in a clean interface.',
    problem:
      'People often struggle to find good movies quickly across cluttered sites. I wanted to build a faster browsing experience with clear visual structure.',
    role:
      'I designed the UI, built the React components, integrated movie API data, and handled responsive behavior for desktop and mobile screens.',
    stack: ['React', 'JavaScript (ES6+)', 'CSS3', 'REST API', 'Netlify'],
    challenges: [
      'Handling API loading, empty states, and error states cleanly.',
      'Keeping UI responsive while rendering many card items.',
      'Designing a consistent card layout across multiple viewport sizes.',
    ],
    outcome:
      'Delivered a polished movie browsing experience with faster discoverability and improved readability for users across devices.',
    demoUrl: 'https://moviesflixapp.netlify.app/',
    codeUrl: 'https://github.com/hassanusmani21/Moviesflix',
    image: moviesImage,
  },
  {
    id: 'ecommerce',
    slug: 'ecommerce',
    title: 'E-commerce',
    subtitle: 'Category: Web App',
    summary:
      'A storefront-style frontend focused on product listing, product detail views, and user-friendly cart interactions with responsive layouts.',
    problem:
      'Online shopping UIs can feel overloaded and confusing. I aimed to create a cleaner shopping journey with intuitive navigation and actions.',
    role:
      'I implemented the frontend architecture, built reusable UI blocks, and refined layout responsiveness and interaction feedback.',
    stack: ['React', 'JavaScript (ES6+)', 'CSS3', 'State Management', 'Netlify'],
    challenges: [
      'Managing product state and keeping UI interactions predictable.',
      'Balancing visual density with readability across different screens.',
      'Ensuring action buttons and product cards stayed usable on mobile.',
    ],
    outcome:
      'Produced a structured, responsive e-commerce interface that improves browsing clarity and shopping flow for end users.',
    demoUrl: 'https://willowy-naiad-9e85dc.netlify.app/',
    codeUrl: 'https://github.com/hassanusmani21/E-commerce',
    image: ecommerceImage,
  },
  {
    id: 'period-tracker',
    slug: 'period-tracker',
    title: 'Period Tracker',
    subtitle: 'Category: Web App',
    summary:
      'A wellness-focused tracker to help users log cycles, monitor key dates, and follow a simple, privacy-friendly daily experience.',
    problem:
      'Many cycle tracking tools are overly complex or visually crowded. The goal was a lightweight and approachable tracking experience.',
    role:
      'I worked on UI implementation, data entry flow design, and responsive page behavior to keep the tool accessible on all devices.',
    stack: ['React', 'JavaScript (ES6+)', 'CSS3', 'Date Utilities', 'Netlify'],
    challenges: [
      'Designing input and tracking flows that remain simple and clear.',
      'Presenting date-based information without overwhelming the user.',
      'Maintaining privacy-minded UX while keeping useful insights visible.',
    ],
    outcome:
      'Built a focused tracker interface that supports consistent daily use with clean interaction patterns and mobile-friendly behavior.',
    demoUrl: 'https://splendorous-genie-f22c62.netlify.app/',
    codeUrl: 'https://github.com/hassanusmani21/A-women-s-wellness-and-period-tracker',
    image: periodImage,
  },
];

export const getProjectBySlug = (slug) =>
  projectCards.find((project) => project.slug === slug);
