// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Change icon based on menu state
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
    }

    // Close mobile menu when clicking on navigation links
    const mobileNavLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            
            // Reset icon
            const icon = mobileMenuButton.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';
            
            formStatus.classList.remove('hidden', 'text-red-500', 'text-green-500');
            formStatus.classList.add('text-gray-500');
            formStatus.textContent = 'Sending your message...';
            
            // Get form data
            const formData = new FormData(contactForm);
            
            // Convert to JSON object
            const jsonData = {};
            formData.forEach((value, key) => {
                jsonData[key] = value;
            });
            
            // Send data to Google Sheets Web App
            fetch('https://script.google.com/macros/s/AKfycbytom_iqbOvmE5SNYEB6km9S53h8G2AgujJpjqmkJ-z3bCdVWB4FS7Z20YRBWzjNTY8yA/exec', {
                method: 'POST',
                body: JSON.stringify(jsonData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Show success message
                formStatus.classList.remove('text-gray-500');
                formStatus.classList.add('text-green-500');
                formStatus.textContent = 'Thank you! Your message has been sent successfully. We\'ll get back to you soon.';
                
                // Reset form
                contactForm.reset();
                
                // Alert the user
                setTimeout(() => {
                    alert('Thank you! Your message has been sent successfully. We\'ll get back to you within 1 business day.');
                }, 200);
            })
            .catch(error => {
                // Show error message
                formStatus.classList.remove('text-gray-500');
                formStatus.classList.add('text-red-500');
                formStatus.textContent = 'There was a problem sending your message. Please try again or email us directly.';
                
                // Alert the user
                setTimeout(() => {
                    alert('There was a problem sending your message. Please try again or email us directly at contact@redomysite.com');
                }, 200);
                
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitButton.disabled = false;
                submitButton.innerHTML = originalButtonText;
            });
        });
    }

    // Request Preview button functionality
    const requestPreviewBtn = document.getElementById('request-preview-btn');
    if (requestPreviewBtn) {
        requestPreviewBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                
                // Focus on the name field after scrolling
                setTimeout(() => {
                    const nameField = document.getElementById('name');
                    if (nameField) {
                        nameField.focus();
                    }
                }, 800);
            }
        });
    }

    // Smooth scrolling for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const target = document.querySelector(targetId);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
});
