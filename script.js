document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');

    menuToggle.addEventListener('click', () => {
        // Toggle the display of the navbar for mobile
        if (navbar.style.display === 'flex') {
            navbar.style.display = 'none';
        } else {
            navbar.style.display = 'flex';
            navbar.style.flexDirection = 'column';
            navbar.style.position = 'absolute';
            navbar.style.top = '70px';
            navbar.style.right = '5%';
            navbar.style.backgroundColor = '#fff';
            navbar.style.padding = '20px';
            navbar.style.borderRadius = '10px';
            navbar.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
        }
    });

    // 2. Scroll Animation (The "Dynamic" Feel)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select all elements with class 'fade-in'
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
});