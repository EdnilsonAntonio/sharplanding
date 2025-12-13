// ============================================
// SMOOTH SCROLL
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 85;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Close mobile menu if open
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        }
    });
});

// ============================================
// HEADER SCROLL EFFECT
// ============================================
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// ============================================
// MOBILE MENU TOGGLE
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (navToggle && navMenu) {
        console.log('Menu elements found');
        
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            console.log('Toggle clicked');
            console.log('Menu classes before:', navMenu.className);
            
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            console.log('Menu classes after:', navMenu.className);
            console.log('Menu has active:', navMenu.classList.contains('active'));
            
            // Prevent body scroll when menu is open
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (navMenu.classList.contains('active') && 
                !navToggle.contains(e.target) && 
                !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking on a link
        const navLinks = navMenu.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    } else {
        console.error('Menu elements not found:', { navToggle, navMenu });
    }
});

// ============================================
// SCROLL ANIMATIONS
// ============================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Optional: stop observing after animation
            // observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
});

// Observe cards and items
document.querySelectorAll('.value__card, .services__card, .portfolio__item, .why__point, .why__visual').forEach(el => {
    observer.observe(el);
});

// ============================================
// STAGGERED ANIMATION DELAYS
// ============================================
document.querySelectorAll('[data-delay]').forEach(el => {
    const delay = el.getAttribute('data-delay');
    el.style.transitionDelay = `${delay}ms`;
});

// ============================================
// BUTTON HOVER EFFECTS
// ============================================
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
    });

    btn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// PORTFOLIO ITEM INTERACTIONS
// ============================================
document.querySelectorAll('.portfolio__item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px)';
    });

    item.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
    });
});

// ============================================
// FORM HANDLING (if you add a form later)
// ============================================
// This is a placeholder for future form functionality
// You can integrate with your preferred form handler

// ============================================
// PERFORMANCE OPTIMIZATION
// ============================================
// Lazy load images (if you add real images later)
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// ACTIVE NAVIGATION HIGHLIGHT
// ============================================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

function highlightNavigation() {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ============================================
// CONSOLE MESSAGE
// ============================================
console.log('%cSharpLanding', 'font-size: 20px; font-weight: bold; color: #64ffda;');
console.log('%cLanding Pages que Convertem. Criadas Rápido.', 'font-size: 14px; color: #8892b0;');

