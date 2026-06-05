import React from 'react';
import './VideoSlider.css';
import sliderBg from '../assets/slider-1.webp';

const VideoSlider: React.FC = () => {
  return (
    <div className="video-slider">
      <img src={sliderBg} alt="Wedding background" className="background-image" />
      <div className="overlay"></div>
      <div className="content">
        <h1 className="fancy-title">¡Nos casamos!</h1>
        <p className="subtitle">Acompáñanos en este día tan especial</p>
        <p className="subtitle">viernes 06 de noviembre 2026 · Karen &amp; Gabriel</p>
      </div>
    </div>
  );
};

export default VideoSlider;
