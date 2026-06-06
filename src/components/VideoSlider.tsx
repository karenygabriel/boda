import React from 'react';
import './VideoSlider.css';
import sliderBg from '../assets/slider-1.webp';
import videoSrc from '../assets/videoslider_compressed.mp4';

const VideoSlider: React.FC = () => {
  return (
    <div className="video-slider">
      <video
        className="background-video"
        src={videoSrc}
        poster={sliderBg}
        autoPlay
        muted
        loop
        playsInline
      />
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
