// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Hamburger menu functionality
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('mobile-menu');
    navLinks.classList.toggle('active');
    
    // Add haptic feedback (if supported)
    if ('vibrate' in navigator) {
        navigator.vibrate(50);
    }
    
    // Prevent body scroll when menu is open
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
});

// Close mobile menu when clicking on a link
navLinks.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-menu', 'active');
        document.body.style.overflow = 'auto';
    }
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('mobile-menu', 'active');
        document.body.style.overflow = 'auto';
    }
});

// Form submission handler
document.querySelector('form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your inquiry! We will contact you within 30 minutes during business hours.');
});

// Animated counter function
function animateCounter(element, target, duration = 4000) {
    let start = 0;
    const increment = target / (duration / 50); // Slower frame rate
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            start = target;
            clearInterval(timer);
        }
        
        // Format numbers with + for certain stats
        if (element.dataset.suffix) {
            element.textContent = Math.floor(start) + element.dataset.suffix;
        } else {
            element.textContent = Math.floor(start);
        }
    }, 50);
}

// Intersection Observer for stats animation
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                if (!stat.classList.contains('animated')) {
                    const target = parseInt(stat.dataset.target);
                    animateCounter(stat, target, 4000);
                    stat.classList.add('animated');
                }
            });
        }
    });
}, { threshold: 0.5 });

// Observe the stats section
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(26, 54, 93, 0.95)';
    } else {
        header.style.background = 'linear-gradient(135deg, #1a365d 0%, #2d5a87 100%)';
    }
});