// Interactivity for Recollect Landing Page

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileOverlay = document.querySelector('.mobile-menu-overlay');
    
    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', () => {
            mobileOverlay.classList.toggle('active');
            mobileToggle.classList.toggle('active');
            
            // Transform hamburger lines
            const spans = mobileToggle.querySelectorAll('span');
            if (mobileOverlay.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close overlay when clicking a link
        const mobileLinks = mobileOverlay.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileOverlay.classList.remove('active');
                mobileToggle.classList.remove('active');
                mobileToggle.querySelectorAll('span').forEach(s => s.style.transform = 'none');
                mobileToggle.querySelectorAll('span')[1].style.opacity = '1';
            });
        });
    }

    // 2. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        trigger.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));
            
            // If it wasn't active, open it
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 3. Scroll Reveal Animations (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 4. Interactive UI Elements in Mock Devices
    // Toggle switches on/off in the third feature visual mock device
    const mockToggles = document.querySelectorAll('.mock-screen .toggle');
    mockToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
        });
    });

    // Audio play button simulation in the first feature visual mock device
    const playBtn = document.querySelector('.play-btn');
    const audioWaves = document.querySelectorAll('.audio-wave span');
    let audioPlaying = false;
    let waveInterval;

    if (playBtn && audioWaves.length > 0) {
        playBtn.addEventListener('click', () => {
            audioPlaying = !audioPlaying;
            if (audioPlaying) {
                playBtn.textContent = '⏸';
                waveInterval = setInterval(() => {
                    audioWaves.forEach(wave => {
                        const randomHeight = Math.floor(Math.random() * 20) + 8;
                        wave.style.height = `${randomHeight}px`;
                    });
                }, 150);
            } else {
                playBtn.textContent = '▶';
                clearInterval(waveInterval);
                audioWaves.forEach((wave, idx) => {
                    const defaultHeights = [15, 25, 15, 20, 15];
                    wave.style.height = `${defaultHeights[idx] || 15}px`;
                });
            }
        });
    }
});
