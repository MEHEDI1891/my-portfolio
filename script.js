// Portfolio Window Management System
class PortfolioManager {
    constructor() {
        this.currentWindow = 0;
        this.totalWindows = 7;
        this.windows = document.querySelectorAll('.window');
        this.navTabs = document.querySelectorAll('.nav-tab');
        this.minimizeButtons = document.querySelectorAll('.minimize-btn');
        this.navPrevBtn = document.getElementById('navPrev');
        this.navNextBtn = document.getElementById('navNext');
        this.currentWindowSpan = document.getElementById('currentWindow');
        this.totalWindowsSpan = document.getElementById('totalWindows');
        
        this.init();
    }

    init() {
        // Set initial window
        this.setActiveWindow(0);
        
        // Navigation tab listeners
        this.navTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => this.setActiveWindow(index));
        });

        // Minimize button listeners
        this.minimizeButtons.forEach((btn, index) => {
            btn.addEventListener('click', () => this.minimizeWindow(index));
        });

        // Arrow button listeners
        this.navPrevBtn.addEventListener('click', () => this.previousWindow());
        this.navNextBtn.addEventListener('click', () => this.nextWindow());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    setActiveWindow(index) {
        // Validate index
        if (index < 0 || index >= this.totalWindows) return;

        // Remove active class from all windows and tabs
        this.windows.forEach(w => w.classList.remove('active'));
        this.navTabs.forEach(t => t.classList.remove('active'));

        // Add active class to selected window and tab
        this.windows[index].classList.add('active');
        this.navTabs[index].classList.add('active');

        // Update current window
        this.currentWindow = index;
        this.updateIndicator();

        // Smooth scroll window content to top
        this.windows[index].querySelector('.window-content').scrollTop = 0;
    }

    minimizeWindow(index) {
        // Go to next window
        const nextIndex = (index + 1) % this.totalWindows;
        this.setActiveWindow(nextIndex);
    }

    nextWindow() {
        const nextIndex = (this.currentWindow + 1) % this.totalWindows;
        this.setActiveWindow(nextIndex);
    }

    previousWindow() {
        const prevIndex = (this.currentWindow - 1 + this.totalWindows) % this.totalWindows;
        this.setActiveWindow(prevIndex);
    }

    updateIndicator() {
        this.currentWindowSpan.textContent = this.currentWindow + 1;
    }

    handleKeyboard(e) {
        // Arrow keys navigation
        if (e.key === 'ArrowRight') {
            e.preventDefault();
            this.nextWindow();
        } else if (e.key === 'ArrowLeft') {
            e.preventDefault();
            this.previousWindow();
        }
        // Number keys 1-7 for direct window access
        else if (e.key >= '1' && e.key <= '7') {
            const index = parseInt(e.key) - 1;
            if (index < this.totalWindows) {
                this.setActiveWindow(index);
            }
        }
    }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioManager();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Contact form handler
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message')
            };

            // Log form data (In production, you'd send this to a server)
            console.log('Form submitted:', data);
            
            // Show success message
            alert('Thank you for reaching out! I\'ll get back to you soon.');
            contactForm.reset();
        });
    }

    // Button click handlers
    const ctaButtons = document.querySelectorAll('.btn-primary, .btn-secondary');
    const portfolioManager = new PortfolioManager();
    
    ctaButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            if (btn.textContent.includes('My Work')) {
                // Navigate to Projects window
                portfolioManager.setActiveWindow(3);
            } else if (btn.textContent.includes('Hire Me')) {
                // Navigate to Contact window
                portfolioManager.setActiveWindow(6);
            }
        });
    });

    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe skill cards and project cards
    document.querySelectorAll('.skill-card, .project-card, .about-card').forEach(el => {
        el.style.opacity = '0';
        observer.observe(el);
    });

    // Demo: Live demo and GitHub buttons
    document.querySelectorAll('.btn-small').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const text = btn.textContent;
            if (text === 'Live Demo') {
                alert('Opening live demo... (Replace with actual URL)');
            } else if (text === 'GitHub') {
                alert('Opening GitHub repository... (Replace with actual URL)');
            }
        });
    });

    // Social icon hover effect
    document.querySelectorAll('.social-icon, .social-btn, .verify-link').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.05)';
        });
        el.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Prevent default on demo buttons
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-small') || 
        e.target.classList.contains('social-btn') ||
        e.target.classList.contains('social-icon') ||
        e.target.classList.contains('verify-link')) {
        if (e.target.tagName !== 'A') {
            e.preventDefault();
        }
    }
});
