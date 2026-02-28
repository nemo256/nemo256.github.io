/* App.jsx */
import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import ParticleBackground from './components/ParticleBackground.jsx';
import CursorEffect from './components/CursorEffect.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import TopNav from './components/TopNav.jsx';
import ScrollBar from './components/ScrollBar.jsx';
import HeroSection from './components/HeroSection.jsx';
import AboutSection from './components/AboutSection.jsx';
import ProjectsSection from './components/ProjectsSection.jsx';
import ExperienceSection from './components/ExperienceSection.jsx';
import StatsSection from './components/StatsSection.jsx';
import SkillsSection from './components/SkillsSection.jsx';
import Footer from './components/Footer.jsx';

import './styles/app.css';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <div className="app">
      <ParticleBackground />
      <CursorEffect />

      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <ScrollBar />
          <TopNav />
          <main className="main-scroll">
            <section id="home"><HeroSection /></section>
            <section id="about"><AboutSection /></section>
            <section id="projects"><ProjectsSection /></section>
            <section id="experience"><ExperienceSection /></section>
            <section id="stats"><StatsSection /></section>
            <section id="skills"><SkillsSection /></section>
            <Footer />
          </main>
        </>
      )}
    </div>
  );
}
