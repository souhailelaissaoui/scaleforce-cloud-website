document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const video = document.querySelector('.video-background video');
    const ctaButton = document.querySelector('.hero .cta-button');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const header = document.querySelector('header');
    const demoSection = document.querySelector('#demo-section');
    const footerForm = document.querySelector('footer form');
    const mockPdf = document.getElementById('mockPdf');
    
    // Store original popup content only if it exists
    const originalPopupContent = popupContent ? popupContent.innerHTML : '';

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
        // Header scroll effect
        if (demoSection && header) {
            const demoTop = demoSection.offsetTop;
            const scrollPosition = window.scrollY;
            const triggerPoint = demoTop - 60;
            
            if (scrollPosition >= triggerPoint) {
                if (!header.classList.contains('scrolled')) {
                    header.classList.add('scrolled');
                }
            } else {
                if (header.classList.contains('scrolled')) {
                    header.classList.remove('scrolled');
                }
            }
        }

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
    });

    // Function to show popup
    const showPopup = (e) => {
        if (!popupOverlay || !popupContent) return;
        e.preventDefault();
        popupOverlay.style.display = 'block';
        popupContent.innerHTML = originalPopupContent;
        attachEventListeners();
    };

    // Function to close popup
    const closePopupFunc = () => {
        if (!popupOverlay) return;
        popupOverlay.style.display = 'none';
    };

    // Function to attach event listeners
    const attachEventListeners = () => {
        const closePopup = document.querySelector('.close-popup');
        if (closePopup) {
            closePopup.addEventListener('click', closePopupFunc);
        }

        const popupForm = document.querySelector('#popup-overlay form');
        if (popupForm) {
            popupForm.addEventListener('submit', (e) => handleFormSubmit(e, popupForm));
        }
    };

    // Form submission handler
    const handleFormSubmit = async (e, form) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        const thankYouContent = `
            <span class="close-popup">&times;</span>
            <h2><i class="fas fa-check-circle" style="color: var(--secondary-color);"></i> Thank You!</h2>
            <div class="thank-you-message">
                <p>We've received your inquiry and will contact you within 24 hours.</p>
                <p>For urgent matters, please contact us at:</p>
                <p><strong><a href="mailto:contact@adaptogene.com">contact@adaptogene.com</a></strong></p>
            </div>
        `;

        if (form.closest('#popup-overlay')) {
            popupContent.innerHTML = thankYouContent;
            attachEventListeners();
        } else {
            popupOverlay.style.display = 'block';
            popupContent.innerHTML = thankYouContent;
            attachEventListeners();
        }

        try {
            const response = await fetch('https://api.adaptogene.com/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.error('Failed to send message');
            }
        } catch (error) {
            console.error('Error:', error);
        }

        form.reset();
    };

    // Event Listeners
    if (ctaButton) {
        ctaButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (demoSection) {
                demoSection.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Handle footer form submissions
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => handleFormSubmit(e, footerForm));
    }

    // Initial attachment of event listeners
    attachEventListeners();

    // Initialize demo functionality
    initializeDemo();

    let mobileMenu = null;
    const MOBILE_BREAKPOINT = 768;

    function createMobileMenu() {
        if (window.innerWidth <= MOBILE_BREAKPOINT && !mobileMenu) {
            const burgerMenu = document.querySelector('.burger-menu');
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

    // Function to show PDF in a popup
    const showPdfPopup = () => {
        const pdfPopup = document.createElement('div');
        pdfPopup.className = 'pdf-popup';
        pdfPopup.innerHTML = `
            <span class="close-popup">&times;</span>
            <img src="sample-report.png" alt="PDF Preview" class="pdf-preview-full">
        `;
        document.body.appendChild(pdfPopup);

        // Close popup event when clicking the close button
        pdfPopup.querySelector('.close-popup').addEventListener('click', () => {
            document.body.removeChild(pdfPopup);
        });

        // Close popup when clicking outside the image
        pdfPopup.addEventListener('click', (e) => {
            if (e.target === pdfPopup) {
                document.body.removeChild(pdfPopup);
            }
        });
    };

    // Add click event to the mock PDF
    if (mockPdf) {
        mockPdf.addEventListener('click', showPdfPopup);
    }
});

