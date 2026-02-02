// ================================
// LANGUAGE SWITCHING
// ================================
document.addEventListener('DOMContentLoaded', function() {
    // Language switching functionality
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = 'fr'; // Default language

    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            if (lang !== currentLang) {
                switchLanguage(lang);
                currentLang = lang;
                
                // Update active button
                langButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    function switchLanguage(lang) {
        const elements = document.querySelectorAll('[data-fr][data-en]');
        
        elements.forEach(element => {
            const text = element.getAttribute('data-' + lang);
            if (text) {
                element.innerHTML = text;
            }
        });
    }

    // ================================
    // FAQ ACCORDION
    // ================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', function() {
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });

    // ================================
    // SMOOTH SCROLLING FOR NAVIGATION
    // ================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ================================
    // SCROLL ANIMATIONS
    // ================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.service-card, .why-card, .testimonial-card, .product-card, ' +
        '.stat-card, .process-step, .payment-card, .contact-card, .faq-item'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // ================================
    // SCROLL INDICATOR HIDE
    // ================================
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            scrollIndicator.style.opacity = '0';
        } else {
            scrollIndicator.style.opacity = '0.7';
        }
    });

    // ================================
    // COUNTER ANIMATION FOR STATS
    // ================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasAnimated = false;

    const statObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                statNumbers.forEach(stat => {
                    animateCounter(stat);
                });
            }
        });
    }, { threshold: 0.5 });

    if (statNumbers.length > 0) {
        statObserver.observe(statNumbers[0].closest('.intro-stats'));
    }

    function animateCounter(element) {
        const target = parseInt(element.textContent);
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + '+';
            }
        }, 16);
    }

    // ================================
    // PARALLAX EFFECT FOR HERO
    // ================================
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
            heroContent.style.opacity = 1 - (scrolled / 700);
        }
    });

    // ================================
    // PRODUCT CARDS HOVER EFFECT
    // ================================
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #e8f5e9 100%)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)';
        });
    });

    // ================================
    // WHATSAPP FLOATING BUTTON ANIMATION
    // ================================
    const whatsappFloat = document.querySelector('.whatsapp-float');
    
    if (whatsappFloat) {
        whatsappFloat.addEventListener('click', function(e) {
            // Add click animation
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    }

    // ================================
    // TESTIMONIAL CARDS STAGGER ANIMATION
    // ================================
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
    });

    // ================================
    // SERVICE CARDS ICON ROTATION ON HOVER
    // ================================
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const icon = card.querySelector('.service-icon');
        
        card.addEventListener('mouseenter', function() {
            icon.style.transform = 'rotate(360deg)';
            icon.style.transition = 'transform 0.6s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            icon.style.transform = 'rotate(0deg)';
        });
    });

    // ================================
    // PROCESS STEP PROGRESS ANIMATION
    // ================================
    const processSteps = document.querySelectorAll('.process-step');
    
    const processObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 200);
            }
        });
    }, { threshold: 0.3 });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-50px)';
        step.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        processObserver.observe(step);
    });

    // ================================
    // PAYMENT CARDS PULSE ON SCROLL
    // ================================
    const paymentCards = document.querySelectorAll('.payment-card');
    
    const paymentObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'pulse 1s ease';
                setTimeout(() => {
                    entry.target.style.animation = '';
                }, 1000);
            }
        });
    }, { threshold: 0.5 });

    paymentCards.forEach(card => {
        paymentObserver.observe(card);
    });

    // ================================
    // CONTACT CARDS SPECIAL EFFECTS
    // ================================
    const contactCards = document.querySelectorAll('.contact-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1.1) rotate(5deg)';
            icon.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.contact-icon');
            icon.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // ================================
    // DYNAMIC BACKGROUND GRADIENT
    // ================================
    const heroSection = document.querySelector('.hero-section');
    let gradientPosition = 0;

    setInterval(() => {
        gradientPosition += 0.5;
        if (heroSection) {
            heroSection.style.backgroundPosition = `${gradientPosition}% 50%`;
        }
    }, 50);

    // ================================
    // FOOTER LINKS ANIMATION
    // ================================
    const footerLinks = document.querySelectorAll('.footer-links a');
    
    footerLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });

    // ================================
    // SCROLL TO TOP BUTTON (Hidden by default)
    // ================================
    const scrollToTop = document.createElement('button');
    scrollToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTop.className = 'scroll-to-top';
    scrollToTop.style.cssText = `
        position: fixed;
        bottom: 100px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, var(--primary-red), var(--primary-gold));
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 998;
        box-shadow: 0 8px 20px rgba(230, 57, 70, 0.4);
    `;
    
    document.body.appendChild(scrollToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTop.style.opacity = '1';
        } else {
            scrollToTop.style.opacity = '0';
        }
    });

    scrollToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTop.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.1)';
    });

    scrollToTop.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });

    // ================================
    // CONSOLE MESSAGE
    // ================================
    console.log('%c🚀 BUY IN CHINA - Website Loaded Successfully!', 
        'color: #E63946; font-size: 16px; font-weight: bold;');
    console.log('%c💼 Your trusted partner for shopping in China', 
        'color: #06A77D; font-size: 14px;');
    console.log('%c📱 Contact: +237 698942993 | +86 17539192966', 
        'color: #FFD700; font-size: 12px;');
});

