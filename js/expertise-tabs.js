document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    // Initialize - show first tab
    if (tabButtons.length > 0 && tabContents.length > 0) {
        tabButtons[0].classList.add('active');
        tabContents[0].classList.add('active');
    }
    
    // Tab click event
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Get the tab ID from data attribute
            const tabId = button.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Animation for certification items and value items
    const animateOnScroll = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(className);
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        elements.forEach(el => {
            observer.observe(el);
        });
    };
    
    // Apply animations
    animateOnScroll(document.querySelectorAll('.certification-item'), 'visible');
    animateOnScroll(document.querySelectorAll('.value-item'), 'visible');
    
    // Logo slider functionality - duplicate logos for infinite scroll
    const logoTrack = document.querySelector('.logo-track');
    if (logoTrack) {
        const logoItems = document.querySelectorAll('.logo-item');
        
        // Clone logo items and append to track for seamless looping
        logoItems.forEach(item => {
            const clone = item.cloneNode(true);
            logoTrack.appendChild(clone);
        });
    }
});
