
import './App.css';
import {Home} from './pages/about';
import { Header } from './pages/Header';
import {Skill} from './pages/skill'
import { Projects } from './pages/projects';
import {ContactForm} from './pages/contact'
import {Footer} from './pages/footer'

function App() {
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
