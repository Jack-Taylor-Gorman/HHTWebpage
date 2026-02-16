import React, { useState, useEffect } from 'react';
import './index.css'; // Ensure global styles are applied
import './index.css'; // Ensure global styles are applied

export const WaitingList: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [price, setPrice] = useState('');
    const [paymentPreference, setPaymentPreference] = useState('subscription');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');
    const [showInsta, setShowInsta] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setShowInsta(prev => !prev);
        }, 3000); // Toggle every 3 seconds
        return () => clearInterval(interval);
    }, []);

    const encode = (data: { [key: string]: string }) => {
        return Object.keys(data)
            .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
            .join("&");
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            setError('Please fill in all fields');
            return;
        }

        fetch('/', {
            method: 'POST',
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": "waiting-list",
                name,
                email,
                paymentPreference,
                price
            })
        })
            .then(() => {
                setSubmitted(true);
                setError('');
            })
            .catch((error) => {
                console.error('Form submission error:', error);
                setError('Something went wrong. Please try again.');
            });
    };

    if (submitted) {
        return (
            <div className="waiting-list-container success">
                <h1>You're in!</h1>
                <p>We'll be in touch soon.</p>
                <div className="note-display active">
                    <div className="hole-number">✓</div>
                    <div className="note-name">Subscribed</div>
                </div>
                <div className="social-follow">
                    <p>Follow us on Instagram for updates!</p>
                    <a href="https://www.instagram.com/harmonicaher0" target="_blank" rel="noopener noreferrer" className="insta-link">
                        @harmonicaher0
                    </a>
                </div>
            </div>
        );
    }

    return (
        <div className="waiting-list-page">
            <div className="waiting-list-container">
                <header>
                    <a href="https://www.instagram.com/harmonicaher0" target="_blank" rel="noopener noreferrer" className="logo-slider-link">
                        <div className="logo-container logo-slider">
                            <img
                                src="/assets/logo.png"
                                alt="Harmonica Hero Logo"
                                className={`logo-img main-logo ${showInsta ? 'hidden' : 'visible'}`}
                            />
                            <img
                                src="/assets/insta_qr.jpg"
                                alt="Instagram QR"
                                className={`logo-img insta-logo ${showInsta ? 'visible' : 'hidden'}`}
                            />
                        </div>
                    </a>
                    <h1>Harmonica Hero Tabs</h1>
                </header>

                <main className="main-content">
                    <div className="form-section centered-form">
                        <div className="card-form">
                            <h2>Join the Waiting List</h2>

                            {error && <div className="error-message">{error}</div>}

                            <form onSubmit={handleSubmit} data-netlify="true" name="waiting-list">
                                <input type="hidden" name="form-name" value="waiting-list" />
                                <div className="form-group">
                                    <label htmlFor="name">Name <span className="required">*</span></label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Your Name"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email <span className="required">*</span></label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="price">What is a fair price for this app USD? <span className="optional">(Optional)</span></label>
                                    <input
                                        type="number"
                                        id="price"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        placeholder="0.00"
                                        min="0"
                                        step="0.01"
                                        name="price"
                                        className="no-spinner"
                                    />
                                </div>

                                <div className="form-group payment-group">
                                    <div className="payment-toggle">
                                        <button
                                            type="button"
                                            className={`toggle-btn ${paymentPreference === 'subscription' ? 'active' : ''}`}
                                            onClick={() => setPaymentPreference('subscription')}
                                        >
                                            Subscription
                                        </button>
                                        <button
                                            type="button"
                                            className={`toggle-btn ${paymentPreference === 'one-time' ? 'active' : ''}`}
                                            onClick={() => setPaymentPreference('one-time')}
                                        >
                                            One-Time
                                        </button>
                                    </div>
                                    <input type="hidden" name="paymentPreference" value={paymentPreference} />
                                </div>

                                <button type="submit" className="submit-btn">Join the List</button>
                            </form>
                        </div>
                    </div>

                    <div className="video-section">
                        <h2>See it in Action</h2>
                        <div className="video-container">
                            <iframe
                                width="560"
                                height="315"
                                src="https://www.youtube.com/embed/aiwayJanHDk"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            ></iframe>
                        </div>
                    </div>

                    <footer className="social-footer">
                        <p>Follow us on Instagram!</p>
                        <a href="https://www.instagram.com/harmonicaher0" target="_blank" rel="noopener noreferrer" className="insta-link">
                            @harmonicaher0
                        </a>
                    </footer>
                </main>
            </div>
        </div>
    );
};
