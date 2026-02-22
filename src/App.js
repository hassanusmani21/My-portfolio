
import './App.css';
import {Home} from './pages/about';
import { Header } from './pages/Header';
import {Skill} from './pages/skill'
import { Projects } from './pages/projects';
import {ContactForm} from './pages/contact'
import {Footer} from './pages/footer'
import { getProjectBySlug } from './data/projectsData';
import { ProjectDetailPage } from './pages/projectDetail';

const getProjectSlugFromPath = (pathname) => {
  const normalizedPath = pathname.replace(/\/+$/, '') || '/';
  if (!normalizedPath.startsWith('/projects/')) {
    return null;
  }

  const slug = normalizedPath.replace('/projects/', '').split('/')[0];
  return slug ? decodeURIComponent(slug) : null;
};

function App() {
  const projectSlug = getProjectSlugFromPath(window.location.pathname);
  const selectedProject = projectSlug ? getProjectBySlug(projectSlug) : null;

  if (projectSlug) {
    return (
      <>
        <ProjectDetailPage project={selectedProject} />
        <Footer/>
      </>
    );
  }

  return (
    <>
    <Header/>
    <Home/>
    <Skill/>
    <Projects/>
    <ContactForm/>
    <Footer/>
    </>
  );
}

export default App;
