document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        mobileMenuBtn.innerHTML = nav.classList.contains('active') ? 
            '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
            }
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
            });
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Portfolio gallery
    const galleryTrack = document.querySelector('.gallery-track');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const prevBtn = document.querySelector('.gallery-nav.prev');
    const nextBtn = document.querySelector('.gallery-nav.next');
    const imageViewer = document.querySelector('.image-viewer');
    const closeViewer = document.querySelector('.close-viewer');
    const viewerImage = document.querySelector('.viewer-content img');
    const imageTitle = document.querySelector('.image-title');
    const imageDescription = document.querySelector('.image-description');
    
    let currentIndex = 0;
    const itemWidth = galleryItems[0].offsetWidth;
    const totalItems = galleryItems.length;
    
    // Sample project data (in a real app, this would come from an API or database)
    const projects = [
        {
            title: "E-commerce Website",
            description: "A fully responsive e-commerce platform with product filtering, cart functionality, and secure checkout."
        },
        {
            title: "Portfolio Template",
            description: "A customizable portfolio template for creatives with animated elements and dark mode."
        },
        {
            title: "Task Management App",
            description: "A productivity app with drag-and-drop interface, team collaboration, and progress tracking."
        },
        {
            title: "Weather Dashboard",
            description: "Real-time weather information with 5-day forecast, location search, and interactive maps."
        },
        {
            title: "Fitness Tracker",
            description: "Mobile-first fitness application with workout logging, progress charts, and social features."
        }
    ];
    
    // Auto-scroll gallery
    let galleryInterval = setInterval(autoScrollGallery, 5000);
    
    function autoScrollGallery() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateGalleryPosition();
    }
    
    function updateGalleryPosition() {
        const offset = -currentIndex * itemWidth;
        galleryTrack.style.transform = `translateX(${offset}px)`;
    }
    
    prevBtn.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + totalItems) % totalItems;
        updateGalleryPosition();
        resetGalleryInterval();
    });
    
    nextBtn.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % totalItems;
        updateGalleryPosition();
        resetGalleryInterval();
    });
    
    function resetGalleryInterval() {
        clearInterval(galleryInterval);
        galleryInterval = setInterval(autoScrollGallery, 5000);
    }
    
    // Image viewer functionality
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').getAttribute('src');
            viewerImage.setAttribute('src', imgSrc);
            imageTitle.textContent = projects[index].title;
            imageDescription.textContent = projects[index].description;
            imageViewer.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeViewer.addEventListener('click', function() {
        imageViewer.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
    
    imageViewer.addEventListener('click', function(e) {
        if (e.target === imageViewer) {
            imageViewer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Reviews carousel
    const reviewsTrack = document.querySelector('.reviews-track');
    const reviews = document.querySelectorAll('.review');
    const reviewPrev = document.querySelector('.review-prev');
    const reviewNext = document.querySelector('.review-next');
    const reviewDotsContainer = document.querySelector('.review-dots');
    
    let currentReviewIndex = 0;
    const reviewWidth = reviews[0].offsetWidth;
    const totalReviews = reviews.length;
    
    // Create dots
    reviews.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('review-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            currentReviewIndex = index;
            updateReviewPosition();
            updateDots();
        });
        reviewDotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.review-dot');
    
    // Auto-scroll reviews
    let reviewInterval = setInterval(autoScrollReviews, 6000);
    
    function autoScrollReviews() {
        currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
        updateReviewPosition();
        updateDots();
    }
    
    function updateReviewPosition() {
        const offset = -currentReviewIndex * reviewWidth;
        reviewsTrack.style.transform = `translateX(${offset}px)`;
    }
    
    function updateDots() {
        dots.forEach((dot, index) => {
            if (index === currentReviewIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    reviewPrev.addEventListener('click', function() {
        currentReviewIndex = (currentReviewIndex - 1 + totalReviews) % totalReviews;
        updateReviewPosition();
        updateDots();
        resetReviewInterval();
    });
    
    reviewNext.addEventListener('click', function() {
        currentReviewIndex = (currentReviewIndex + 1) % totalReviews;
        updateReviewPosition();
        updateDots();
        resetReviewInterval();
    });
    
    function resetReviewInterval() {
        clearInterval(reviewInterval);
        reviewInterval = setInterval(autoScrollReviews, 6000);
    }
    
    // Form submission
    const contactForm = document.querySelector('.contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // In a real application, you would send the form data to a server here
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
    
    // Intersection Observer for animations
    const animatedElements = document.querySelectorAll('.animated-text, .animated-image');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    animatedElements.forEach(element => {
        observer.observe(element);
    });
});