// Demo Section Functionality
const initializeDemo = () => {
    const medButtons = document.querySelectorAll('.med-button');
    const analyzeButton = document.getElementById('analyzeButton');
    const demoPart1 = document.getElementById('demoPart1');
    const demoPart2 = document.getElementById('demoPart2');
    const newAnalysisButton = document.getElementById('newAnalysisButton');
    const uploadZone = document.getElementById('uploadZone');

    if (!medButtons.length || !analyzeButton || !demoPart1 || !demoPart2 || !newAnalysisButton) {
        console.log('Some demo elements are missing');
        return;
    }

    let selectedMedication = null;

    // Create next section arrow element
    const nextSectionArrow = document.createElement('div');
    nextSectionArrow.className = 'next-section-arrow';
    nextSectionArrow.innerHTML = '<i class="fas fa-chevron-down"></i>';
    
    // Add click event to scroll to next section
    nextSectionArrow.addEventListener('click', () => {
        const advantagesSection = document.querySelector('.key-figures');
        if (advantagesSection) {
            advantagesSection.scrollIntoView({ behavior: 'smooth' });
        }
    });

    medButtons.forEach(button => {
        button.addEventListener('click', () => {
            medButtons.forEach(btn => btn.classList.remove('selected'));
            button.classList.add('selected');
            selectedMedication = button.dataset.value;
            analyzeButton.classList.add('active');
            analyzeButton.disabled = false;
        });
    });

    const medicationRecommendations = {
        antidepresseur: [
            {
                status: 'Recommandé',
                name: 'Escitalopram',
                dosage: '10-20 mg/jour',
                explanation: 'Métaboliseur rapide CYP2C19. Efficacité optimale attendue.'
            },
            {
                status: 'Utiliser avec précaution',
                name: 'Sertraline',
                dosage: '25-50 mg/jour',
                explanation: 'Métaboliseur intermédiaire. Commencer à dose réduite.'
            },
            {
                status: 'À éviter',
                name: 'Paroxetine',
                dosage: 'Non recommandé',
                explanation: 'Métaboliseur lent CYP2D6. Risque élevé d\'effets indésirables.'
            }
        ],
        antipsychotique: [
            {
                status: 'Recommandé',
                name: 'Aripiprazole',
                dosage: '10-15 mg/jour',
                explanation: 'Métaboliseur normal CYP2D6. Bonne tolérance attendue.'
            },
            {
                status: 'Utiliser avec précaution',
                name: 'Olanzapine',
                dosage: '5-10 mg/jour',
                explanation: 'Métaboliseur intermédiaire CYP1A2. Surveillance métabolique recommandée.'
            },
            {
                status: 'À éviter',
                name: 'Rispéridone',
                dosage: 'Non recommandé',
                explanation: 'Métaboliseur lent CYP2D6. Risque accru d\'effets secondaires.'
            }
        ],
        regulateur: [
            {
                status: 'Recommandé',
                name: 'Lamotrigine',
                dosage: '100-200 mg/jour',
                explanation: 'Métaboliseur normal UGT1A4. Titration standard possible.'
            },
            {
                status: 'Utiliser avec précaution',
                name: 'Lithium',
                dosage: '600-1200 mg/jour',
                explanation: 'Surveillance étroite de la lithémie requise. Adaptation posologique selon fonction rénale.'
            },
            {
                status: 'À éviter',
                name: 'Valproate',
                dosage: 'Non recommandé',
                explanation: 'Polymorphisme CYP2C9. Risque d\'accumulation et d\'hépatotoxicité.'
            }
        ]
    };

    analyzeButton.addEventListener('click', (event) => {
        event.preventDefault();
        if (selectedMedication) {
            const recommendations = medicationRecommendations[selectedMedication];
            const recommendationsGrid = document.getElementById('recommendationsGrid');
            
            recommendationsGrid.innerHTML = recommendations.map(rec => `
                <div class="recommendation-card ${rec.status === 'Recommandé' ? 'recommended' : 
                                               rec.status === 'Utiliser avec précaution' ? 'caution' : 
                                               'avoid'}">
                    <div class="status">${rec.status}</div>
                    <h3>${rec.name}</h3>
                    <p class="dosage">${rec.dosage}</p>
                    <p class="explanation">${rec.explanation}</p>
                </div>
            `).join('');

            demoPart1.style.display = 'none';
            demoPart2.style.display = 'block';
            
            // Remove existing arrow if it exists
            const existingArrow = document.querySelector('.demo-section .next-section-arrow');
            if (existingArrow) {
                existingArrow.remove();
            }
            
            // Add the arrow to the demo section
            document.querySelector('.demo-section').appendChild(nextSectionArrow);
        }
    });

    newAnalysisButton.addEventListener('click', () => {
        demoPart1.style.display = 'block';
        demoPart2.style.display = 'none';
        medButtons.forEach(btn => btn.classList.remove('selected'));
        analyzeButton.classList.remove('active');
        analyzeButton.disabled = true;
        selectedMedication = null;
        
        document.querySelector('.demo-section').scrollIntoView({ behavior: 'smooth' });
    });

    if (uploadZone) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener(eventName, preventDefaults, false);
        });

        ['dragenter', 'dragover'].forEach(eventName => {
            uploadZone.addEventListener('dragenter', highlight, false);
        });

        ['dragleave', 'drop'].forEach(eventName => {
            uploadZone.addEventListener('dragleave', unhighlight, false);
        });
    }
};

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    uploadZone.classList.add('highlight');
}

function unhighlight(e) {
    uploadZone.classList.remove('highlight');
}