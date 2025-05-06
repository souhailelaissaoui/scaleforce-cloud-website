document.addEventListener('DOMContentLoaded', () => {
    // Get the about section
    const aboutSection = document.querySelector('.about-section');
    
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.75 &&
            rect.bottom >= 0
        );
    }
    
    // Function to handle scroll and check if about section is in view
    function handleScroll() {
        if (aboutSection && isInViewport(aboutSection)) {
            aboutSection.classList.add('in-view');
        }
    }
    
    // Initial check on page load
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Add hover effects to the value items
    const valueItems = document.querySelectorAll('.value-item');
    valueItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            const icon = item.querySelector('i');
            icon.style.color = 'var(--secondary-color)';
            icon.style.transform = 'scale(1.2)';
        });
        
        item.addEventListener('mouseleave', () => {
            const icon = item.querySelector('i');
            icon.style.color = '';
            icon.style.transform = '';
        });
    });
    
    // Smooth scroll to about section when clicking About Me in nav
    const aboutNavLink = document.querySelector('nav ul li a[href="#about"]');
    if (aboutNavLink) {
        aboutNavLink.addEventListener('click', (e) => {
            e.preventDefault();
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
