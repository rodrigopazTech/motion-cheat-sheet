import React from 'react';
import { Play, Box, Move, Layers, Globe, Zap, Type, Music } from 'lucide-react';
import './MainLayout.css';
import { useLanguage } from '../i18n/LanguageContext';

interface NavItem {
    id: string;
    labelKey: string;
    icon: React.ReactNode;
}

const NAV_ITEMS: NavItem[] = [
    { id: 'basics', labelKey: 'nav.basics', icon: <Play size={20} /> },
    { id: 'easing', labelKey: 'nav.easing', icon: <Zap size={20} /> },
    { id: '3d', labelKey: 'nav.3d', icon: <Box size={20} /> },
    { id: 'springs', labelKey: 'nav.springs', icon: <Move size={20} /> },
    { id: 'transitions', labelKey: 'nav.transitions', icon: <Layers size={20} /> },
    { id: 'typography', labelKey: 'nav.typography', icon: <Type size={20} /> },
    { id: 'audio', labelKey: 'nav.audio', icon: <Music size={20} /> },
];

interface MainLayoutProps {
    children: React.ReactNode;
    activeCategory: string;
    onSelectCategory: (id: string) => void;
}
export const MainLayout: React.FC<MainLayoutProps> = ({ children, activeCategory, onSelectCategory }) => {
    const { t, language, toggleLanguage } = useLanguage();

    return (
        <div className="app-container">
            {/* Mobile Header */}
            <header className="mobile-header glass-panel">
                <div className="logo-area-mobile">
                    <span className="logo-icon">🎬</span>
                    <h1 className="app-title title-gradient">MotionCheat</h1>
                </div>
                <button onClick={toggleLanguage} className="lang-toggle-mobile">
                    <Globe size={18} />
                    <span>{language.toUpperCase()}</span>
                </button>
            </header>

            <aside className="sidebar glass-panel">
...

                <div className="logo-area">
                    <span className="logo-icon">🎬</span>
                    <h1 className="app-title title-gradient">MotionCheat</h1>
                </div>

                <nav className="nav-menu">
                    {NAV_ITEMS.map((item) => (
                        <button
                            key={item.id}
                            className={`nav-item ${activeCategory === item.id ? 'active' : ''}`}
                            onClick={() => onSelectCategory(item.id)}
                        >
                            {item.icon}
                            <span className="nav-label">{t(item.labelKey)}</span>
                        </button>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <button
                        onClick={toggleLanguage}
                        className="nav-item"
                        style={{ marginTop: 'auto', marginBottom: 10, justifyContent: 'center', background: 'rgba(255,255,255,0.05)' }}
                    >
                        <Globe size={18} />
                        <span className="nav-label" style={{ marginLeft: 8 }}>
                            {language === 'en' ? 'Español' : 'English'}
                        </span>
                    </button>
                    <p className="footer-text">{t('nav.footer')}</p>
                </div>
            </aside>

            <main className="content-area">
                {children}
            </main>
        </div>
    );
};
