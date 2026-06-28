// ===== Typing Effect =====
const typingText = document.getElementById('typingText');
const phrases = ['Cloud Engineer', 'AWS Enthusiast', 'Full-Stack Developer', 'Tech Explorer'];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
    }
    
    if (!isDeleting && charIndex === currentPhrase.length) {
        isDeleting = true;
        setTimeout(typeEffect, 2000);
        return;
    }
    
    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        setTimeout(typeEffect, 500);
        return;
    }
    
    setTimeout(typeEffect, isDeleting ? 50 : 100);
}

// Start typing effect
typeEffect();

// ===== Animated Counters =====
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

// ===== Scroll Animations with GSAP =====
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

// ===== Counter animation on scroll =====
ScrollTrigger.create({
    trigger: '.hero-stats',
    start: 'top 80%',
    onEnter: animateCounters,
    once: true
});

// ===== Navigation Active Link =====
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

// ===== Mobile Menu Toggle =====
const hamburger = document.getElementById('hamburger');
const navLinksContainer = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// ===== Theme Toggle =====
const themeToggle = document.getElementById('themeToggle');
let isDarkMode = true;

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

// ===== Smooth Scroll for Nav Links =====
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        targetSection.scrollIntoView({ behavior: 'smooth' });
        
        // Close mobile menu
        navLinksContainer.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ===== Contact Form =====
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate sending
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2000);
    }, 1500);
});

// ===== Navbar scroll effect =====
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

console.log('Portfolio loaded successfully!');
console.log('Built with  by Babiyashini Varadaraj');

// ===== Contact Form Handler =====
const contactForm = document.querySelector('form[action*="formsubmit"]');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;
        
        // Re-enable after 5 seconds (in case of redirect)
        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 5000);
    });
}