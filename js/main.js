/**
 * Flipp VVS AS - Main JavaScript
 * Modern plumbing company website
 */

(function() {
    'use strict';

    // ============================================
    // DOM Elements
    // ============================================
    const header = document.getElementById('header');
    const navToggle = document.getElementById('nav-toggle');
    const mobileNav = document.getElementById('mobile-nav');
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    const cookieConsent = document.getElementById('cookie-consent');
    const acceptCookies = document.getElementById('accept-cookies');
    const declineCookies = document.getElementById('decline-cookies');

    // ============================================
    // Header Scroll Effect
    // ============================================
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    if (navToggle && mobileNav) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
        });

        // Close mobile nav when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                mobileNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = header.offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Contact Form Handler
    // ============================================
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Get form data
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                phone: this.querySelector('#phone').value,
                address: this.querySelector('#address').value,
                serviceType: this.querySelector('#service-type').value,
                message: this.querySelector('#message').value,
                siteVisit: this.querySelector('#site-visit').checked
            };

            // Validate required fields
            if (!formData.name || !formData.email || !formData.phone || !formData.message) {
                alert('Vennligst fyll ut alle obligatoriske felt.');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                alert('Vennligst oppgi en gyldig e-postadresse.');
                return;
            }

            // Simulate form submission (replace with actual API call)
            console.log('Form submitted:', formData);

            // Show success message
            contactForm.style.display = 'none';
            formSuccess.classList.add('show');

            // Scroll to success message
            formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
    }

    // ============================================
    // Phone Number Formatting
    // ============================================
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(function(input) {
        input.addEventListener('input', function(e) {
            // Remove non-digits
            let value = this.value.replace(/\D/g, '');

            // Limit to 8 digits (Norwegian phone numbers)
            if (value.length > 8) {
                value = value.substring(0, 8);
            }

            // Format as XXX XX XXX
            if (value.length >= 6) {
                this.value = value.substring(0, 3) + ' ' + value.substring(3, 5) + ' ' + value.substring(5);
            } else if (value.length >= 3) {
                this.value = value.substring(0, 3) + ' ' + value.substring(3);
            } else {
                this.value = value;
            }
        });
    });

    // ============================================
    // Cookie Consent
    // ============================================
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/;SameSite=Lax';
    }

    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function showCookieConsent() {
        if (cookieConsent && !getCookie('cookieConsent')) {
            setTimeout(function() {
                cookieConsent.classList.add('show');
            }, 1000);
        }
    }

    if (acceptCookies) {
        acceptCookies.addEventListener('click', function() {
            setCookie('cookieConsent', 'accepted', 365);
            cookieConsent.classList.remove('show');
        });
    }

    if (declineCookies) {
        declineCookies.addEventListener('click', function() {
            setCookie('cookieConsent', 'declined', 365);
            cookieConsent.classList.remove('show');
        });
    }

    showCookieConsent();

    // ============================================
    // Scroll Reveal Animation
    // ============================================
    function revealOnScroll() {
        const reveals = document.querySelectorAll('.reveal');
        const windowHeight = window.innerHeight;
        const revealPoint = 150;

        reveals.forEach(function(element) {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Check on load

    // ============================================
    // Project Category Filter
    // ============================================
    const categoryButtons = document.querySelectorAll('.project-category');
    const projectCards = document.querySelectorAll('.project-card');

    if (categoryButtons.length > 0) {
        categoryButtons.forEach(function(button) {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                categoryButtons.forEach(function(btn) {
                    btn.classList.remove('active');
                });

                // Add active class to clicked button
                this.classList.add('active');

                // Get filter value
                const filter = this.getAttribute('data-filter');

                // Filter projects
                projectCards.forEach(function(card) {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        const category = card.getAttribute('data-category');
                        if (category === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }

    // ============================================
    // Active Navigation Link
    // ============================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

        navLinks.forEach(function(link) {
            const href = link.getAttribute('href');
            if (currentPath.includes(href) || (currentPath === '/' && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    // ============================================
    // Lazy Load Images
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        document.querySelectorAll('img[data-src]').forEach(function(img) {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // Click-to-Call Tracking (for analytics)
    // ============================================
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    phoneLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Track phone click (replace with your analytics)
            console.log('Phone click:', this.getAttribute('href'));

            // If using Google Analytics:
            // gtag('event', 'click', {
            //     'event_category': 'Contact',
            //     'event_label': 'Phone Click'
            // });
        });
    });

    // ============================================
    // Email Link Tracking (for analytics)
    // ============================================
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            // Track email click
            console.log('Email click:', this.getAttribute('href'));
        });
    });

    // ============================================
    // Form Input Validation Visual Feedback
    // ============================================
    const formInputs = document.querySelectorAll('.form-input, .form-textarea, .form-select');
    formInputs.forEach(function(input) {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = 'var(--error)';
            } else {
                this.style.borderColor = '';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '';
        });
    });

    // ============================================
    // Escape Key to Close Mobile Nav
    // ============================================
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav && mobileNav.classList.contains('active')) {
            navToggle.classList.remove('active');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // ============================================
    // Initialize
    // ============================================
    console.log('Flipp VVS website initialized');

})();
