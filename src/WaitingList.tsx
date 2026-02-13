import React, { useState } from 'react';
import './index.css'; // Ensure global styles are applied
import { GameDemo } from './GameDemo';

export const WaitingList: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [price, setPrice] = useState('');
    const [paymentPreference, setPaymentPreference] = useState('subscription');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !email) {
            setError('Please fill in all fields');
            return;
        }

        // Simulating API call
        console.log({ name, email, price, paymentPreference });
        setError('');
        alert('Thanks for joining! We will notify you when we launch.');
        setName('');
        setEmail('');
        setPrice('');
        setPaymentPreference('subscription');
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="waiting-list-container success">
                <h1>Welcome to the Legion!</h1>
                <p>You're on the list. We'll be in touch soon.</p>
                <div className="note-display active">
                    <div className="hole-number">✓</div>
                    <div className="note-name">Subscribed</div>
                </div>
            </div>
        );
    }

    return (
        <div className="waiting-list-page">
            <div className="waiting-list-container">
                <header>
                    <div className="logo-container">
                        <img src="/assets/logo.png" alt="Harmonica Hero Logo" className="logo-img" />
                    </div>
                    <h1>Harmonica Hero Tabs</h1>
                    <p className="subtitle">Play immediately. Have fun. Sound great.</p>
                </header>

                <main className="main-content">
                    <div className="content-split">

                        <div className="form-section">
                            <div className="card-form">
                                <h2>Join the Waiting List</h2>
                                <p>Be the first to know when we launch.</p>

                                {error && <div className="error-message">{error}</div>}

                                <form onSubmit={handleSubmit}>
                                    <div className="form-group">
                                        <label htmlFor="name">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            placeholder="Your Name"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>Payment Preference</label>
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
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="price">What is a fair price for this app?</label>
                                        <input
                                            type="number"
                                            id="price"
                                            value={price}
                                            onChange={(e) => setPrice(e.target.value)}
                                            placeholder="0.00"
                                            min="0"
                                            step="0.01"
                                        />
                                    </div>

                                    <button type="submit" className="submit-btn">Join the List</button>
                                </form>
                            </div>
                        </div>

                        <div className="demo-section">
                            <GameDemo />
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
                </main>
            </div >
        </div >
    );
};
