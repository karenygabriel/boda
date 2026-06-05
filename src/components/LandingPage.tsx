import React from 'react';
import './LandingPage.css';
import landingBg from '../assets/landing-2.webp';

type LandingPageProps = {
    onEnter: () => void;
    isExiting: boolean;
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, isExiting }) => {
    return (
        <div className={`landing-page ${isExiting ? 'exiting' : ''}`}>
            <div className="landing-bg" style={{ backgroundImage: `url(${landingBg})` }} />
            <div className="landing-overlay" />
            <div className="landing-content">
                <button
                    id="enter-button"
                    className="landing-enter-btn"
                    onClick={onEnter}
                >
                    ABRIR
                </button>
                <p className="landing-names">Esta invitacion es para ti</p>
            </div>
        </div>
    );
};

export default LandingPage;
