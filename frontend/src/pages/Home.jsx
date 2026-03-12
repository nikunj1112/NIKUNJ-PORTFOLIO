import { lazy, Suspense } from 'react';
import Loader from '../components/Loader';

const Navbar = lazy(() => import('../components/Navbar'));
const Hero = lazy(() => import('../components/Hero'));
const About = lazy(() => import('../components/About'));
const Skills = lazy(() => import('../components/Skills'));
const Education = lazy(() => import('../components/Education'));
const Projects = lazy(() => import('../components/Projects'));
const GitHubStats = lazy(() => import('../components/GitHubStats'));
const Contact = lazy(() => import('../components/Contact'));
const Footer = lazy(() => import('../components/Footer'));

const Home = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Education />
        <Projects />
        <GitHubStats />
        <Contact />
      </main>
      <Footer />
    </Suspense>
  );
};

export default Home;

