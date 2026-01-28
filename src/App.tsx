import { useState } from 'react';
import { MainLayout } from './layout/MainLayout';
import { BasicsContent } from './content/BasicsContent';
import { EasingContent } from './content/EasingContent';
import { ThreeDContent } from './content/ThreeDContent';
import { SpringsContent } from './content/SpringsContent';
import { TransitionsContent } from './content/TransitionsContent';
import { TypographyContent } from './content/TypographyContent';
import { AudioContent } from './content/AudioContent';
import { LanguageProvider, useLanguage } from './i18n/LanguageContext';

function AppContent() {
  const [category, setCategory] = useState('basics');
  const { t } = useLanguage();

  return (
    <MainLayout activeCategory={category} onSelectCategory={setCategory}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 className="title-gradient" style={{ fontSize: '32px', marginBottom: '8px' }}>
          {category === 'basics' && t('nav.basics')}
          {category === 'easing' && t('nav.easing')}
          {category === '3d' && t('nav.3d')}
          {category === 'springs' && t('nav.springs')}
          {category === 'transitions' && t('nav.transitions')}
          {category === 'typography' && t('nav.typography')}
          {category === 'audio' && t('nav.audio')}
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '18px', marginBottom: '32px' }}>
          {t('app.subtitle')}
        </p>

        {category === 'basics' && <BasicsContent />}
        {category === 'easing' && <EasingContent />}
        {category === '3d' && <ThreeDContent />}
        {category === 'springs' && <SpringsContent />}
        {category === 'transitions' && <TransitionsContent />}
        {category === 'typography' && <TypographyContent />}
        {category === 'audio' && <AudioContent />}

        {category !== 'basics' && category !== 'easing' && category !== '3d' && category !== 'springs' && category !== 'transitions' && category !== 'typography' && category !== 'audio' && (
          <div className="glass-panel" style={{ padding: '40px', borderRadius: '16px', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>{t('app.construction')}</p>
          </div>
        )}
      </div>
    </MainLayout>
  );
}



function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
