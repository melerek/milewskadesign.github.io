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

// Highlight active navigation link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu li a:not(.cta-button)');

const sectionObserverNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-50% 0px -50% 0px' });

sections.forEach(section => {
    sectionObserverNav.observe(section);
});

// Back to Top Button
const backToTopButton = document.querySelector('.back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        if (backToTopButton) {
            backToTopButton.classList.add('show');
        }
    } else {
        if (backToTopButton) {
            backToTopButton.classList.remove('show');
        }
    }
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

// Navbar background on scroll - with dark mode support
window.addEventListener('scroll', () => {
    updateNavbarBackground();
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
    'images/renders/Kanapa.jpg',
    'images/renders/kuchnia2.jpg',
    'images/renders/Sypialnia2.jpg',
    'images/renders/Łazienka 2.jpg',
    'images/renders/Po.jpg'
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
            item.style.borderColor = '#a88d80';
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

// Real-time form validation with progress tracking
document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea').forEach(field => {
    // Track field completion on input
    field.addEventListener('input', () => {
        trackFieldCompletion(field);
    });

    field.addEventListener('blur', () => {
        const errors = validateForm();
        const submitBtn = document.querySelector('.submit-btn');

        if (errors.length === 0) {
            submitBtn.style.opacity = '1';
            submitBtn.disabled = false;
        } else {
            submitBtn.style.opacity = '0.7';
        }

        trackFieldCompletion(field);
    });
});

// Add loading animation
window.addEventListener('load', async () => {
    document.body.classList.add('loaded');

    // Initialize theme first
    initializeTheme();

    // Detect WebP support
    const supportsWebP = await detectWebPSupport();
    document.documentElement.classList.add(supportsWebP ? 'webp-support' : 'no-webp');

    // Initialize PWA features
    initializePWAFeatures();

    // Hide page loader
    setTimeout(() => {
        hidePageLoader();
    }, 1000);

    // Smooth entrance for hero elements
    const heroElements = document.querySelectorAll('.hero-text-container > *');
    heroElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 150 + 1500); // Start after loader is hidden
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
    }, 3000); // Start slideshow after 3 seconds
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

// Dark Mode Functionality
function toggleDarkMode() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update theme color meta tag
    const themeColor = newTheme === 'dark' ? '#1c2726' : '#a88d80';
    document.querySelector('meta[name=\"theme-color\"]').setAttribute('content', themeColor);

    // Update navbar background immediately after theme change
    updateNavbarBackground();

    // Show notification
    const message = newTheme === 'dark' ? 'Tryb ciemny włączony' : 'Tryb jasny włączony';
    const icon = newTheme === 'dark' ? '🌙' : '☀️';
    showEnhancedNotification('Zmiana motywu', message, 'info', icon);
}

// Separate function for updating navbar background
function updateNavbarBackground() {
    const navbar = document.querySelector('.navbar');
    const isDarkMode = document.documentElement.getAttribute('data-theme') === 'dark';

    if (window.scrollY > 100) {
        if (isDarkMode) {
            navbar.style.background = 'rgba(13, 17, 23, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    } else {
        if (isDarkMode) {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = 'none';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    }
}

// Initialize theme on page load
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');

    document.documentElement.setAttribute('data-theme', theme);

    // Update theme color meta tag
    const themeColor = theme === 'dark' ? '#1c2726' : '#a88d80';
    document.querySelector('meta[name=\"theme-color\"]').setAttribute('content', themeColor);

    // Initialize navbar background
    setTimeout(() => {
        updateNavbarBackground();
    }, 100);
}

// Listen for system theme changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        const newTheme = e.matches ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', newTheme);
        const themeColor = newTheme === 'dark' ? '#2d2d2d' : '#c9a96e';
        document.querySelector('meta[name=\"theme-color\"]').setAttribute('content', themeColor);
    }
});

