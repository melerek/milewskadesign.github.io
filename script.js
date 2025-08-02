// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Portfolio Filter Functionality
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function() {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        offset: 100
    });
});

// Hero background images array
const heroImages = [
    'images/renders/Kanapa.png',
    'images/renders/kuchnia2.png',
    'images/renders/Sypialnia2.png',
    'images/renders/Łazienka 2.png',
    'images/renders/Po.png'
];

let currentImageIndex = 0; 
let heroSlideInterval;

// Change hero background image function - GLOBAL with slide transition
function changeHeroImage(imageSrc, updateIndex = false, slideDirection = 'right') {
    const heroBgImg = document.querySelector('.hero-bg-img');
    const heroContainer = document.querySelector('.hero-background-image');
    
    if (heroBgImg && heroContainer) {
        // Create new image element for smooth transition
        const newImg = document.createElement('img');
        newImg.src = imageSrc;
        newImg.alt = 'Projekt wnętrza';
        newImg.className = 'hero-bg-img';
        newImg.style.position = 'absolute';
        newImg.style.top = '0';
        newImg.style.left = '0';
        newImg.style.width = '100%';
        newImg.style.height = '100%';
        newImg.style.objectFit = 'cover';
        newImg.style.objectPosition = 'center';
        newImg.style.transform = slideDirection === 'right' ? 'translateX(100%) scale(1.1)' : 'translateX(-100%) scale(1.1)';
        newImg.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        
        // Add new image to container
        heroContainer.appendChild(newImg);
        
        // Trigger slide animation after a small delay
        setTimeout(() => {
            // Slide out current image with zoom out
            heroBgImg.style.transform = slideDirection === 'right' ? 'translateX(-100%) scale(0.95)' : 'translateX(100%) scale(0.95)';
            heroBgImg.style.transition = 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            
            // Slide in new image with zoom in to normal
            newImg.style.transform = 'translateX(0) scale(1)';
        }, 50);
        
        // Clean up after animation and start subtle zoom effect
        setTimeout(() => {
            heroBgImg.remove();
            newImg.style.position = 'absolute';
            newImg.style.transform = 'scale(1)';
            newImg.style.transition = 'transform 15s ease-in-out';
            
            // Add subtle continuous zoom animation
            newImg.classList.add('zoom-active');
            
            // Update current index if this was called from gallery click
            if (updateIndex) {
                currentImageIndex = heroImages.indexOf(imageSrc);
                updateGalleryActiveState();
            }
        }, 850);
    }
}

// Update gallery active state
function updateGalleryActiveState() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-img');
        if (img.src.includes(heroImages[currentImageIndex].split('/').pop())) {
            item.style.opacity = '1';
            item.style.transform = 'scale(1.1)';
            item.style.borderColor = '#c9a96e';
        } else {
            item.style.opacity = '0.7';
            item.style.transform = 'scale(1)';
            item.style.borderColor = 'rgba(255, 255, 255, 0.5)';
        }
    });
}

// Start automatic hero slideshow with slide transitions
function startHeroSlideshow() {
    heroSlideInterval = setInterval(() => {
        const prevIndex = currentImageIndex;
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        const slideDirection = 'right'; // Always slide from right to left for auto-slideshow
        changeHeroImage(heroImages[currentImageIndex], false, slideDirection);
        updateGalleryActiveState();
    }, 7000); // Change every 7 seconds
}

// Stop automatic slideshow
function stopHeroSlideshow() {
    if (heroSlideInterval) {
        clearInterval(heroSlideInterval);
    }
}

// Manual image change from gallery (stops auto-slideshow temporarily)
function changeHeroImageManual(imageSrc) {
    stopHeroSlideshow();
    
    // Determine slide direction based on image index
    const newIndex = heroImages.indexOf(imageSrc);
    const slideDirection = newIndex > currentImageIndex ? 'right' : 'left';
    
    changeHeroImage(imageSrc, true, slideDirection);
    
    // Restart slideshow after 8 seconds of inactivity
    setTimeout(() => {
        startHeroSlideshow();
    }, 8000);
}

// Animated Counter Function
function animateCounters() {
    const counters = document.querySelectorAll('.animated-counter .stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let current = 0;
        const increment = target / 60; // 60 frames for smooth animation
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .testimonial-card, .process-step').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Change button state
    submitBtn.textContent = 'Wysyłam...';
    submitBtn.disabled = true;
    
    // Get form data
    const formData = new FormData(contactForm);
    const formObject = {};
    formData.forEach((value, key) => {
        formObject[key] = value;
    });
    
    try {
        // Here you would typically send the data to your backend
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Success state
        submitBtn.textContent = 'Wiadomość Wysłana!';
        submitBtn.style.background = '#27ae60';
        
        // Show success message
        showNotification('Dziękujemy! Odezwiemy się w ciągu 24 godzin.', 'success');
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
        
    } catch (error) {
        // Error state
        submitBtn.textContent = 'Błąd - Spróbuj Ponownie';
        submitBtn.style.background = '#e74c3c';
        
        showNotification('Coś poszło nie tak. Spróbuj ponownie.', 'error');
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.style.background = '';
        }, 3000);
    }
});

// Notification system
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 10px;
        color: white;
        font-weight: 600;
        z-index: 9999;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #27ae60;' : 'background: #e74c3c;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Enhanced form validation
function validateForm() {
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const projectType = document.getElementById('project-type').value;
    const message = document.getElementById('message').value.trim();
    
    const errors = [];
    
    if (name.length < 2) {
        errors.push('Name must be at least 2 characters long');
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errors.push('Please enter a valid email address');
    }
    
    if (!projectType) {
        errors.push('Please select a project type');
    }
    
    if (message.length < 10) {
        errors.push('Message must be at least 10 characters long');
    }
    
    return errors;
}

// Real-time form validation
document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(field => {
    field.addEventListener('blur', () => {
        const errors = validateForm();
        const submitBtn = document.querySelector('.submit-btn');
        
        if (errors.length === 0) {
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        } else {
            submitBtn.style.opacity = '0.7';
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Smooth entrance for hero elements
    const heroElements = document.querySelectorAll('.hero-text-container > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150 + 500); // Start after 500ms
    });
    
    // Start hero slideshow after page loads
    setTimeout(() => {
        startHeroSlideshow();
        updateGalleryActiveState(); // Set initial active state
        
        // Start zoom animation for initial image
        const initialImg = document.querySelector('.hero-bg-img');
        if (initialImg) {
            initialImg.classList.add('zoom-active');
        }
    }, 2000); // Start slideshow after 2 seconds
});

// Add smooth reveal animations for sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(50px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    sectionObserver.observe(section);
});

// Add CSS for section visibility
const style = document.createElement('style');
style.textContent = `
    .section-visible {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
`;
document.head.appendChild(style);