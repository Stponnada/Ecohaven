/**
 * EcoHaven Website - JavaScript
 * Handles navigation, animations, and interactive features
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initNavigation();
    initSmoothScroll();
    initScrollAnimations();
    initCopyUPI();
    initMobileMenu();
    initLightbox();
});

/**
 * Navigation - Handles active state and scroll behavior
 */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Update navbar style on scroll
    function updateNavbar() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Update active nav link based on scroll position
    function updateActiveLink() {
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', () => {
        updateNavbar();
        updateActiveLink();
    });

    // Initial call
    updateNavbar();
    updateActiveLink();
}

/**
 * Smooth Scroll - Handles anchor link clicks
 */
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');

            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                const navHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navLinks = document.getElementById('navLinks');
                navLinks.classList.remove('active');
            }
        });
    });
}

/**
 * Scroll Animations - Animate elements on scroll
 */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll(
        '.product-card, .feature-card, .testimonial-card, ' +
        '.video-placeholder, .fundraiser-progress, .leaderboard-card'
    );

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(element);
    });

    // Add animation class styles
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/**
 * Copy UPI ID - Handles copy to clipboard functionality
 */
function initCopyUPI() {
    const copyBtn = document.getElementById('copyUpiBtn');
    const upiId = document.querySelector('.upi-id');

    if (copyBtn && upiId) {
        copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(upiId.textContent);

                // Visual feedback
                const originalHTML = copyBtn.innerHTML;
                copyBtn.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M20 6L9 17l-5-5"/>
                    </svg>
                `;
                copyBtn.style.color = '#22c55e';

                setTimeout(() => {
                    copyBtn.innerHTML = originalHTML;
                    copyBtn.style.color = '';
                }, 2000);

            } catch (err) {
                console.error('Failed to copy UPI ID:', err);

                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = upiId.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            }
        });
    }
}

/**
 * Mobile Menu - Handles hamburger menu toggle
 */
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');
    const hamburger = mobileMenuBtn?.querySelector('.hamburger');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Animate hamburger to X
            if (navLinks.classList.contains('active')) {
                hamburger.style.background = 'transparent';
                hamburger.style.transform = 'rotate(45deg)';
            } else {
                hamburger.style.background = '';
                hamburger.style.transform = '';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                hamburger.style.background = '';
                hamburger.style.transform = '';
            }
        });
    }
}

/**
 * Fundraiser Progress Animation
 * Animates the progress bar when it comes into view
 */
function animateProgress() {
    const progressFill = document.querySelector('.progress-fill');

    if (progressFill) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Get the target width from inline style
                    const targetWidth = progressFill.style.width;
                    progressFill.style.width = '0%';

                    setTimeout(() => {
                        progressFill.style.width = targetWidth;
                    }, 300);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(progressFill.parentElement);
    }
}

// Initialize progress animation
document.addEventListener('DOMContentLoaded', animateProgress);

/**
 * Utility: Throttle function for scroll events
 */
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Console greeting for developers
 */
console.log('%c🏠 EcoHaven', 'font-size: 24px; font-weight: bold; color: #22c55e;');
console.log('%cBuilding portable homes for a mobile world', 'font-size: 14px; color: #666;');
console.log('---');
console.log('Interested in our mission? Visit #fundraiser to support us!');
/**
 * Lightbox - Handles opening images/videos in a larger view
 */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxClose = document.getElementById('lightboxClose');
    const mediaContainer = document.getElementById('lightboxMediaContainer');
    const title = document.getElementById('lightboxTitle');
    const description = document.getElementById('lightboxDescription');
    const collageItems = document.querySelectorAll('.collage-item');

    if (!lightbox || !collageItems.length) return;

    collageItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const video = item.querySelector('video');
            const itemTitle = item.querySelector('h3').textContent;
            const itemDesc = item.querySelector('p').textContent;

            mediaContainer.innerHTML = '';

            if (img) {
                const newImg = document.createElement('img');
                newImg.src = img.src;
                newImg.alt = img.alt;
                mediaContainer.appendChild(newImg);
            } else if (video) {
                const newVideo = document.createElement('video');
                newVideo.src = video.querySelector('source').src;
                newVideo.controls = true;
                newVideo.autoplay = true;
                mediaContainer.appendChild(newVideo);
            }

            title.textContent = itemTitle;
            description.textContent = itemDesc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
        mediaContainer.innerHTML = ''; // Stop video playback
    };

    lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}