// WebP Support Detection and Image Optimization
function detectWebPSupport() {
    return new Promise((resolve) => {
        const webP = new Image();
        webP.onload = webP.onerror = function () {
            resolve(webP.height === 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
}

// Progressive Web App Features
function initializePWAFeatures() {
    // Update available notification
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.addEventListener('controllerchange', () => {
            showEnhancedNotification(
                'Aktualizacja dostępna',
                'Strona została zaktualizowana. Odśwież, aby zobaczyć najnowszą wersję.',
                'info',
                '🔄'
            );
        });
    }

    // Network status monitoring
    function updateOnlineStatus() {
        const status = navigator.onLine ? 'online' : 'offline';
        if (status === 'offline') {
            showEnhancedNotification(
                'Brak połączenia',
                'Jesteś offline. Niektóre funkcje mogą być niedostępne.',
                'error',
                '📡'
            );
        } else {
            showEnhancedNotification(
                'Połączono',
                'Połączenie z internetem zostało przywrócone.',
                'success',
                '🌐'
            );
        }
    }

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
}

// Portfolio Data for Lightbox
const portfolioData = {
    'Kanapa.jpg': {
        title: 'Nowoczesny Salon',
        description: 'Elegancki salon z designerską kanapą i nowoczesnym wystrojem. Projekt łączy komfort z estetyką, tworząc przestrzeń idealną do relaksu.',
        tags: ['Salon', 'Nowoczesny', 'Mieszkaniowy']
    },
    'Kuchnia.jpg': {
        title: 'Designerska Kuchnia',
        description: 'Nowoczesna kuchnia z wyspą i meblami na wymiar. Funkcjonalna przestrzeń z wysokiej jakości wykończeniami.',
        tags: ['Kuchnia', 'Designerska', 'Wyspa']
    },
    'Sypialnia.jpg': {
        title: 'Elegancka Sypialnia',
        description: 'Przytulna sypialnia z przemyślanym oświetleniem. Harmonia kolorów i tekstur tworzy idealną atmosferę do odpoczynku.',
        tags: ['Sypialnia', 'Elegancka', '3D']
    },
    'kuchnia2.jpg': {
        title: 'Kuchnia z Wyspą',
        description: 'Przestronna kuchnia z centralną wyspą i nowoczesnym designem. Optymalne wykorzystanie przestrzeni i światła.',
        tags: ['Kuchnia', 'Wyspa', 'Przestronna']
    },
    'Łazienka 1.jpg': {
        title: 'Luksusowa Łazienka',
        description: 'Elegancka łazienka inspirowana estetyką SPA. Naturalne materiały i przemyślane oświetlenie.',
        tags: ['Łazienka', 'Luksusowa', 'SPA']
    },
    'Łazienka 2.jpg': {
        title: 'Minimalistyczna Łazienka',
        description: 'Nowoczesna łazienka w stylu minimalistycznym. Czystość linii i funkcjonalność w każdym detalu.',
        tags: ['Łazienka', 'Minimalistyczna', 'Nowoczesna']
    },
    'Sypialnia2.jpg': {
        title: 'Sypialnia Główna',
        description: 'Przytulna sypialnia z ciepłym oświetleniem. Eleganckie wykończenia i przemyślane rozwiązania.',
        tags: ['Sypialnia', 'Główna', 'Przytulna']
    },
    'detal.jpg': {
        title: 'Detal Projektowy',
        description: 'Precyzyjnie wykonany detal w projekcie wnętrza. Uwaga do najmniejszych szczegółów w każdym elemencie.',
        tags: ['Detal', 'Projektowy', 'Precyzja']
    },
    'Po.jpg': {
        title: 'Pokój Dzienny',
        description: 'Komfortowa przestrzeń do relaksu i wypoczynku. Harmonijne połączenie funkcjonalności z estetyką.',
        tags: ['Pokój', 'Dzienny', 'Komfort']
    }
};

let currentLightboxIndex = 0;
let lightboxImages = [];

// Lightbox Functions
function openLightbox(button) {
    const portfolioItem = button.closest('.portfolio-item');
    const img = portfolioItem.querySelector('.portfolio-img');
    const lightbox = document.getElementById('lightboxOverlay');

    // Get all portfolio images for navigation
    lightboxImages = Array.from(document.querySelectorAll('.portfolio-img')).map(img => {
        const src = img.src;
        const filename = src.split('/').pop();
        return {
            src: src,
            filename: filename,
            data: portfolioData[filename] || {
                title: 'Projekt Wnętrza',
                description: 'Profesjonalnie wykonany projekt wnętrza.',
                tags: ['Wnętrze', 'Projekt']
            }
        };
    });

    // Find current image index
    const currentSrc = img.src;
    currentLightboxIndex = lightboxImages.findIndex(item => item.src === currentSrc);

    // Display the image
    displayLightboxImage(currentLightboxIndex);

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightboxOverlay');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function displayLightboxImage(index) {
    const image = lightboxImages[index];
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDescription');
    const lightboxTags = document.getElementById('lightboxTags');

    lightboxImg.src = image.src;
    lightboxTitle.textContent = image.data.title;
    lightboxDesc.textContent = image.data.description;

    // Clear and populate tags
    lightboxTags.innerHTML = '';
    image.data.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'lightbox-tag';
        tagElement.textContent = tag;
        lightboxTags.appendChild(tagElement);
    });
}

function nextImage() {
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
    displayLightboxImage(currentLightboxIndex);
}

function previousImage() {
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
    displayLightboxImage(currentLightboxIndex);
}

// Click-to-Call and Email Functions
function makeCall(phoneNumber) {
    // Remove any spaces or special characters for the tel: link
    const cleanNumber = phoneNumber.replace(/\s+/g, '');

    // Check if device supports phone calls
    if (/Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        window.location.href = `tel:${cleanNumber}`;
    } else {
        // For desktop, copy to clipboard and show notification
        navigator.clipboard.writeText(phoneNumber).then(() => {
            showEnhancedNotification(
                'Numer telefonu skopiowany!',
                `${phoneNumber} został skopiowany do schowka`,
                'success',
                '📞'
            );
        }).catch(() => {
            showEnhancedNotification(
                'Numer telefonu',
                phoneNumber,
                'info',
                '📞'
            );
        });
    }
}

function sendEmail(emailAddress) {
    const subject = encodeURIComponent('Zapytanie o projekt wnętrza');
    const body = encodeURIComponent('Dzień dobry,\n\nChciałbym/chciałabym uzyskać więcej informacji na temat Państwa usług projektowania wnętrz.\n\nZ poważaniem');

    window.location.href = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
}

// Enhanced Notification System
function showEnhancedNotification(title, message, type = 'info', icon = '') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;

    notification.innerHTML = `
        <div class="notification-icon">${icon}</div>
        <div class="notification-content">
            <div class="notification-title">${title}</div>
            <div class="notification-message">${message}</div>
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 400);
    }, 5000);
}

// Form Progress Tracking
const formSteps = {
    1: ['name', 'email', 'phone'],
    2: ['project-type', 'budget'],
    3: ['message']
};

let currentStep = 1;
let completedFields = new Set();

function updateFormProgress() {
    const progressLine = document.getElementById('progressLine');
    const totalSteps = Object.keys(formSteps).length;

    // Calculate completion percentage
    let completedSteps = 0;

    for (let step = 1; step <= totalSteps; step++) {
        const stepFields = formSteps[step];
        const stepCompleted = stepFields.every(fieldId => {
            const field = document.getElementById(fieldId);
            return field && field.value.trim() !== '';
        });

        const stepElement = document.getElementById(`step${step}`);

        if (stepCompleted) {
            stepElement.classList.remove('active');
            stepElement.classList.add('completed');
            completedSteps++;
        } else if (stepFields.some(fieldId => {
            const field = document.getElementById(fieldId);
            return field && field.value.trim() !== '';
        })) {
            stepElement.classList.add('active');
            stepElement.classList.remove('completed');
            currentStep = step;
        } else {
            stepElement.classList.remove('active', 'completed');
        }
    }

    // Update progress line
    const progressPercentage = (completedSteps / totalSteps) * 100;
    progressLine.style.width = `${progressPercentage}%`;
}

// Enhanced form validation with progress tracking
function trackFieldCompletion(field) {
    const fieldId = field.id;
    const value = field.value.trim();
    const formGroup = field.closest('.form-group');

    if (value !== '') {
        completedFields.add(fieldId);
        formGroup.classList.add('completed');
    } else {
        completedFields.delete(fieldId);
        formGroup.classList.remove('completed');
    }

    updateFormProgress();
}

// Page Loader
function hidePageLoader() {
    const loader = document.getElementById('pageLoader');
    if (loader) {
        loader.classList.add('hidden');
        setTimeout(() => {
            loader.style.display = 'none';
        }, 500);
    }
}

// Keyboard navigation for lightbox
document.addEventListener('keydown', function(e) {
    const lightbox = document.getElementById('lightboxOverlay');
    if (lightbox.classList.contains('active')) {
        switch(e.key) {
            case 'ArrowLeft':
                previousImage();
                break;
            case 'ArrowRight':
                nextImage();
                break;
            case 'Escape':
                closeLightbox();
                break;
        }
    }
});

// Close lightbox when clicking outside
document.getElementById('lightboxOverlay').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
});

// Compare Modal Functions
function openCompareModal() {
    const modal = document.getElementById("compareModal");
    modal.classList.add("show");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
}

function closeCompareModal() {
    const modal = document.getElementById("compareModal");
    modal.classList.remove("show");
    document.body.style.overflow = "auto"; // Restore scrolling
}

// Close modal with Escape key
document.addEventListener("keydown", function(event) {
    if (event.key === "Escape") {
        closeCompareModal();
    }
});

// Prevent modal from closing when clicking on table content
document.querySelector(".compare-modal-content")?.addEventListener("click", function(e) {
    e.stopPropagation();
});

// ===== EVENT DELEGATION FOR DATA-ACTION ATTRIBUTES =====

// Centralized event handler for all data-action clicks
document.addEventListener('click', function(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    
    const action = target.getAttribute('data-action');
    
    switch(action) {
        case 'open-lightbox':
            openLightbox(target);
            break;
        case 'close-lightbox':
            closeLightbox();
            break;
        case 'prev-image':
            previousImage();
            break;
        case 'next-image':
            nextImage();
            break;
        case 'open-compare':
            openCompareModal();
            break;
        case 'close-compare':
            closeCompareModal();
            break;
        case 'close-compare-bg':
            if (e.target === target) {
                closeCompareModal();
            }
            break;
        case 'close-and-contact':
            closeCompareModal();
            document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
            break;
        case 'call':
            makeCall(target.getAttribute('data-phone'));
            break;
        case 'email':
            sendEmail(target.getAttribute('data-email'));
            break;
        case 'install-pwa':
            installPWA();
            break;
        case 'modal-content':
            e.stopPropagation();
            break;
    }
});

// Handle keyboard events for data-action elements
document.addEventListener('keydown', function(e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;
    
    // Handle Enter and Space keys for accessibility
    if (e.key === 'Enter' || e.key === ' ') {
        const action = target.getAttribute('data-action');
        
        // Prevent default for space key to avoid page scrolling
        if (e.key === ' ') {
            e.preventDefault();
        }
        
        // Trigger the same actions as click
        switch(action) {
            case 'open-compare':
            case 'close-compare':
            case 'close-and-contact':
            case 'call':
            case 'email':
            case 'install-pwa':
                target.click();
                break;
        }
    }
});

// Theme toggle keyboard support
const themeToggles = document.querySelectorAll('.theme-toggle, .mobile-theme-toggle');
themeToggles.forEach(toggle => {
    toggle.addEventListener('click', toggleDarkMode);
    toggle.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggleDarkMode();
        }
    });
});

// Hero gallery keyboard support
document.querySelectorAll('.gallery-item[data-hero-image]').forEach(item => {
    item.addEventListener('click', function() {
        const imageSrc = this.getAttribute('data-hero-image');
        changeHeroImageManual(imageSrc);
    });
    
    item.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            const imageSrc = this.getAttribute('data-hero-image');
            changeHeroImageManual(imageSrc);
        }
    });
});
