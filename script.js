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
}, { rootMargin: '-80px 0px -50% 0px' }); // Account for navbar height

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

// Smooth scrolling for navigation links with navbar offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            // Get navbar height
            const navbar = document.querySelector('.navbar');
            const navbarHeight = navbar ? navbar.offsetHeight : 80;
            
            // Calculate target position with offset
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = targetPosition - navbarHeight - 20; // Extra 20px padding
            
            // Smooth scroll to position
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
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

// Hero background images array - Collect all images from portfolio projects
function getAllProjectImages() {
    const allImages = [];
    
    // Collect all images from portfolio projects
    Object.keys(portfolioProjects).forEach(projectId => {
        const project = portfolioProjects[projectId];
        project.images.forEach(image => {
            allImages.push({
                src: image.src,
                caption: image.caption,
                projectTitle: project.title
            });
        });
    });
    
    return allImages;
}

// Shuffle array function
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Initialize hero images with shuffled project images
let heroImages = [];
let currentImageIndex = 0; 
let heroSlideInterval;

// Change hero background image function - GLOBAL with fade transition
function changeHeroImage(imageSrc, updateIndex = false) {
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
        newImg.style.opacity = '0';
        newImg.style.transition = 'opacity 1.5s ease-in-out, transform 15s ease-in-out';
        newImg.style.zIndex = '1';
        
        // Start zoom animation immediately
        newImg.classList.add('zoom-active');
        
        // Add new image to container
        heroContainer.appendChild(newImg);
        
        // Ensure the old image stays visible during transition
        heroBgImg.style.zIndex = '0';
        heroBgImg.style.transition = 'opacity 1.5s ease-in-out';
        
        // Wait for image to load before starting fade
        if (newImg.complete) {
            startFadeTransition();
        } else {
            newImg.onload = () => {
                startFadeTransition();
            };
        }
        
        function startFadeTransition() {
            // Small delay to ensure DOM is ready
            requestAnimationFrame(() => {
                requestAnimationFrame(() => {
                    // Fade out old image
                    heroBgImg.style.opacity = '0';
                    
                    // Fade in new image
                    newImg.style.opacity = '1';
                });
            });
            
            // Clean up old image after transition completes
        setTimeout(() => {
                if (heroBgImg.parentNode === heroContainer) {
            heroBgImg.remove();
                }
            
                // Reset z-index
                newImg.style.zIndex = '';
            
            // Update current index if this was called from gallery click
            if (updateIndex) {
                    currentImageIndex = heroImages.findIndex(img => img.src === imageSrc);
                updateGalleryActiveState();
            }
            }, 1600);
        }
    }
}

