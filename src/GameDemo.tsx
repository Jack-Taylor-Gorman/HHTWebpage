import React, { useState, useEffect } from 'react';
import './index.css';

const IMAGES = [
    '/assets/slide1.jpg',
    '/assets/insta_qr.jpg',
    '/assets/slide2.jpg',
    '/assets/insta_qr.jpg',
    '/assets/slide3.jpg'
];

export const GameDemo: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % IMAGES.length);
        }, 3000); // 3 seconds per slide
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="game-demo-outer">
            <div className="game-demo-wrapper slider-container">
                {IMAGES.map((src, index) => (
                    <div key={index} className={`slide-wrapper ${index === currentIndex ? 'active' : ''}`}>
                        {/* Background Blur Layer */}
                        <img
                            src={src}
                            alt=""
                            className="slide-bg-blur"
                        />
                        {/* Foreground Contain Layer */}
                        <img
                            src={src}
                            alt={`Gameplay Screenshot ${index + 1}`}
                            className="slide-content"
                        />
                    </div>
                ))}
            </div>
            <div className="coming-soon-label">
                COMING SOON...
            </div>
        </div>
    );
};
