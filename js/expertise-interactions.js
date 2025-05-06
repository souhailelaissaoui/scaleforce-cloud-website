document.addEventListener('DOMContentLoaded', () => {
    // Initialize carousel dots
    const logoCarousel = document.querySelector('.logo-carousel');
    const carouselDots = document.querySelector('.carousel-dots');
    
    if (logoCarousel && carouselDots) {
        const slides = document.querySelectorAll('.carousel-slide');
        
        // Create dots based on number of slides
        slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            
            dot.addEventListener('click', () => {
                // Stop the animation
                logoCarousel.style.animation = 'none';
                
                // Calculate the position to move to
                const position = -index * 50;
                logoCarousel.style.transform = `translateX(${position}%)`;
                
                // Update active dot
                document.querySelectorAll('.carousel-dot').forEach(d => d.classList.remove('active'));
                dot.classList.add('active');
                
                // Restart animation after a delay
                setTimeout(() => {
                    logoCarousel.style.animation = '';
                    logoCarousel.style.transform = '';
                }, 5000);
            });
            
            carouselDots.appendChild(dot);
        });
    }
    
    // Update active dot during carousel animation
    if (logoCarousel) {
        logoCarousel.addEventListener('animationiteration', () => {
            const dots = document.querySelectorAll('.carousel-dot');
            const activeIndex = Math.floor(logoCarousel.animationPlayState / (100 / dots.length)) % dots.length;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
    }
    
    // Sequential fade-in for expertise title words
    const expertiseTitle = document.querySelector('.expertise-title');
    if (expertiseTitle) {
        const titleText = expertiseTitle.textContent;
        const words = titleText.split(' ');
        
        expertiseTitle.innerHTML = '';
        
        words.forEach((word, index) => {
            const span = document.createElement('span');
            span.textContent = word + ' ';
            span.style.opacity = '0';
            span.style.animation = `fadeInSequence 0.5s ease forwards ${index * 0.2}s`;
            expertiseTitle.appendChild(span);
        });
    }
    
    // Parallax effect for expertise section
    const expertiseSection = document.querySelector('.expertise-section');
    if (expertiseSection) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            const sectionPosition = expertiseSection.offsetTop;
            const distance = scrollPosition - sectionPosition;
            
            if (distance > -window.innerHeight && distance < expertiseSection.offsetHeight) {
                const parallaxElements = expertiseSection.querySelectorAll('.expertise-column');
                
                parallaxElements.forEach((element, index) => {
                    const speed = 0.05 + (index * 0.02);
                    element.style.transform = `translateY(${distance * speed}px)`;
                });
            }
        });
    }
});