// Update gallery active state
function updateGalleryActiveState() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    if (heroImages.length === 0 || !heroImages[currentImageIndex]) return;
    
    const currentImageSrc = heroImages[currentImageIndex].src;
    const currentFilename = currentImageSrc.split('/').pop();
    
    galleryItems.forEach((item, index) => {
        const img = item.querySelector('.gallery-img');
        if (img && img.src.includes(currentFilename)) {
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

// Start automatic hero slideshow with fade transitions
function startHeroSlideshow() {
    if (heroImages.length === 0) return;
    
    heroSlideInterval = setInterval(() => {
        currentImageIndex = (currentImageIndex + 1) % heroImages.length;
        
        // Preload next image before showing current one
        const nextIndex = (currentImageIndex + 1) % heroImages.length;
        preloadNextHeroImage(nextIndex);
        
        changeHeroImage(heroImages[currentImageIndex].src, false);
        updateGalleryActiveState();
    }, 5000); // Change every 5 seconds
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
    
    changeHeroImage(imageSrc, true);
    
    // Restart slideshow after 8 seconds of inactivity
    setTimeout(() => {
        startHeroSlideshow();
    }, 8000);
}

// Initialize hero images with shuffled project images
function initializeHeroImages() {
    const allImages = getAllProjectImages();
    heroImages = shuffleArray(allImages);
    
    // Preload only first 3 images for better performance
    if (heroImages.length > 0) {
        const initialImg = document.querySelector('.hero-bg-img');
        if (initialImg) {
            initialImg.src = heroImages[0].src;
        }
        
        // Preload next 2 images in background
        for (let i = 1; i <= 2 && i < heroImages.length; i++) {
            const preloadImg = new Image();
            preloadImg.src = heroImages[i].src;
        }
    }
}

// Preload next image before it's shown
function preloadNextHeroImage(index) {
    if (index < heroImages.length) {
        const preloadImg = new Image();
        preloadImg.src = heroImages[index].src;
    }
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
    
    // Initialize hero images with random shuffled images from all projects
    initializeHeroImages();

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

// Portfolio Projects Data - Complete Gallery System
const portfolioProjects = {
    'project_1': {
        title: 'Nowoczesne Mieszkanie w Ząbkach',
        description: 'Kompleksowy projekt mieszkania łączący funkcjonalność z nowoczesną estetyką. Otwarta strefa dzienna płynnie przechodzi w kuchnię, tworząc przestrzeń idealną do życia rodzinnego. Projekt wyróżnia się przemyślanym oświetleniem, elegancką kolorystyką i dbałością o każdy detal.',
        location: 'Ząbki',
        area: '~75m²',
        tags: ['Mieszkanie', 'Nowoczesne', 'Salon', 'Kuchnia', 'Łazienka'],
        images: [
            { src: 'images/renders/Project_1_zab/Widok salon-kuchnia_full.webp', caption: 'Widok na salon i kuchnię' },
            { src: 'images/renders/Project_1_zab/Widok kanapa I_full.webp', caption: 'Strefa relaksu z kanapą' },
            { src: 'images/renders/Project_1_zab/Telewizor_CShading_LightMix_full.webp', caption: 'Strefa telewizyjna' },
            { src: 'images/renders/Project_1_zab/Kuchnia_full.webp', caption: 'Nowoczesna kuchnia' },
            { src: 'images/renders/Project_1_zab/Widok na korytarz_full.webp', caption: 'Widok na korytarz' },
            { src: 'images/renders/Project_1_zab/korytarz_CShading_LightMix001_full.webp', caption: 'Korytarz z oświetleniem' },
            { src: 'images/renders/Project_1_zab/Lustro na korytarzu_CShading_LightMix001_full.webp', caption: 'Lustro na korytarzu' },
            { src: 'images/renders/Project_1_zab/Prysznic_CShading_LightMix001_full.webp', caption: 'Strefa prysznicowa' },
            { src: 'images/renders/Project_1_zab/Umywalka_CShading_LightMix_full.webp', caption: 'Strefa umywalkowa' }
        ]
    },
    'project_2': {
        title: 'Elegancki Apartament w Wilanowie',
        description: 'Luksusowy apartament łączący klasyczną elegancję z nowoczesnymi rozwiązaniami. Przestronny salon z wysokimi sufitami, designerska kuchnia oraz elegancka łazienka tworzą harmonijną całość. Projekt charakteryzuje się subtelną kolorystyką, naturalnymi materiałami i dbałością o detale.',
        location: 'Wilanów, Warszawa',
        area: '~90m²',
        tags: ['Apartament', 'Luksusowe', 'Wilanów', 'Designerskie', 'Eleganckie'],
        images: [
            { src: 'images/renders/Project_2_wil/caly salon_full.webp', caption: 'Panorama salonu' },
            { src: 'images/renders/Project_2_wil/salon_full.webp', caption: 'Strefa wypoczynkowa' },
            { src: 'images/renders/Project_2_wil/kanapa_CShading_LightMix_full.webp', caption: 'Designerska kanapa' },
            { src: 'images/renders/Project_2_wil/tv_CShading_LightMix_full.webp', caption: 'Strefa telewizyjna' },
            { src: 'images/renders/Project_2_wil/Stół_CShading_LightMix_full.webp', caption: 'Strefa jadalna' },
            { src: 'images/renders/Project_2_wil/Kuchnia_po_PS_full.webp', caption: 'Kuchnia z wyspą' },
            { src: 'images/renders/Project_2_wil/Kuchnia detal_CShading_LightMix_full.webp', caption: 'Detal kuchenny' },
            { src: 'images/renders/Project_2_wil/Jaśniejsze_full.webp', caption: 'Jasna przestrzeń' },
            { src: 'images/renders/Project_2_wil/Detal_full.webp', caption: 'Detal dekoracyjny' },
            { src: 'images/renders/Project_2_wil/Detal_CShading_LightMix_full.webp', caption: 'Detal z oświetleniem' },
            { src: 'images/renders/Project_2_wil/łazienka_full.webp', caption: 'Elegancka łazienka' },
            { src: 'images/renders/Project_2_wil/Umywalka_full.webp', caption: 'Strefa umywalkowa' }
        ]
    },
    'project_3': {
        title: 'Ciepłe Mieszkanie na Bemowie',
        description: 'Przytulne mieszkanie rodzinne z ciepłą, naturalną kolorystyką. Projekt stawia na komfort i funkcjonalność, łącząc przestrzeń dzienną z kuchnią i osobną sypialnią. Naturalne materiały, drewniane akcenty i przemyślane oświetlenie tworzą atmosferę spokoju i harmonii.',
        location: 'Bemowo, Warszawa',
        area: '~65m²',
        tags: ['Mieszkanie', 'Rodzinne', 'Ciepłe', 'Naturalne', 'Przytulne'],
        images: [
            { src: 'images/renders/Project_3_mag/Kanapa_full.webp', caption: 'Salon z kanapą' },
            { src: 'images/renders/Project_3_mag/Po_full.webp', caption: 'Strefa wypoczynkowa' },
            { src: 'images/renders/Project_3_mag/detal_full.webp', caption: 'Detal projektowy' },
            { src: 'images/renders/Project_3_mag/Kuchnia_full.webp', caption: 'Funkcjonalna kuchnia' },
            { src: 'images/renders/Project_3_mag/kuchnia2_full.webp', caption: 'Widok na kuchnię' },
            { src: 'images/renders/Project_3_mag/Sypialnia_full.webp', caption: 'Przytulna sypialnia' },
            { src: 'images/renders/Project_3_mag/Sypialnia2_full.webp', caption: 'Strefa nocna' },
            { src: 'images/renders/Project_3_mag/Łazienka 2_full.webp', caption: 'Nowoczesna łazienka' }
        ]
    },
    'project_4': {
        title: 'Nowoczesne Mieszkanie w Kazimierzu',
        description: 'Minimalistyczny projekt mieszkania z otwartą przestrzenią dzienną. Przemyślany układ funkcjonalny zapewnia wygodę użytkowania, a nowoczesny design z subtelnymi akcentami tworzy elegancką całość. Projekt charakteryzuje się czystymi liniami i harmonijną kompozycją.',
        location: 'Kazimierz',
        area: '~70m²',
        tags: ['Mieszkanie', 'Minimalistyczne', 'Nowoczesne', 'Funkcjonalne'],
        images: [
            { src: 'images/renders/Project_4_kaz/Widok na tv_full.webp', caption: 'Widok na strefę TV' },
            { src: 'images/renders/Project_4_kaz/Widok na kanapę_full.webp', caption: 'Widok na kanapę' },
            { src: 'images/renders/Project_4_kaz/TV_full.webp', caption: 'Strefa telewizyjna' },
            { src: 'images/renders/Project_4_kaz/Widok na stół_full.webp', caption: 'Strefa jadalna' },
            { src: 'images/renders/Project_4_kaz/Widok na drzwi wejściowe_full.webp', caption: 'Widok na wejście' },
            { src: 'images/renders/Project_4_kaz/Widok na zabudowę_full.webp', caption: 'Zabudowa meblowa' }
        ]
    },
    'project_s1': {
        title: 'Projekt Konkursowy - Opcja Pierwsza',
        description: 'Minimalistyczna propozycja konkursowa łącząca czystość formy z funkcjonalnością. Projekt wyróżnia się elegancją, wykorzystaniem naturalnych materiałów i przemyślanym oświetleniem. Harmonijna kompozycja przestrzeni tworzy spokojną, nowoczesną atmosferę.',
        location: 'Projekt Konkursowy',
        tags: ['Konkurs', 'Minimalizm', 'Elegancja', 'Naturalne Materiały'],
        images: [
            { src: 'images/renders/Project_S1/Ujęcie I_full.webp', caption: 'Ujęcie I - perspektywa ogólna' },
            { src: 'images/renders/Project_S1/Ujęcie II_full.webp', caption: 'Ujęcie II - detal' },
            { src: 'images/renders/Project_S1/Ujęcie III_full.webp', caption: 'Ujęcie III - atmosfera wnętrza' }
        ]
    },
    'project_s2': {
        title: 'Projekt Konkursowy - Opcja Druga',
        description: 'Nowoczesna wizja przestrzeni z ciepłymi akcentami. Projekt łączy funkcjonalność z estetyką, stawiając na harmonię kolorów i tekstur. Przemyślane oświetlenie i naturalne materiały tworzą przytulną, ale nowoczesną atmosferę.',
        location: 'Projekt Konkursowy',
        tags: ['Konkurs', 'Nowoczesne', 'Ciepłe Akcenty', 'Harmonia'],
        images: [
            { src: 'images/renders/Project_S2/Ujęcie I_full.webp', caption: 'Ujęcie I - widok ogólny' },
            { src: 'images/renders/Project_S2/Ujęcie II_full.webp', caption: 'Ujęcie II - kompozycja' },
            { src: 'images/renders/Project_S2/Ujęcie III_full.webp', caption: 'Ujęcie III - detale' }
        ]
    },
    'project_s3': {
        title: 'Projekt Konkursowy - Opcja Trzecia',
        description: 'Harmonijne połączenie funkcjonalności i estetyki w przestrzeni mieszkalnej. Projekt charakteryzuje się przemyślanym układem, elegancką kolorystyką i dbałością o detale. Balans między nowoczesnością a przytulnością tworzy idealną przestrzeń do życia.',
        location: 'Projekt Konkursowy',
        tags: ['Konkurs', 'Funkcjonalność', 'Estetyka', 'Harmonia'],
        images: [
            { src: 'images/renders/Project_S3/Ujęcie I_full.webp', caption: 'Ujęcie I - koncepcja główna' },
            { src: 'images/renders/Project_S3/Ujęcie II_full.webp', caption: 'Ujęcie II - przestrzeń dzienna' },
            { src: 'images/renders/Project_S3/Ujęcie III_full.webp', caption: 'Ujęcie III - detale wnętrza' }
        ]
    },
    'project_s4': {
        title: 'Projekt Konkursowy - Opcja Czwarta',
        description: 'Subtelna propozycja konkursowa stawiająca na detale i przemyślaną kompozycję. Projekt charakteryzuje się elegancją, czystością formy i funkcjonalnością. Harmonijna paleta kolorów i naturalne materiały tworzą spokojną, nowoczesną przestrzeń.',
        location: 'Projekt Konkursowy',
        tags: ['Konkurs', 'Subtelność', 'Detale', 'Kompozycja'],
        images: [
            { src: 'images/renders/Project_S4/Ujęcie 1_full.webp', caption: 'Ujęcie 1 - wizja główna' },
            { src: 'images/renders/Project_S4/Ujęcie 2_full.webp', caption: 'Ujęcie 2 - perspektywa' }
        ]
    }
};

let currentLightboxIndex = 0;
let currentProjectData = null;

// Lightbox Functions - Updated for Project Galleries
function openLightbox(element) {
    // Handle both button clicks and portfolio item clicks
    const portfolioItem = element.closest('.portfolio-item');
    
    if (!portfolioItem) return;
    
    const projectId = portfolioItem.getAttribute('data-project-id');
    const lightbox = document.getElementById('lightboxOverlay');

    // Get project data
    currentProjectData = portfolioProjects[projectId];
    
    if (!currentProjectData) {
        console.error('Project data not found for:', projectId);
        return;
    }

    // Start at first image
    currentLightboxIndex = 0;

    // Display the first image
    displayLightboxImage(currentLightboxIndex);

    // Show lightbox
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Add click event listeners to portfolio items
document.addEventListener('DOMContentLoaded', function() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach(item => {
        item.addEventListener('click', function(e) {
            // Don't trigger if clicking on a link or button that has its own action
            if (e.target.closest('a[href]:not([data-action])')) return;
            openLightbox(this);
        });
    });
});

function closeLightbox() {
    const lightbox = document.getElementById('lightboxOverlay');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
    currentProjectData = null;
}

function displayLightboxImage(index) {
    if (!currentProjectData || !currentProjectData.images[index]) {
        return;
    }

    const imageData = currentProjectData.images[index];
    const lightboxImg = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDesc = document.getElementById('lightboxDescription');
    const lightboxTags = document.getElementById('lightboxTags');

    // Update image
    lightboxImg.src = imageData.src;
    lightboxImg.alt = imageData.caption;

    // Update title with image counter
    const imageCounter = `${index + 1} / ${currentProjectData.images.length}`;
    lightboxTitle.textContent = `${currentProjectData.title} - ${imageCounter}`;

    // Update description with caption and project info
    let descriptionHTML = `<strong>${imageData.caption}</strong><br>`;
    descriptionHTML += currentProjectData.description;
    
    if (currentProjectData.location) {
        descriptionHTML += `<br><br><strong>Lokalizacja:</strong> ${currentProjectData.location}`;
    }
    if (currentProjectData.area) {
        descriptionHTML += ` | <strong>Powierzchnia:</strong> ${currentProjectData.area}`;
    }
    
    lightboxDesc.innerHTML = descriptionHTML;

    // Clear and populate tags
    lightboxTags.innerHTML = '';
    currentProjectData.tags.forEach(tag => {
        const tagElement = document.createElement('span');
        tagElement.className = 'lightbox-tag';
        tagElement.textContent = tag;
        lightboxTags.appendChild(tagElement);
    });
}

function nextImage() {
    if (!currentProjectData) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % currentProjectData.images.length;
    displayLightboxImage(currentLightboxIndex);
}

function previousImage() {
    if (!currentProjectData) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + currentProjectData.images.length) % currentProjectData.images.length;
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
