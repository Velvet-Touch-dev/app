document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');

  // Open mobile menu
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.add('active');
      mobileMenuOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  // Close mobile menu
  function closeMobileMenu() {
    mobileMenu.classList.remove('active');
    mobileMenuOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  // Close menu when clicking on a link
  mobileMenuLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // Screenshot carousel functionality
  const screenshotItems = document.querySelectorAll('.screenshot-item');
  const dots = document.querySelectorAll('.dot');
  const prevBtn = document.querySelector('.nav-prev');
  const nextBtn = document.querySelector('.nav-next');
  let currentSlide = 0;

  function showSlide(index) {
    // Hide all slides
    screenshotItems.forEach(item => item.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Show current slide
    if (screenshotItems[index]) {
      screenshotItems[index].classList.add('active');
    }
    if (dots[index]) {
      dots[index].classList.add('active');
    }

    currentSlide = index;
  }

  function nextSlide() {
    const nextIndex = (currentSlide + 1) % screenshotItems.length;
    showSlide(nextIndex);
  }

  function prevSlide() {
    const prevIndex = (currentSlide - 1 + screenshotItems.length) % screenshotItems.length;
    showSlide(prevIndex);
  }

  // Navigation buttons
  if (nextBtn) {
    nextBtn.addEventListener('click', nextSlide);
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', prevSlide);
  }

  // Dot navigation
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
  });

  // Auto-play carousel
  let autoPlayInterval = setInterval(nextSlide, 5000);

  // Pause auto-play on hover
  const screenshotCarousel = document.getElementById('screenshotCarousel');
  if (screenshotCarousel) {
    screenshotCarousel.addEventListener('mouseenter', () => {
      clearInterval(autoPlayInterval);
    });

    screenshotCarousel.addEventListener('mouseleave', () => {
      autoPlayInterval = setInterval(nextSlide, 5000);
    });
  }

  // Touch/swipe support for carousel
  let touchStartX = 0;
  let touchEndX = 0;

  if (screenshotCarousel) {
    screenshotCarousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });

    screenshotCarousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });
  }

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }
  }

  // FAQ accordion functionality
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const faqItem = question.closest('.faq-item');
      const isActive = faqItem.classList.contains('active');

      // Close all FAQ items
      document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
      });

      // Toggle current item
      if (!isActive) {
        faqItem.classList.add('active');
      }
    });
  });

  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = 70;
        const targetPosition = targetElement.offsetTop - navbarHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (navbar) {
      // Add/remove backdrop blur based on scroll position
      if (currentScrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
      } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(20px)';
      }

      // Hide/show navbar on scroll (optional)
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
      } else {
        navbar.style.transform = 'translateY(0)';
      }
    }

    lastScrollY = currentScrollY;
  });

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

  // Observe elements for scroll animations
  const animatedElements = document.querySelectorAll('.feature-card, .screenshot-item, .faq-item');
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(el);
  });

  // Keyboard navigation for carousel
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      prevSlide();
    } else if (e.key === 'ArrowRight') {
      nextSlide();
    }
  });

  // Button click effects
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Add ripple CSS if not already present
  if (!document.querySelector('#ripple-styles')) {
    const rippleStyles = document.createElement('style');
    rippleStyles.id = 'ripple-styles';
    rippleStyles.textContent = `
      .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
      }
      
      @keyframes ripple-animation {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(rippleStyles);
  }

  // Force dark theme
  document.body.classList.add('dark-theme');

  // Performance optimization: Lazy load images
  const images = document.querySelectorAll('img[src]');
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.style.opacity = '1';
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.3s';
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    imageObserver.observe(img);
  });

  // Add loading state to download button
  const downloadBtn = document.querySelector('.btn-download');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      const originalText = this.innerHTML;
      this.innerHTML = '<span class="material-icons">hourglass_empty</span><span>Preparing Download...</span>';
      this.style.pointerEvents = 'none';
      
      setTimeout(() => {
        this.innerHTML = originalText;
        this.style.pointerEvents = 'auto';
      }, 2000);
    });
  }

  // Initialize carousel on first load
  if (screenshotItems.length > 0) {
    showSlide(0);
  }

  // Add bounce animation to hero badge
  const heroBadge = document.querySelector('.hero-badge');
  if (heroBadge) {
    setInterval(() => {
      heroBadge.style.animation = 'none';
      setTimeout(() => {
        heroBadge.style.animation = 'pulse 2s ease-in-out infinite';
      }, 10);
    }, 8000);
  }

  // Enhanced scroll-triggered animations
  const scrollElements = document.querySelectorAll('.hero-stats .stat, .download-feature');
  const scrollElementsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0) scale(1)';
        }, index * 100);
      }
    });
  }, { threshold: 0.5 });

  scrollElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px) scale(0.8)';
    el.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
    scrollElementsObserver.observe(el);
  });

  console.log('🎉 No Safe Word website loaded successfully!');
});