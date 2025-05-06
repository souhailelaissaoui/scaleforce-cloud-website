document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const video = document.querySelector('.video-background video');
    const ctaButtons = document.querySelectorAll('.cta-button.primary');
    const header = document.querySelector('header');
    const serviceBubbles = document.querySelectorAll('.service-bubble');
    const approachCards = document.querySelectorAll('.approach-card');

    // Video handling
    if (video) {
        video.play().catch(function(error) {
            console.log("Video autoplay failed:", error);
        });
        
        video.addEventListener('loadedmetadata', function() {
            if (window.innerWidth < 768) {
                video.setAttribute('playbackQuality', 'low');
            }
        });

        video.addEventListener('error', function(e) {
            console.error("Error loading video:", e);
            video.style.display = 'none';
        });
    }

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all sections for animation
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Single scroll event handler for all scroll-based functionality
    window.addEventListener('scroll', () => {
        // Navigation highlight on scroll
        let current = '';
        document.querySelectorAll('section[id]').forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= sectionTop - 60) {
                current = section.getAttribute('id');
            }
        });

        document.querySelectorAll('nav ul li a').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
        
        // Handle approach section animations on scroll
        handleApproachAnimations();
        
        // Header background change on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Event Listeners
    if (ctaButtons.length > 0) {
        ctaButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const href = button.getAttribute('href');
                const targetSection = document.querySelector(href);
                if (targetSection) {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    // Approach Section Animations
    function handleApproachAnimations() {
        const approachElements = document.querySelectorAll('[data-aos]');
        
        approachElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            const isVisible = (rect.top <= window.innerHeight * 0.75);
            
            if (isVisible) {
                element.classList.add('aos-animate');
            }
        });
    }
    
    // Initial check for animations
    handleApproachAnimations();

    // Service Bubbles Interaction
    if (serviceBubbles.length > 0) {
        serviceBubbles.forEach(bubble => {
            bubble.addEventListener('mouseenter', () => {
                // Pause the floating animation on hover
                bubble.style.animationPlayState = 'paused';
                
                // Add a scale effect
                bubble.style.transform = 'scale(1.1)';
                bubble.style.zIndex = '10';
                
                // Change background opacity slightly
                bubble.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
            });
            
            bubble.addEventListener('mouseleave', () => {
                // Resume the floating animation
                bubble.style.animationPlayState = 'running';
                
                // Remove scale effect
                bubble.style.transform = '';
                bubble.style.zIndex = '';
                
                // Restore original background
                bubble.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
            });
        });
    }

    // Mobile Menu Functionality
    let mobileMenu = null;
    const MOBILE_BREAKPOINT = 768;

    function createMobileMenu() {
        if (window.innerWidth <= MOBILE_BREAKPOINT && !mobileMenu) {
            const burgerMenu = document.querySelector('.burger-menu');
            if (!burgerMenu) return;
            
            mobileMenu = document.createElement('div');
            mobileMenu.classList.add('mobile-menu');

            // Clone desktop menu items into mobile menu
            const desktopMenuItems = document.querySelectorAll('.desktop-menu li');
            desktopMenuItems.forEach(item => {
                mobileMenu.appendChild(item.cloneNode(true));
            });

            // Insert mobile menu after the burger menu
            burgerMenu.parentNode.insertBefore(mobileMenu, burgerMenu.nextSibling);

            // Toggle mobile menu on burger menu click
            burgerMenu.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                burgerMenu.classList.toggle('active');
            });

            // Close mobile menu when a link is clicked
            mobileMenu.addEventListener('click', (event) => {
                if (event.target.tagName === 'A') {
                    mobileMenu.classList.remove('active');
                    burgerMenu.classList.remove('active');
                }
            });
        }
    }

    function removeMobileMenu() {
        if (window.innerWidth > MOBILE_BREAKPOINT && mobileMenu) {
            mobileMenu.remove();
            mobileMenu = null;
        }
    }

    // Initial check
    createMobileMenu();

    // Handle resize
    window.addEventListener('resize', () => {
        createMobileMenu();
        removeMobileMenu();
    });
});