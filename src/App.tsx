import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import VideoSlider from './components/VideoSlider';
import EventsSection from './components/EventsSection';
import RsvpForm from './components/RsvpForm';
import { getInviteType } from './utils/inviteType';
import './App.css';

function App() {
  // Read invite type once on mount — stable for the session
  const inviteType = getInviteType();

  const [showLanding, setShowLanding] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // After the CSS transition (1 s) finishes, unmount the landing page
  useEffect(() => {
    if (!isExiting) return;
    const timer = setTimeout(() => setShowLanding(false), 1000);
    return () => clearTimeout(timer);
  }, [isExiting]);

  return (
    <div className="app">
      {showLanding && (
        <LandingPage
          onEnter={handleEnter}
          isExiting={isExiting}
          inviteType={inviteType}
        />
      )}

      {/* Main content sits underneath and becomes visible once landing unmounts */}
      <div className={`main-content ${showLanding && !isExiting ? 'hidden' : 'revealed'}`}>
        <VideoSlider />
        <EventsSection />
        <main>
          <RsvpForm />
        </main>
        <footer className="footer">
          <p>&copy; 2026 - Nuestra Boda</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
