// script.js

// Format date to specific format: YYYY-MM-DD HH:MM:SS
function formatDateTime() {
    const now = new Date();
    return now.toISOString().slice(0, 19).replace('T', ' ');
}

// Update time display
function updateDateTime() {
    const timeDisplay = document.getElementById('current-time');
    if (timeDisplay) {
        timeDisplay.textContent = formatDateTime();
    }
}

// Dark mode toggle functionality
function initializeDarkMode() {
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    
    // Check for saved user preference
    const darkModeSaved = localStorage.getItem('darkMode');
    if (darkModeSaved === 'true') {
        document.body.classList.add('dark-mode');
    }

    // Toggle dark mode
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
    });
}

// Scroll animations
function initializeScrollAnimations() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-visible');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => {
        observer.observe(section);
    });
}

// GSAP Animations
function initializeGSAPAnimations() {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(".hero-content", {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".hero-content",
            start: "top center"
        }
    });

    gsap.from(".section-title", {
        duration: 1,
        y: 30,
        opacity: 0,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".section-title",
            start: "top 80%"
        }
    });

    gsap.from(".skill-card, .project-card, .education-card", {
        duration: 1,
        y: 50,
        opacity: 0,
        stagger: 0.2,
        ease: "power1.out",
        scrollTrigger: {
            trigger: ".skills-grid, .projects-grid, .education-card",
            start: "top 80%"
        }
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initial time update
    updateDateTime();
    
    // Update time every second
    setInterval(updateDateTime, 1000);
    
    // Initialize dark mode
    initializeDarkMode();
    
    // Initialize scroll animations
    initializeScrollAnimations();
    
    // Initialize GSAP animations
    initializeGSAPAnimations();
    
    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
