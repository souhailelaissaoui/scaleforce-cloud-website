document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const methodologyCards = document.querySelectorAll('.methodology-card');
    const expandableBullets = document.querySelectorAll('.expandable-bullet');
    
    // Intersection Observer for methodology cards animation
    const methodologyObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const methodologyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                methodologyObserver.unobserve(entry.target);
            }
        });
    }, methodologyObserverOptions);

    // Observe methodology cards for animation
    methodologyCards.forEach(card => {
        methodologyObserver.observe(card);
        
        // Add hover animation
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.3)';
            card.style.background = 'rgba(255, 255, 255, 0.08)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
            card.style.background = '';
        });
    });
    
    // Expandable bullets interaction
    expandableBullets.forEach(bullet => {
        const tooltip = bullet.querySelector('.bullet-tooltip');
        
        // Click to toggle tooltip on mobile
        bullet.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                // Close all other tooltips first
                document.querySelectorAll('.bullet-tooltip.active').forEach(tip => {
                    if (tip !== tooltip) {
                        tip.classList.remove('active');
                    }
                });
                
                // Toggle current tooltip
                tooltip.classList.toggle('active');
                e.stopPropagation();
            }
        });
        
        // Close tooltips when clicking elsewhere
        document.addEventListener('click', () => {
            document.querySelectorAll('.bullet-tooltip.active').forEach(tip => {
                tip.classList.remove('active');
            });
        });
    });
    
    // Add methodology link to navigation if not already present
    const desktopMenu = document.querySelector('.desktop-menu');
    if (desktopMenu) {
        const methodologyLink = Array.from(desktopMenu.querySelectorAll('a')).find(link => 
            link.getAttribute('href') === '#methodology'
        );
        
        if (!methodologyLink) {
            // Find the contact link to insert before it
            const contactLink = Array.from(desktopMenu.querySelectorAll('a')).find(link => 
                link.getAttribute('href') === '#contact'
            );
            
            if (contactLink) {
                const contactLi = contactLink.closest('li');
                const methodologyLi = document.createElement('li');
                methodologyLi.innerHTML = '<a href="#methodology">Our Methodology</a>';
                
                desktopMenu.insertBefore(methodologyLi, contactLi);
            }
        }
    }
    
    // Update mobile menu if it exists
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        const methodologyMobileLink = Array.from(mobileMenu.querySelectorAll('a')).find(link => 
            link.getAttribute('href') === '#methodology'
        );
        
        if (!methodologyMobileLink) {
            // Find the contact link to insert before it
            const contactMobileLink = Array.from(mobileMenu.querySelectorAll('a')).find(link => 
                link.getAttribute('href') === '#contact'
            );
            
            if (contactMobileLink) {
                const contactLi = contactMobileLink.closest('li');
                const methodologyLi = document.createElement('li');
                methodologyLi.innerHTML = '<a href="#methodology">Our Methodology</a>';
                
                mobileMenu.insertBefore(methodologyLi, contactLi);
            }
        }
    }
    
    // Additional CSS for mobile view
    if (window.innerWidth <= 768) {
        document.querySelectorAll('.bullet-tooltip').forEach(tooltip => {
            tooltip.style.display = 'none';
        });
        
        document.querySelectorAll('.expandable-bullet').forEach(bullet => {
            bullet.addEventListener('click', () => {
                const tooltip = bullet.querySelector('.bullet-tooltip');
                if (tooltip) {
                    tooltip.style.display = tooltip.style.display === 'block' ? 'none' : 'block';
                }
            });
        });
    }
});
