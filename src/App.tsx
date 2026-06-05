import { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import VideoSlider from './components/VideoSlider';
import RsvpForm from './components/RsvpForm';
import './App.css';

function App() {
  // showLanding: still mounted / visible
  // isExiting: animation is in progress before unmounting
  const [showLanding, setShowLanding] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    setIsExiting(true);
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
        <LandingPage onEnter={handleEnter} isExiting={isExiting} />
      )}

      {/* Main content sits underneath and becomes visible once landing unmounts */}
      <div className={`main-content ${showLanding && !isExiting ? 'hidden' : 'revealed'}`}>
        <VideoSlider />
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
