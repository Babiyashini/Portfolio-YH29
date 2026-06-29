// ===== Typing Effect - SIMPLIFIED WORKING VERSION =====
document.addEventListener('DOMContentLoaded', function() {
    const typingText = document.getElementById('typingText');
    if (!typingText) return;
    
    const phrases = [
        'Cloud Engineering Enthusiast | Technology Enthusiast',
        'AWS Enthusiast',
        'Full-Stack Developer',
        'Tech Explorer'
    ];
    
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let isWaiting = false;
    
    function typeEffect() {
        const currentPhrase = phrases[phraseIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            
            if (charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(typeEffect, 500);
                return;
            }
            setTimeout(typeEffect, 30);
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            
            if (charIndex === currentPhrase.length) {
                // Wait before deleting
                setTimeout(() => {
                    isDeleting = true;
                    typeEffect();
                }, 3000);
                return;
            }
            setTimeout(typeEffect, 60);
        }
    }
    
    // Start the effect
    typeEffect();
});

// ===== Animated Counters =====
document.addEventListener('DOMContentLoaded', function() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounters = () => {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };
            updateCounter();
        });
    };
    
    // Trigger counters when stats are visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        });
    });
    
    const statsContainer = document.querySelector('.hero-stats');
    if (statsContainer) {
        observer.observe(statsContainer);
    }
});

// ===== Scroll Animations with GSAP =====
document.addEventListener('DOMContentLoaded', function() {
    // Check if GSAP is loaded
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.log('GSAP not loaded, skipping animations');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate sections on scroll
    document.querySelectorAll('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        });
    });
    
    // Animate skill bars
    document.querySelectorAll('.skill-progress').forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        ScrollTrigger.create({
            trigger: bar.closest('.skill-item'),
            start: 'top 90%',
            onEnter: () => {
                bar.style.width = width;
                bar.style.transition = 'width 1s ease-in-out';
            }
        });
    });
});

// ===== Navigation Active Link =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
});

// ===== Mobile Menu Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    if (hamburger && navLinksContainer) {
        hamburger.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
});

// ===== Theme Toggle =====
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    let isDarkMode = true;
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            isDarkMode = !isDarkMode;
            const root = document.documentElement;
            
            if (isDarkMode) {
                root.style.setProperty('--bg-primary', '#0a1628');
                root.style.setProperty('--bg-secondary', '#111f35');
                root.style.setProperty('--text-primary', '#e8edf5');
                root.style.setProperty('--text-secondary', '#94a9c9');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                root.style.setProperty('--bg-primary', '#f0f4ff');
                root.style.setProperty('--bg-secondary', '#ffffff');
                root.style.setProperty('--text-primary', '#0a1628');
                root.style.setProperty('--text-secondary', '#2a3a5a');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
});

// ===== Smooth Scroll for Nav Links =====
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const hamburger = document.getElementById('hamburger');
    const navLinksContainer = document.querySelector('.nav-links');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
            
            // Close mobile menu
            if (navLinksContainer) {
                navLinksContainer.classList.remove('active');
            }
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        });
    });
});

// ===== Navbar scroll effect =====
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 22, 40, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
        } else {
            navbar.style.background = 'rgba(10, 22, 40, 0.85)';
            navbar.style.boxShadow = 'none';
        }
    });
});

console.log('🚀 Portfolio loaded successfully!');
console.log('👩‍💻 Built with ❤️ by Babiyashini Varadaraj');