/* App.jsx */
import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import ParticleBackground from './components/ParticleBackground.jsx';
import CursorEffect from './components/CursorEffect.jsx';
import LoadingScreen from './components/LoadingScreen.jsx';
import TopNav from './components/TopNav.jsx';
import HomeScreen from './components/HomeScreen.jsx';
import ProjectsView from './components/ProjectsView.jsx';
import ProjectDetail from './components/ProjectDetail.jsx';

import './styles/app.css';

const viewVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -40 },
};

const transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] };

export default function App() {
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('home');
  const [selectedProject, setSelectedProject] = useState(null);

  const goToProjects = useCallback(() => {
    setView('projects');
    setSelectedProject(null);
  }, []);

  const goToProject = useCallback((project) => {
    setView('project');
    setSelectedProject(project);
  }, []);

  // Back always goes: project → projects list, projects → home
  const goBack = useCallback(() => {
    if (view === 'project') {
      setView('projects');
      setSelectedProject(null);
    } else if (view === 'projects') {
      setView('home');
    }
  }, [view]);

  return (
    <div className="app">
      <ParticleBackground />
      <CursorEffect />

      {loading && <LoadingScreen onDone={() => setLoading(false)} />}

      {!loading && (
        <>
          <TopNav
            view={view}
            onProjects={goToProjects}
            onBack={goBack}
          />

          <AnimatePresence mode="wait">
            {view === 'home' && (
              <motion.div
                key="home"
                className="view-wrapper"
                variants={viewVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <HomeScreen />
              </motion.div>
            )}

            {view === 'projects' && (
              <motion.div
                key="projects"
                className="view-wrapper"
                variants={viewVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <ProjectsView onSelect={goToProject} />
              </motion.div>
            )}

            {view === 'project' && selectedProject && (
              <motion.div
                key={`project-${selectedProject.id}`}
                className="view-wrapper"
                variants={viewVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={transition}
              >
                <ProjectDetail
                  project={selectedProject}
                  onNavigate={goToProject}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
