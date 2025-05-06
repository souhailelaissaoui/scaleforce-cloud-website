document.addEventListener('DOMContentLoaded', () => {
    const ctaButton = document.querySelector('.cta-button');
    const popupOverlay = document.getElementById('popup-overlay');
    const popupContent = document.querySelector('.popup-content');
    const contactMenuItem = document.querySelector('nav ul li a[href="#contact"]');

    const originalPopupContent = popupContent.innerHTML;

    // Function to show popup
    const showPopup = (e) => {
        e.preventDefault();
        popupOverlay.style.display = 'block';
        popupContent.innerHTML = originalPopupContent;
        attachEventListeners();
    };

    // Function to close popup
    const closePopupFunc = () => {
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

    // CTA button hover effect
    ctaButton.addEventListener('mouseover', () => {
        ctaButton.style.transform = 'scale(1.1)';
        ctaButton.style.transition = 'transform 0.3s';
    });

    ctaButton.addEventListener('mouseout', () => {
        ctaButton.style.transform = 'scale(1)';
    });

    // Show popup when "Get Started" is clicked
    ctaButton.addEventListener('click', showPopup);

    // Show popup when contact menu item is clicked
    contactMenuItem.addEventListener('click', showPopup);

    // Close popup when clicking outside the form
    popupOverlay.addEventListener('click', (e) => {
        if (e.target === popupOverlay) {
            closePopupFunc();
        }
    });

    const handleFormSubmit = async (e, form) => {
        e.preventDefault();
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Instantly show thank you message
        const thankYouContent = `
            <span class="close-popup">&times;</span>
            <h2><span class="green-check">✅</span> Thank you!</h2>
            <div class="thank-you-message">
                <p>We appreciate you taking the time to contact us. Our team will get back to you within the next 24 hours.</p>
                <p>In the meantime, if you have any urgent questions, please feel free to reach out directly at:</p>
                <p><strong><a href="mailto:souhail@scaleforce.cloud">souhail@scaleforce.cloud</a></strong></p>
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
            const response = await fetch('https://f8j49nb53k.execute-api.eu-west-3.amazonaws.com/prod', {
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

    // Attach submit event listener to the footer form
    const footerForm = document.querySelector('footer form');
    if (footerForm) {
        footerForm.addEventListener('submit', (e) => handleFormSubmit(e, footerForm));
    }

    // Initial attachment of event listeners
    attachEventListeners();
});