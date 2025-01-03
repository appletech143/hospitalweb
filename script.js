// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function() {
    // Performance optimization - Cache DOM elements
    const navbar = document.querySelector('.navbar');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');
    const preloader = document.querySelector('.preloader');
    
    // Remove preloader after content loads
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.remove(), 500);
    });

    // Optimize scroll performance with requestAnimationFrame
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
        lastScroll = window.pageYOffset;
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll(lastScroll);
                ticking = false;
            });
            ticking = true;
        }
    });

    function handleScroll(scrollPos) {
        if (scrollPos > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }

    // Mobile menu toggle with performance optimization
    navToggle?.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Optimize dropdown interactions
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        const content = dropdown.querySelector('.dropdown-content');

        if (window.innerWidth > 768) {
            // Desktop - Use hover
            dropdown.addEventListener('mouseenter', () => {
                content.style.display = 'block';
                requestAnimationFrame(() => {
                    content.style.opacity = '1';
                });
            });

            dropdown.addEventListener('mouseleave', () => {
                content.style.opacity = '0';
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            });
        } else {
            // Mobile - Use click
            link?.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Optimize form submission
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            
            try {
                // Add your form submission logic here
                alert('Thank you for your message. We will get back to you soon!');
                contactForm.reset();
            } catch (error) {
                console.error('Error submitting form:', error);
                alert('There was an error sending your message. Please try again.');
            } finally {
                submitBtn.disabled = false;
            }
        });
    }

    // Navigation Active State
    const currentLocation = location.href;
    const navLinksList = document.querySelectorAll('.nav-links a');
    const menuLength = navLinksList.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (navLinksList[i].href === currentLocation) {
            navLinksList[i].classList.add('active');
        }
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
        }
    });

    // Close dropdowns when window is resized above mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            document.querySelectorAll('.dropdown').forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });

    // Add animation to service cards on scroll
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.service-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.5s ease-out';
        observer.observe(card);
    });
});
