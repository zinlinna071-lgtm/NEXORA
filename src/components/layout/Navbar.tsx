import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Video, FolderKanban, Plus, Globe, Menu, X, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  currentScreen: 'dashboard' | 'chat' | 'create' | 'projects' | 'workspace';
  onNavigate: (screen: 'dashboard' | 'chat' | 'create' | 'projects') => void;
  onNewProject: () => void;
  theme: 'light' | 'dark';
  onThemeChange: (theme: 'light' | 'dark') => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onNewProject,
  theme,
  onThemeChange,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'my' : 'en');
  };

  const handleNavClick = (screen: 'dashboard' | 'chat' | 'create' | 'projects') => {
    onNavigate(screen);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#0b0d13]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Display face, single text element) */}
        <button
          onClick={() => handleNavClick('dashboard')}
          className="flex items-center gap-2 text-left group focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-bold font-display tracking-tight text-white whitespace-nowrap shrink-0">
            {t.brandName}
            <span className="text-cyan-400 text-xs ml-1.5 font-normal tracking-normal font-sans opacity-80">
              STUDIO
            </span>
          </span>
        </button>

        {/* Zone 2: Navigation Links (single-line, clean unboxed typography) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentScreen === 'dashboard'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.navDashboard}
          </button>

          <button
            onClick={() => handleNavClick('chat')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 flex items-center gap-1.5 ${
              currentScreen === 'chat'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-400" />
            {t.navAiChat}
          </button>

          <button
            onClick={() => handleNavClick('create')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentScreen === 'create'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.navCreateVideo}
          </button>

          <button
            onClick={() => handleNavClick('projects')}
            className={`whitespace-nowrap shrink-0 transition-colors py-1 ${
              currentScreen === 'projects' || currentScreen === 'workspace'
                ? 'text-cyan-400 font-semibold border-b-2 border-cyan-400'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t.navMyProjects}
          </button>
        </nav>

        {/* Zone 3: Actions (Language Switch & Primary Action) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onThemeChange(theme === 'dark' ? 'light' : 'dark')}
            title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="theme-toggle"
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>

          {/* Language Switcher */}
          <button
            onClick={toggleLanguage}
            title={language === 'en' ? 'မြန်မာဘာသာသို့ ပြောင်းမည်' : 'Switch to English'}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg text-slate-300 hover:text-white bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors whitespace-nowrap shrink-0"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{language === 'en' ? 'မြန်မာ' : 'English'}</span>
          </button>

          {/* Primary Action Button */}
          <button
            onClick={onNewProject}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 hover:from-cyan-400 hover:to-violet-500 rounded-lg shadow-sm shadow-cyan-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{t.navNewProject}</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0f121a] px-4 pt-3 pb-4 space-y-2">
          <button
            onClick={() => handleNavClick('dashboard')}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${
              currentScreen === 'dashboard'
                ? 'bg-slate-800/60 text-cyan-400 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/40'
            }`}
          >
            {t.navDashboard}
          </button>
          <button
            onClick={() => handleNavClick('chat')}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 ${
              currentScreen === 'chat'
                ? 'bg-slate-800/60 text-cyan-400 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/40'
            }`}
          >
            <Sparkles className="w-4 h-4 text-violet-400" />
            {t.navAiChat}
          </button>
          <button
            onClick={() => handleNavClick('create')}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg ${
              currentScreen === 'create'
                ? 'bg-slate-800/60 text-cyan-400 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/40'
            }`}
          >
            {t.navCreateVideo}
          </button>
          <button
            onClick={() => handleNavClick('projects')}
            className={`w-full text-left px-3 py-2 text-sm rounded-lg flex items-center gap-2 ${
              currentScreen === 'projects' || currentScreen === 'workspace'
                ? 'bg-slate-800/60 text-cyan-400 font-semibold'
                : 'text-slate-300 hover:bg-slate-800/40'
            }`}
          >
            <FolderKanban className="w-4 h-4 text-cyan-400" />
            {t.navMyProjects}
          </button>
          <button
            onClick={() => {
              onNewProject();
              setMobileMenuOpen(false);
            }}
            className="w-full text-center mt-2 px-3 py-2 text-sm font-semibold text-white bg-gradient-to-r from-cyan-500 to-violet-600 rounded-lg"
          >
            + {t.navNewProject}
          </button>
        </div>
      )}
    </header>
  );
};
