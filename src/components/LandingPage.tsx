import React from 'react';
import './LandingPage.css';
import landingBg from '../assets/landing-2.webp';
import type { InviteType } from '../utils/inviteType';

type LandingPageProps = {
    onEnter: () => void;
    isExiting: boolean;
    inviteType: InviteType;
};

const LandingPage: React.FC<LandingPageProps> = ({ onEnter, isExiting, inviteType }) => {
    const isFamiliar = inviteType === 'familiar';

    return (
        <div className={`landing-page ${isExiting ? 'exiting' : ''}`}>
            <div className="landing-bg" style={{ backgroundImage: `url(${landingBg})` }} />
            <div className="landing-overlay" />
            <div className="landing-content">
                {isFamiliar && (
                    <span className="landing-invite-badge">
                        👨‍👩‍👧‍👦 Invitación Familiar
                    </span>
                )}
                <button
                    id="enter-button"
                    className="landing-enter-btn"
                    onClick={onEnter}
                >
                    ABRIR
                </button>
                <p className="landing-names">
                    {isFamiliar
                        ? 'Esta invitación es especialmente para ti y tu familia'
                        : 'Esta invitación es para ti'}
                </p>
            </div>
        </div>
    );
};

export default LandingPage;
