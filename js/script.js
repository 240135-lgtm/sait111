// ========================================
// Mobile Menu Toggle
// ========================================
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
    });
  });
}

// ========================================
// Counter Animation
// ========================================
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.ceil(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

// Observe stat numbers for animation
const statNumbers = document.querySelectorAll('.stat-number');
if (statNumbers.length > 0) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

// ========================================
// Scroll Reveal Animation
// ========================================
function reveal() {
  const reveals = document.querySelectorAll('.reveal, .category-card, .person-card');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

window.addEventListener('scroll', reveal);
reveal(); // Call once on load

// ========================================
// Daily Quote Rotation
// ========================================
const quotes = [
  {
    text: "Гениальность — это один процент вдохновения и девяносто девять процентов труда",
    author: "Томас Эдисон"
  },
  {
    text: "Воображение важнее знания. Знание ограничено, воображение охватывает весь мир",
    author: "Альберт Эйнштейн"
  },
  {
    text: "Простота — это крайняя степень изощрённости",
    author: "Леонардо да Винчи"
  },
  {
    text: "Сначала они тебя игнорируют, потом смеются над тобой, потом борются с тобой, а потом ты побеждаешь",
    author: "Махатма Ганди"
  },
  {
    text: "Мера величия человека — его способность к изменениям",
    author: "Уинстон Черчилль"
  },
  {
    text: "Лучший способ предсказать будущее — создать его",
    author: "Алан Кей"
  },
  {
    text: "Код — это поэзия, только машины его понимают лучше",
    author: "Линус Торвальдс"
  },
  {
    text: "Красота спасёт мир",
    author: "Фёдор Достоевский"
  }
];

const dailyQuote = document.getElementById('daily-quote');
if (dailyQuote) {
  // Use the day of the year as a seed for "random" but consistent daily quote
  const dayOfYear = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  const quoteIndex = dayOfYear % quotes.length;
  const quote = quotes[quoteIndex];
  
  dailyQuote.innerHTML = `
    <p>"${quote.text}"</p>
    <cite>— ${quote.author}</cite>
  `;
}

// ========================================
// Smooth Scroll for Anchor Links
// ========================================
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

// ========================================
// Header Background on Scroll
// ========================================
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(255, 255, 255, 0.98)';
      header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
    } else {
      header.style.background = 'rgba(255, 255, 255, 0.95)';
      header.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)';
    }
  });
}

// ========================================
// Card Hover Tilt Effect
// ========================================
const cards = document.querySelectorAll('.person-card');
cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
  });
});

// ========================================
// Search/Filter Functionality (for category pages)
// ========================================
const searchInput = document.getElementById('person-search');
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const personCards = document.querySelectorAll('.person-card');
    
    personCards.forEach(card => {
      const name = card.querySelector('.person-name').textContent.toLowerCase();
      const description = card.querySelector('.person-description').textContent.toLowerCase();
      
      if (name.includes(searchTerm) || description.includes(searchTerm)) {
        card.style.display = 'block';
        card.style.animation = 'fadeIn 0.3s ease';
      } else {
        card.style.display = 'none';
      }
    });
  });
}

// ========================================
// Initialize Page
// ========================================
document.addEventListener('DOMContentLoaded', () => {
  // Add loaded class for initial animations
  document.body.classList.add('loaded');
  
  // Initialize all reveal elements
  document.querySelectorAll('.category-card, .person-card').forEach((el, index) => {
    el.style.animationDelay = `${index * 0.1}s`;
  });
});

console.log('✨ Великие Люди - сайт загружен');
