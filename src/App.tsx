/**
 * NEXORA Video Creation Studio
 * Main Application Shell & Navigation
 */

import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardScreen } from './components/dashboard/DashboardScreen';
import { AiChatScreen } from './components/chat/AiChatScreen';
import { CreateVideoScreen } from './components/create/CreateVideoScreen';
import { ProjectsScreen } from './components/projects/ProjectsScreen';
import { WorkspaceScreen } from './components/workspace/WorkspaceScreen';

type Screen = 'dashboard' | 'chat' | 'create' | 'projects' | 'workspace';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('dashboard');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      return localStorage.getItem('nexora_ui_theme') === 'light' ? 'light' : 'dark';
    } catch {
      return 'dark';
    }
  });
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [pendingIdea, setPendingIdea] = useState<{
    title?: string;
    idea?: string;
    videoType?: string;
  } | undefined>(undefined);

  const handleThemeChange = (nextTheme: 'light' | 'dark') => {
    setTheme(nextTheme);
    try {
      localStorage.setItem('nexora_ui_theme', nextTheme);
    } catch {
      // Preference persistence is optional.
    }
  };

  const handleNavigate = (screen: 'dashboard' | 'chat' | 'create' | 'projects') => {
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenProject = (id: string) => {
    setSelectedProjectId(id);
    setCurrentScreen('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewProjectClick = () => {
    setPendingIdea(undefined);
    setCurrentScreen('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCreateFromIdea = (idea: {
    title: string;
    idea: string;
    videoType?: string;
  }) => {
    setPendingIdea(idea);
    setCurrentScreen('create');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleProjectCreated = (newId: string) => {
    setSelectedProjectId(newId);
    setPendingIdea(undefined);
    setCurrentScreen('workspace');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <LanguageProvider>
      <div className={`app-shell theme-${theme} min-h-screen flex flex-col selection:bg-cyan-500/20`}>
        <Navbar
          currentScreen={currentScreen}
          onNavigate={handleNavigate}
          onNewProject={handleNewProjectClick}
          theme={theme}
          onThemeChange={handleThemeChange}
        />

        <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {currentScreen === 'dashboard' && (
            <DashboardScreen
              onNavigate={handleNavigate}
              onOpenProject={handleOpenProject}
            />
          )}

          {currentScreen === 'chat' && (
            <AiChatScreen
              onCreateProjectFromIdea={handleCreateFromIdea}
            />
          )}

          {currentScreen === 'create' && (
            <CreateVideoScreen
              initialIdea={pendingIdea}
              onProjectCreated={handleProjectCreated}
              onCancel={() => handleNavigate('dashboard')}
            />
          )}

          {currentScreen === 'projects' && (
            <ProjectsScreen
              onOpenProject={handleOpenProject}
              onNewProject={handleNewProjectClick}
            />
          )}

          {currentScreen === 'workspace' && selectedProjectId && (
            <WorkspaceScreen
              projectId={selectedProjectId}
              onBack={() => handleNavigate('projects')}
            />
          )}
        </main>

        <Footer />
      </div>
    </LanguageProvider>
  );
}
