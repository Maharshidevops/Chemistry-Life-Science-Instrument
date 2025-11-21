// Modern, Clean, and Efficient JavaScript for Laboratory Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                menuToggle.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        });
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Show/hide back to top button
            const backToTop = document.querySelector('.back-to-top');
            if (backToTop) {
                if (window.scrollY > 300) {
                    backToTop.classList.add('visible');
                } else {
                    backToTop.classList.remove('visible');
                }
            }
        });
    }


    // Typed Text Animation in Hero Section
    const typedTextElement = document.getElementById('typed-text');
    if (typedTextElement) {
        const typedStrings = [
            'Advanced Analytical Instruments',
            'Cutting-Edge Research Facility',
            'GSFC University Laboratory'
        ];
        
        let currentStringIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let deleteSpeed = 50;
        let pauseBetween = 2000;
        
        function type() {
            const currentString = typedStrings[currentStringIndex];
            
            if (isDeleting) {
                // Delete character
                typedTextElement.textContent = currentString.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                typingSpeed = deleteSpeed;
            } else {
                // Type character
                typedTextElement.textContent = currentString.substring(0, currentCharIndex + 1);
                currentCharIndex++;
                typingSpeed = 100;
            }
            
            // Check if we've finished the current string
            if (!isDeleting && currentCharIndex === currentString.length) {
                // Pause at the end of the string
                typingSpeed = pauseBetween;
                isDeleting = true;
            } else if (isDeleting && currentCharIndex === 0) {
                // Move to the next string
                isDeleting = false;
                currentStringIndex = (currentStringIndex + 1) % typedStrings.length;
            }
            
            setTimeout(type, typingSpeed);
        }
        
        // Start the typing effect after a delay
        setTimeout(type, 1000);
    }


    // Modern Slider Implementation
    class InstrumentSlider {
        constructor(container) {
            this.container = container;
            this.slider = this.container.querySelector('.instrument-slider');
            this.cards = Array.from(this.slider.querySelectorAll('.instrument-card'));
            this.prevBtn = this.container.querySelector('.slider-nav.prev');
            this.nextBtn = this.container.querySelector('.slider-nav.next');
            this.dotsContainer = this.container.querySelector('.slider-dots');
            this.dots = [];
            this.currentIndex = 0;
            this.isAnimating = false;
            this.touchStartX = 0;
            this.touchEndX = 0;
            this.autoScrollInterval = null;
            
            this.init();
        }
        
        init() {
            this.setupSlider();
            this.createDots();
            this.setupEventListeners();
            this.updateSlider();
        }
        
        setupSlider() {
            this.slider.setAttribute('role', 'region');
            this.slider.setAttribute('aria-label', 'Instruments carousel');
            this.slider.style.display = 'flex';
            
            this.cards.forEach((card, index) => {
                card.setAttribute('role', 'group');
                card.setAttribute('aria-roledescription', 'slide');
                card.setAttribute('aria-label', `${index + 1} of ${this.cards.length}`);
                card.style.flex = '0 0 auto';
                card.style.scrollSnapAlign = 'start';
            });
        }
        
        createDots() {
            if (!this.dotsContainer) return;
            
            this.dotsContainer.innerHTML = '';
            const maxDots = Math.min(5, this.cards.length);
            
            for (let i = 0; i < maxDots; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'slider-dot';
                dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
                dot.addEventListener('click', () => this.goToSlide(i));
                this.dotsContainer.appendChild(dot);
                this.dots.push(dot);
            }
            
            this.updateDots();
        }
        
        updateDots() {
            this.dots.forEach((dot, index) => {
                const isActive = index === this.currentIndex % this.dots.length;
                dot.classList.toggle('active', isActive);
                dot.setAttribute('aria-current', isActive ? 'true' : 'false');
            });
        }
        
        goToSlide(index, smooth = true) {
            if (this.isAnimating || index < 0 || index >= this.cards.length) return;
            
            this.isAnimating = true;
            this.currentIndex = index;
            const targetCard = this.cards[index];
            
            targetCard.scrollIntoView({
                behavior: smooth ? 'smooth' : 'auto',
                block: 'nearest',
                inline: 'center'
            });
            
            this.updateSlider();
            
            setTimeout(() => {
                this.isAnimating = false;
            }, 500);
        }
        
        nextSlide() {
            const nextIndex = (this.currentIndex + 1) % this.cards.length;
            this.goToSlide(nextIndex);
        }
        
        prevSlide() {
            const prevIndex = (this.currentIndex - 1 + this.cards.length) % this.cards.length;
            this.goToSlide(prevIndex);
        }
        
        updateSlider() {
            if (this.prevBtn) {
                this.prevBtn.disabled = this.currentIndex === 0;
                this.prevBtn.setAttribute('aria-disabled', this.currentIndex === 0);
            }
            
            if (this.nextBtn) {
                this.nextBtn.disabled = this.currentIndex >= this.cards.length - 1;
                this.nextBtn.setAttribute('aria-disabled', this.currentIndex >= this.cards.length - 1);
            }
            
            this.updateDots();
            
            this.cards.forEach((card, index) => {
                card.setAttribute('aria-hidden', index !== this.currentIndex);
            });
        }
        
        handleTouchStart(e) {
            this.touchStartX = e.touches[0].clientX;
            this.touchEndX = this.touchStartX;
        }
        
        handleTouchMove(e) {
            this.touchEndX = e.touches[0].clientX;
        }
        
        handleTouchEnd() {
            const swipeThreshold = 50;
            const swipeDistance = this.touchEndX - this.touchStartX;
            
            if (Math.abs(swipeDistance) > swipeThreshold) {
                if (swipeDistance > 0) {
                    this.prevSlide();
                } else {
                    this.nextSlide();
                }
            }
        }
        
        setupEventListeners() {
            // Navigation buttons
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }
            
            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }
            
            // Keyboard navigation
            this.slider.addEventListener('keydown', (e) => {
                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        this.prevSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        this.nextSlide();
                        break;
                    case 'Home':
                        e.preventDefault();
                        this.goToSlide(0);
                        break;
                    case 'End':
                        e.preventDefault();
                        this.goToSlide(this.cards.length - 1);
                        break;
                }
            });
            
            // Touch events
            this.slider.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: true });
            this.slider.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: true });
            this.slider.addEventListener('touchend', () => this.handleTouchEnd(), { passive: true });
        }
    }
    
    // Initialize all sliders on the page
    const initializeSliders = () => {
        document.querySelectorAll('.instruments-container').forEach(container => {
            new InstrumentSlider(container);
        });
    };
    
    // Initialize sliders when the DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeSliders);
    } else {
        initializeSliders();
    }

    // Initialize Modal Functionality
    function initModal() {
        const modal = document.getElementById('instrumentModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalBody = document.getElementById('modalBody');
        const closeModal = document.querySelector('.close-modal');
        
        if (!modal || !modalTitle || !modalBody) {
            console.error('Required modal elements not found');
            return;
        }
        
        // Open modal when clicking on instrument details button
        document.querySelectorAll('.btn-details').forEach(button => {
            button.addEventListener('click', function() {
                const instrumentId = this.getAttribute('data-instrument');
                console.log('Button clicked for instrument:', instrumentId);
                
                // Try to find the details content
                let detailsContent = document.getElementById(`${instrumentId}-details`);
                if (!detailsContent) {
                    detailsContent = document.getElementById(instrumentId);
                }
                
                if (detailsContent) {
                    console.log('Found details content for:', instrumentId);
                    // Get the instrument name from the card
                    const instrumentName = this.closest('.instrument-card').querySelector('h3').textContent;
                    modalTitle.textContent = instrumentName;
                    
                    // Clone the content to avoid removing it from the original location
                    const contentClone = detailsContent.cloneNode(true);
                    contentClone.style.display = 'block';
                    
                    // Clear previous content and append the new one
                    modalBody.innerHTML = '';
                    modalBody.appendChild(contentClone);
                    
                    // Show the modal
                    document.body.style.overflow = 'hidden';
                    modal.style.display = 'block';
                    setTimeout(() => {
                        modal.classList.add('show');
                    }, 10);
                    
                    // Scroll to top of modal content
                    modal.scrollTop = 0;
                } else {
                    console.error(`Could not find details content for instrument: ${instrumentId}`);
                    // Fallback: Show a simple message
                    modalTitle.textContent = 'Instrument Details';
                    modalBody.innerHTML = '<p>Details for this instrument are currently unavailable. Please contact the lab for more information.</p>';
                    modal.style.display = 'block';
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
        
        // Close modal when clicking the close button
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close modal when clicking outside the modal content
        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                modal.classList.remove('show');
                setTimeout(() => {
                    modal.style.display = 'none';
                }, 300);
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Initialize modal when DOM is fully loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initModal);
    } else {
        initModal();
    }
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            modal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    });

    // Form Submission Handler
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const formData = new FormData(this);
            const formValues = {};
            formData.forEach((value, key) => {
                formValues[key] = value;
            });
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', formValues);
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Animate elements on scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };
    
    // Run once on page load
    animateOnScroll();
    
        // Run on scroll
    window.addEventListener('scroll', animateOnScroll);

    // Initialize Instruments Carousel
    const instrumentsGrid = document.querySelector('.instruments-grid');
    const instrumentCards = document.querySelectorAll('.instrument-card');
    const prevBtn = document.querySelector('.instruments-nav.prev');
    const nextBtn = document.querySelector('.instruments-nav.next');
    const dotsContainer = document.querySelector('.instruments-dots');
    let currentIndex = 0;
    let itemsPerView = 4; // Default number of items per view
    
    // Update items per view based on screen size
    function updateItemsPerView() {
        if (window.innerWidth <= 600) {
            itemsPerView = 1;
        } else if (window.innerWidth <= 900) {
            itemsPerView = 2;
        } else if (window.innerWidth <= 1200) {
            itemsPerView = 3;
        } else {
            itemsPerView = 4;
        }
        createDots();
        goToSlide(0);
    }
    
    // Create navigation dots
    function createDots() {
        if (!dotsContainer) return;
        
        const dotCount = Math.ceil(instrumentCards.length / itemsPerView);
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'instruments-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            dotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToSlide(i);
            });
        }
    }
    
    // Navigate to specific slide
    function goToSlide(index) {
        if (!instrumentsGrid) return;
        
        const cardWidth = instrumentCards[0].offsetWidth + 32; // Width + gap
        const scrollPosition = index * cardWidth * itemsPerView;
        
        instrumentsGrid.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        document.querySelectorAll('.instruments-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        
        currentIndex = index;
        updateNavButtons();
    }
    
    // Update navigation buttons state
    function updateNavButtons() {
        if (!prevBtn || !nextBtn) return;
        
        const maxIndex = Math.ceil(instrumentCards.length / itemsPerView) - 1;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= maxIndex;
    }
    
    // Initialize the carousel
    if (instrumentsGrid && instrumentCards.length > 0) {
        updateItemsPerView();
        
        // Navigation buttons
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                if (currentIndex > 0) {
                    goToSlide(currentIndex - 1);
                }
            });
            
            nextBtn.addEventListener('click', () => {
                const maxIndex = Math.ceil(instrumentCards.length / itemsPerView) - 1;
                if (currentIndex < maxIndex) {
                    goToSlide(currentIndex + 1);
                }
            });
        }
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                updateItemsPerView();
            }, 250);
        });
        
        // Update active dot on scroll
        instrumentsGrid.addEventListener('scroll', () => {
            const cardWidth = instrumentCards[0].offsetWidth + 32; // Width + gap
            const scrollPosition = instrumentsGrid.scrollLeft;
            const newIndex = Math.round(scrollPosition / (cardWidth * itemsPerView));
            
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                document.querySelectorAll('.instruments-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === currentIndex);
                });
                updateNavButtons();
            }
        });
    }

    // Initialize Gallery Navigation
    const galleryGrid = document.querySelector('.gallery-grid');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryPrevBtn = document.querySelector('.gallery-nav.prev');
    const galleryNextBtn = document.querySelector('.gallery-nav.next');
    const galleryDotsContainer = document.querySelector('.gallery-dots');
    let galleryCurrentIndex = 0;
    const galleryItemsPerView = Math.min(3, Math.floor(window.innerWidth / 300)); // Show 3 items or less based on screen width
    
    // Create dots for gallery
    function createGalleryDots() {
        if (!galleryDotsContainer) return;
        
        const dotCount = Math.ceil(galleryItems.length / galleryItemsPerView);
        galleryDotsContainer.innerHTML = '';
        
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('button');
            dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('data-index', i);
            dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
            galleryDotsContainer.appendChild(dot);
            
            dot.addEventListener('click', () => {
                goToGallerySlide(i);
            });
        }
    }
    
    // Go to specific gallery slide
    function goToGallerySlide(index) {
        if (!galleryGrid || !galleryItems.length) return;
        
        const itemWidth = galleryItems[0].offsetWidth + 24; // Width + gap
        const scrollPosition = index * itemWidth * galleryItemsPerView;
        
        galleryGrid.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
        
        // Update active dot
        document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === Math.floor(index));
        });
        
        galleryCurrentIndex = index;
        updateGalleryNavButtons();
    }
    
    // Update gallery navigation buttons state
    function updateGalleryNavButtons() {
        if (!galleryPrevBtn || !galleryNextBtn) return;
        
        const maxIndex = Math.ceil(galleryItems.length / galleryItemsPerView) - 1;
        galleryPrevBtn.disabled = galleryCurrentIndex === 0;
        galleryNextBtn.disabled = galleryCurrentIndex >= maxIndex;
    }
    
    // Initialize gallery
    if (galleryGrid && galleryItems.length > 0) {
        createGalleryDots();
        updateGalleryNavButtons();
        
        // Navigation buttons
        if (galleryPrevBtn && galleryNextBtn) {
            galleryPrevBtn.addEventListener('click', () => {
                if (galleryCurrentIndex > 0) {
                    goToGallerySlide(galleryCurrentIndex - 1);
                }
            });
            
            galleryNextBtn.addEventListener('click', () => {
                const maxIndex = Math.ceil(galleryItems.length / galleryItemsPerView) - 1;
                if (galleryCurrentIndex < maxIndex) {
                    goToGallerySlide(galleryCurrentIndex + 1);
                }
            });
        }
        
        // Handle window resize for gallery
        let galleryResizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(galleryResizeTimer);
            galleryResizeTimer = setTimeout(() => {
                createGalleryDots();
                goToGallerySlide(0);
            }, 250);
        });
        
        // Update active dot on scroll for gallery
        galleryGrid.addEventListener('scroll', () => {
            const itemWidth = galleryItems[0].offsetWidth + 24; // Width + gap
            const scrollPosition = galleryGrid.scrollLeft;
            const newIndex = Math.round(scrollPosition / (itemWidth * galleryItemsPerView));
            
            if (newIndex !== galleryCurrentIndex) {
                galleryCurrentIndex = newIndex;
                document.querySelectorAll('.gallery-dot').forEach((dot, i) => {
                    dot.classList.toggle('active', i === galleryCurrentIndex);
                });
                updateGalleryNavButtons();
            }
        });
    }
});
