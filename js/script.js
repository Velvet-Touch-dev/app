document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu functionality
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileMenuClose = document.querySelector('.mobile-menu-close');
  const overlay = document.querySelector('.overlay');
  
  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileMenu.classList.add('active');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }
  
  if (mobileMenuClose) {
    mobileMenuClose.addEventListener('click', closeMenu);
  }
  
  if (overlay) {
    overlay.addEventListener('click', closeMenu);
  }
  
  function closeMenu() {
    mobileMenu.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  // Screenshot carousel functionality
  const dots = document.querySelectorAll('.dot');
  const screenshots = document.querySelector('.screenshot-wrapper');
  
  if (dots.length > 0 && screenshots) {
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        // Calculate the scroll position
        const scrollPosition = index * screenshots.clientWidth;
        screenshots.scrollTo({
          left: scrollPosition,
          behavior: 'smooth'
        });
        
        // Update active dot
        dots.forEach(d => d.classList.remove('active'));
        dot.classList.add('active');
      });
    });
    
    // Update dots on scroll
    screenshots.addEventListener('scroll', () => {
      const index = Math.round(screenshots.scrollLeft / screenshots.clientWidth);
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    });
  }
  
  // Dark mode toggle
  const darkModeToggle = document.getElementById('dark-mode-toggle');
  if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      document.body.classList.add('dark-mode');
    }
  }
  
  // Smooth scrolling for navigation links
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Close mobile menu if open
      if (mobileMenu && mobileMenu.classList.contains('active')) {
        closeMenu();
      }
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 70, // Adjust for navbar height
          behavior: 'smooth'
        });
      }
    });
  });
});
