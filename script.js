// ===================================
// ODIN RECIPES - JAVASCRIPT 2025
// ===================================

// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.currentTheme = localStorage.getItem('theme') || 'light';
    this.init();
  }

  init() {
    // Set initial theme
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    this.updateToggleButton();

    // Add event listener
    if (this.themeToggle) {
      this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    localStorage.setItem('theme', this.currentTheme);
    this.updateToggleButton();
    this.animateToggle();
  }

  updateToggleButton() {
    if (this.themeToggle) {
      const icon = this.currentTheme === 'light' ? '🌙' : '☀️';
      const text = this.currentTheme === 'light' ? 'Dark' : 'Light';
      this.themeToggle.innerHTML = `<span>${icon}</span><span class="theme-text">${text}</span>`;
    }
  }

  animateToggle() {
    if (this.themeToggle) {
      this.themeToggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        this.themeToggle.style.transform = 'rotate(0deg)';
      }, 300);
    }
  }
}

// Recipe Search and Filter
class RecipeSearch {
  constructor() {
    this.searchInput = document.getElementById('recipe-search');
    this.recipeCards = document.querySelectorAll('.recipe-card');
    this.init();
  }

  init() {
    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
  }

  handleSearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();

    this.recipeCards.forEach(card => {
      const title = card.querySelector('.recipe-card-title').textContent.toLowerCase();
      const description = card.querySelector('.recipe-card-description').textContent.toLowerCase();
      const category = card.dataset.category?.toLowerCase() || '';

      const matches = title.includes(term) || description.includes(term) || category.includes(term);

      if (matches || term === '') {
        card.style.display = 'flex';
        card.classList.add('fade-in');
      } else {
        card.style.display = 'none';
      }
    });

    // Show "no results" message if needed
    this.updateNoResultsMessage(term);
  }

  updateNoResultsMessage(term) {
    const visibleCards = Array.from(this.recipeCards).filter(card => card.style.display !== 'none');
    let noResultsMsg = document.getElementById('no-results');

    if (visibleCards.length === 0 && term !== '') {
      if (!noResultsMsg) {
        noResultsMsg = document.createElement('div');
        noResultsMsg.id = 'no-results';
        noResultsMsg.className = 'no-results';
        noResultsMsg.innerHTML = `
          <p style="text-align: center; color: var(--color-text-secondary); font-size: var(--font-size-lg); padding: var(--spacing-2xl);">
            No recipes found for "<strong>${term}</strong>". Try a different search term!
          </p>
        `;
        document.querySelector('.recipe-grid').after(noResultsMsg);
      } else {
        noResultsMsg.querySelector('strong').textContent = term;
        noResultsMsg.style.display = 'block';
      }
    } else if (noResultsMsg) {
      noResultsMsg.style.display = 'none';
    }
  }
}

// Smooth Scroll for Anchor Links
class SmoothScroll {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }
}

// Animation on Scroll
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('.recipe-card, .recipe-section');
    this.init();
  }

  init() {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1 }
      );

      this.elements.forEach(el => observer.observe(el));
    } else {
      // Fallback for older browsers
      this.elements.forEach(el => el.classList.add('fade-in'));
    }
  }
}

// Recipe Card Interactions
class RecipeCardInteractions {
  constructor() {
    this.cards = document.querySelectorAll('.recipe-card');
    this.init();
  }

  init() {
    this.cards.forEach(card => {
      // Add keyboard navigation
      card.setAttribute('tabindex', '0');
      
      card.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const link = card.querySelector('a');
          if (link) link.click();
        }
      });

      // Add visual feedback
      card.addEventListener('mouseenter', () => {
        card.style.transition = 'all 0.3s ease';
      });
    });
  }
}

// Header Scroll Effect
class HeaderScroll {
  constructor() {
    this.header = document.querySelector('.header');
    this.lastScroll = 0;
    this.init();
  }

  init() {
    if (!this.header) return;

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;

      if (currentScroll > 100) {
        this.header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      } else {
        this.header.style.boxShadow = 'var(--shadow-sm)';
      }

      this.lastScroll = currentScroll;
    });
  }
}

// Print Recipe Function
function printRecipe() {
  window.print();
}

// Add to Favorites (localStorage)
class FavoritesManager {
  constructor() {
    this.favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
  }

  toggleFavorite(recipeId) {
    const index = this.favorites.indexOf(recipeId);
    if (index > -1) {
      this.favorites.splice(index, 1);
    } else {
      this.favorites.push(recipeId);
    }
    localStorage.setItem('favorites', JSON.stringify(this.favorites));
    return this.favorites.includes(recipeId);
  }

  isFavorite(recipeId) {
    return this.favorites.includes(recipeId);
  }
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  new ThemeManager();
  new RecipeSearch();
  new SmoothScroll();
  new ScrollAnimations();
  new RecipeCardInteractions();
  new HeaderScroll();

  // Add loading complete class
  document.body.classList.add('loaded');

  // Console greeting
  console.log('%c🍳 Odin Recipes 2025', 'font-size: 20px; font-weight: bold; color: #ff6b35;');
  console.log('%cModernized with ❤️', 'font-size: 14px; color: #666;');
});

// Export for use in other scripts if needed
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    RecipeSearch,
    FavoritesManager
  };
}
