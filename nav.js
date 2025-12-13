/* =============================================
   GULLIVER PREP SUPPLEMENTAL ESSAY GUIDE
   Shared Navigation & Interactivity
   ============================================= */

// Navigation Data
const NAV_ITEMS = [
    { href: 'index.html', label: 'Research', id: 'research' },
    { href: 'strategies.html', label: 'Essay Strategies', id: 'strategies' },
    { href: 'why-school.html', label: 'Why This School', id: 'why-school' },
    { href: 'community.html', label: 'Community', id: 'community' },
    { href: 'activity.html', label: 'Meaningful Activity', id: 'activity' },
    { href: 'leadership.html', label: 'Leadership', id: 'leadership' },
    { href: 'intellectual.html', label: 'Intellectual Passion', id: 'intellectual' },
    { href: 'workshop.html', label: 'Writing Workshop', id: 'workshop' }
];

// Render Sidebar Navigation
function renderSidebar(currentPage) {
    const sidebar = document.querySelector('.sidebar');
    if (!sidebar) return;
    
    sidebar.innerHTML = `
        <div class="sidebar-brand">
            <h1>Gulliver<br>Prep</h1>
            <div class="sidebar-brand-divider"></div>
            <p class="sidebar-brand-subtitle">Supplemental Essay</p>
            <p class="sidebar-brand-subtitle">Guide 2026-27</p>
        </div>
        <ul class="sidebar-nav">
            ${NAV_ITEMS.map(item => `
                <li class="${item.id === currentPage ? 'active' : ''}">
                    <a href="${item.href}" class="${item.id === currentPage ? 'active' : ''}">${item.label}</a>
                </li>
            `).join('')}
        </ul>
    `;
}

// Render Mobile Header
function renderMobileHeader() {
    const header = document.querySelector('.mobile-header');
    if (!header) return;
    
    header.innerHTML = `
        <h1>Gulliver Prep</h1>
        <p>Supplemental Essay Guide 2026-27</p>
    `;
}

// Progress Bar
function initProgressBar() {
    const progressFill = document.querySelector('.progress-bar-fill');
    if (!progressFill) return;
    
    window.addEventListener('scroll', () => {
        const scrollTop = document.documentElement.scrollTop;
        const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (scrollTop / scrollHeight) * 100;
        progressFill.style.width = progress + '%';
    });
}

// Accordion Functionality
function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const wasOpen = item.classList.contains('open');
            
            // Close all accordions in the same group
            item.parentElement.querySelectorAll('.accordion-item').forEach(acc => {
                acc.classList.remove('open');
            });
            
            // Toggle clicked accordion
            if (!wasOpen) {
                item.classList.add('open');
            }
        });
    });
}

// Slide Carousel
function initSlideCarousel(containerId, slides) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    let currentSlide = 0;
    
    function renderSlide() {
        const slide = slides[currentSlide];
        container.querySelector('.slide-content').innerHTML = `
            <div class="slide-icon">${slide.icon}</div>
            <h3 class="slide-title">${slide.title}</h3>
            <p class="slide-text">${slide.text}</p>
        `;
        
        // Update dots
        container.querySelectorAll('.slide-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
        
        // Update counter
        container.querySelector('.slide-counter').textContent = `${currentSlide + 1} / ${slides.length}`;
    }
    
    // Render dots
    const dotsContainer = container.querySelector('.slide-dots');
    dotsContainer.innerHTML = slides.map((_, i) => 
        `<div class="slide-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></div>`
    ).join('');
    
    // Dot clicks
    dotsContainer.querySelectorAll('.slide-dot').forEach(dot => {
        dot.addEventListener('click', () => {
            currentSlide = parseInt(dot.dataset.index);
            renderSlide();
        });
    });
    
    // Nav buttons
    container.querySelector('.slide-prev')?.addEventListener('click', () => {
        currentSlide = currentSlide === 0 ? slides.length - 1 : currentSlide - 1;
        renderSlide();
    });
    
    container.querySelector('.slide-next')?.addEventListener('click', () => {
        currentSlide = currentSlide === slides.length - 1 ? 0 : currentSlide + 1;
        renderSlide();
    });
    
    renderSlide();
}

// Footer Render
function renderFooter() {
    const footer = document.querySelector('.footer');
    if (!footer) return;
    
    footer.innerHTML = `
        <div class="footer-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
                <path d="M6 12v5c3 3 9 3 12 0v-5"/>
            </svg>
        </div>
        <h4 class="footer-name">David Tran</h4>
        <p class="footer-title">College Essay Writing Coach</p>
        <div class="footer-links">
            <span class="footer-link">Gulliver Prep</span>
            <a href="mailto:dtran@gulliverprep.org" class="footer-link">dtran@gulliverprep.org</a>
        </div>
        <p class="footer-copy">© 2026 Gulliver Prep. All Rights Reserved.</p>
    `;
}

// Initialize All
function initPage(currentPage) {
    renderSidebar(currentPage);
    renderMobileHeader();
    renderFooter();
    initProgressBar();
    initAccordions();
}

// Export for use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initPage, initSlideCarousel, NAV_ITEMS };
}