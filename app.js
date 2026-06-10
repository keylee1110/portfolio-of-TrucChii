/* ==========================================================================
   SWISS PUNK PERFORMANCE SYSTEM - INTERACTIVE LOGIC
   ========================================================================== */

function init() {
    initIntroSplash();
    initPageTransitions();
    initScrollDynamics();
    initScrollObserver();
    initMobileNav();
    initProjectCards();
    // initCertificationMarquee(); - Disabled for list layout
    initEditableMetrics();
    initPortfolioDownload();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function initProjectCards() {
    const cards = document.querySelectorAll('[data-project-card]');
    if (!cards.length || !window.matchMedia('(pointer: fine)').matches) return;

    cards.forEach(card => {
        card.addEventListener('pointerenter', () => card.classList.add('is-active'));
        card.addEventListener('pointerleave', () => card.classList.remove('is-active'));
        card.addEventListener('focus', () => card.classList.add('is-active'));
        card.addEventListener('blur', () => card.classList.remove('is-active'));
    });
}

/* initCertificationMarquee removed for list layout */

/* --------------------------------------------------------------------------
   0. INTRO SPLASH
   -------------------------------------------------------------------------- */
function initIntroSplash() {
    console.log("initIntroSplash: Started execution");
    const splash = document.getElementById('intro-splash');
    const target = document.querySelector('.massive-name');
    
    console.log("initIntroSplash: splash element found =", !!splash);
    console.log("initIntroSplash: target element found =", !!target);
    
    if (!splash || !target) {
        console.log("initIntroSplash: early return because splash or target is missing");
        return;
    }

    // Lock scroll immediately on load
    document.body.style.overflow = 'hidden';
    console.log("initIntroSplash: Scroll locked");

    // Get the original parent to restore it later
    const originalParent = target.parentNode;
    console.log("initIntroSplash: Original parent =", originalParent ? originalParent.className : "null");

    // Split target text into individual letters
    const text = target.textContent.trim();
    target.innerHTML = text.split('').map(char => {
        if (char === ' ') return '<span>&nbsp;</span>';
        return `<span>${char}</span>`;
    }).join('');
    console.log("initIntroSplash: Target text split into spans");

    const letterSpans = target.querySelectorAll('span');
    console.log("initIntroSplash: Letter spans count =", letterSpans.length);

    // Measure natural position *before* detaching
    const targetRect = target.getBoundingClientRect();
    console.log("initIntroSplash: targetRect =", JSON.stringify(targetRect));

    // Move target to document.body so it escapes any stacking context and sits on top of splash overlay
    document.body.appendChild(target);
    console.log("initIntroSplash: Target appended to body");

    // Style target to occupy the exact same visual position, but as a fixed overlay on top of splash
    target.style.position = 'fixed';
    target.style.left = `${targetRect.left}px`;
    target.style.top = `${targetRect.top}px`;
    target.style.width = `${targetRect.width}px`;
    target.style.height = `${targetRect.height}px`;
    target.style.margin = '0';
    target.style.zIndex = '10000';
    target.classList.add('intro-animating');

    // Calculate center of viewport
    const viewportCenterX = window.innerWidth / 2;
    const viewportCenterY = window.innerHeight / 2;
    
    // Calculate center of target in its fixed position
    const targetCenterX = targetRect.left + targetRect.width / 2;
    const targetCenterY = targetRect.top + targetRect.height / 2;

    const translateX = viewportCenterX - targetCenterX;
    const translateY = viewportCenterY - targetCenterY;

    // Calculate scale factor using actual computed target font size dynamically
    const computedStyle = window.getComputedStyle(target);
    const targetFontSize = parseFloat(computedStyle.fontSize) || 96;
    const baseSize = 16;
    const introFontSize = Math.max(6 * baseSize, Math.min(window.innerWidth * 0.16, 14 * baseSize));
    const scale = introFontSize / targetFontSize;
    console.log(`initIntroSplash: translate=(${translateX}, ${translateY}) scale=${scale}`);

    // Position target in the center of the viewport
    target.style.transition = 'none';
    target.style.transformOrigin = 'center center';
    target.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    target.style.opacity = '1';

    // Step 1: Reveal letters one-by-one (gray)
    letterSpans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.add('revealed');
        }, index * 80);
    });

    // Step 2: Highlight letters to white one-by-one (loading effect)
    const highlightDelay = letterSpans.length * 80 + 300;
    letterSpans.forEach((span, index) => {
        setTimeout(() => {
            span.classList.add('active');
        }, highlightDelay + (index * 120));
    });

    // Step 3: Trigger morph and background fade out
    const morphTime = highlightDelay + (letterSpans.length * 120) + 400;
    console.log("initIntroSplash: morphTime =", morphTime);
    
    setTimeout(() => {
        console.log("initIntroSplash: Morph timeout fired. Starting transition.");
        // Fade out background color of splash overlay
        splash.style.backgroundColor = 'transparent';
        splash.style.pointerEvents = 'none';

        // Morph target back to its natural position
        target.style.transition = 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
        target.style.transform = 'translate(0, 0) scale(1)';

        // Step 4: Finalize transition and unlock scroll
        setTimeout(() => {
            console.log("initIntroSplash: Swap timeout fired. Finalizing.");
            splash.style.display = 'none';
            document.body.style.overflow = '';
            
            // Append target back to its original parent as the first child
            originalParent.insertBefore(target, originalParent.firstChild);
            console.log("initIntroSplash: Target restored to original parent");

            // Clean up target styles and remove animating class
            target.classList.remove('intro-animating');
            target.style.position = '';
            target.style.left = '';
            target.style.top = '';
            target.style.width = '';
            target.style.height = '';
            target.style.margin = '';
            target.style.zIndex = '';
            target.style.transform = '';
            target.style.transformOrigin = '';
            target.style.transition = '';
            
            const cta = document.querySelector('.hero-signature-cta');
            if (cta) {
                cta.classList.add('visible');
            }
            console.log("initIntroSplash: Complete");
        }, 1400); // Match morph transit time
    }, morphTime);
}

/* --------------------------------------------------------------------------
   1. SCROLL DYNAMICS & PROGRESS BAR
   -------------------------------------------------------------------------- */
function initScrollDynamics() {
    const scrollIndicator = document.getElementById('scroll-indicator');
    const header = document.querySelector('.sticky-nav');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    let scrollTimeout;

    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            window.cancelAnimationFrame(scrollTimeout);
        }
        scrollTimeout = window.requestAnimationFrame(() => {
            // 1.1 Update Scroll Progress Bar
            const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = height > 0 ? (winScroll / height) * 100 : 0;

            if (scrollIndicator) {
                scrollIndicator.style.width = scrolled + '%';
            }

            // 1.2 Sticky Nav State
            if (header) {
                if (winScroll > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            }

            // 1.3 Active Link Highlighting on Scroll
            let currentSectionId = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;
                if (winScroll >= sectionTop && winScroll < sectionTop + sectionHeight) {
                    currentSectionId = section.getAttribute('id');
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        });
    }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. INTERSECTION OBSERVER FOR SCROLL REVEALS
   -------------------------------------------------------------------------- */
function initScrollObserver() {
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-in, .reveal-slide-left');

    // Disable animations if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        revealElements.forEach(el => el.classList.add('reveal-active'));
        return;
    }

    const observerOptions = {
        root: null, // Viewport
        rootMargin: '-5% 0px -15% 0px', // Trigger margins to prevent edge flickering
        threshold: 0.05 // Subtle entry threshold
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
            } else {
                entry.target.classList.remove('reveal-active'); // In-out transition
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });
}

/* --------------------------------------------------------------------------
   3. MOBILE NAVIGATION DRAWER
   -------------------------------------------------------------------------- */
function initMobileNav() {
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileDrawer = document.getElementById('mobile-drawer-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (!mobileBtn || !mobileDrawer) return;

    mobileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleMenu();
    });

    // Close when clicking links
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    // Close when clicking outside drawer
    document.addEventListener('click', (e) => {
        if (mobileDrawer.classList.contains('open') && !mobileDrawer.contains(e.target)) {
            closeMenu();
        }
    });

    function toggleMenu() {
        const isOpen = mobileDrawer.classList.contains('open');
        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    function openMenu() {
        mobileDrawer.classList.add('open');
        mobileBtn.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scroll
    }

    function closeMenu() {
        mobileDrawer.classList.remove('open');
        mobileBtn.classList.remove('active');
        document.body.style.overflow = '';
    }
}

/* --------------------------------------------------------------------------
   4. EDITABLE PORTFOLIO METRICS WITH LOCALSTORAGE
   -------------------------------------------------------------------------- */
function initEditableMetrics() {
    const metricCards = document.querySelectorAll('.editable-metric-card');

    metricCards.forEach(card => {
        const metricId = card.getAttribute('data-metric-id');
        const editableSpan = card.querySelector('.metric-val');

        if (!editableSpan || !metricId) return;

        // 4.1 Load persisted value from localStorage on launch
        const savedValue = localStorage.getItem(`elyslu_metric_${metricId}`);
        if (savedValue) {
            editableSpan.textContent = savedValue;
        }

        // Make span focusable & show edit cursor
        editableSpan.setAttribute('title', 'Double-click to edit value');

        // Prevent layout breakage on Enter key press
        editableSpan.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                editableSpan.blur(); // Triggers save on blur
            }
        });

        // 4.2 Save value on Blur (focus loss)
        editableSpan.addEventListener('blur', () => {
            const rawContent = editableSpan.textContent.trim();
            // Sanitize text content to prevent XSS / markup injects
            const sanitizedContent = rawContent.replace(/<\/?[^>]+(>|$)/g, "");
            editableSpan.textContent = sanitizedContent;

            if (sanitizedContent === '') {
                // Restore default value if left blank
                const defaultVals = {
                    'mini-campaigns': '50',
                    'mini-reach': '10M',
                    'mini-engagements': '300K',
                    'mini-platforms': '5',
                    'mini-projects': '20',
                    'total-reach': '10M',
                    'total-engagements': '500K',
                    'campaigns-executed': '40',
                    'videos-produced': '120',
                    'avg-engagement-rate': '8.5',
                    'avg-growth-rate': '35'
                };
                editableSpan.textContent = defaultVals[metricId] || '0';
            }

            const finalVal = editableSpan.textContent;
            localStorage.setItem(`elyslu_metric_${metricId}`, finalVal);

            // Sync values across duplicated cards (e.g. mini-reach vs total-reach)
            syncRelatedMetrics(metricId, finalVal);

            showToast(`Metric updated: ${finalVal}`);
        });
    });
}

function syncRelatedMetrics(metricId, value) {
    // Sync mini-reach with total-reach
    if (metricId === 'mini-reach') {
        updateMetricElement('total-reach', value);
    } else if (metricId === 'total-reach') {
        updateMetricElement('mini-reach', value);
    }

    // Sync mini-campaigns with campaigns-executed
    if (metricId === 'mini-campaigns') {
        updateMetricElement('campaigns-executed', value);
    } else if (metricId === 'campaigns-executed') {
        updateMetricElement('mini-campaigns', value);
    }

    // Sync mini-engagements with total-engagements
    if (metricId === 'mini-engagements') {
        updateMetricElement('total-engagements', value);
    } else if (metricId === 'total-engagements') {
        updateMetricElement('mini-engagements', value);
    }
}

function updateMetricElement(metricId, value) {
    const card = document.querySelector(`.editable-metric-card[data-metric-id="${metricId}"]`);
    if (card) {
        const span = card.querySelector('.metric-val');
        if (span) {
            span.textContent = value;
            localStorage.setItem(`elyslu_metric_${metricId}`, value);
        }
    }
}

/* --------------------------------------------------------------------------
   5. PORTFOLIO PDF DOWNLOAD SIMULATION
   -------------------------------------------------------------------------- */
function initPortfolioDownload() {
    const downloadBtn = document.getElementById('btn-download-portfolio');
    const modal = document.getElementById('download-modal');
    const progressBar = document.getElementById('modal-progress-bar');
    const statusText = document.getElementById('modal-status-text');
    const descText = document.querySelector('.modal-desc');

    if (!downloadBtn || !modal || !progressBar || !statusText) return;

    downloadBtn.addEventListener('click', () => {
        openDownloadModal();
    });

    function openDownloadModal() {
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        let progress = 0;
        progressBar.style.width = '0%';
        statusText.textContent = '0%';
        descText.textContent = 'Initiating download pipeline...';

        const statusUpdates = [
            { threshold: 15, msg: 'Gathering campaign case studies...' },
            { threshold: 35, msg: 'Syncing customized marketing numbers...' },
            { threshold: 55, msg: 'Compiling behind-the-scenes content grids...' },
            { threshold: 75, msg: 'Generating desaturated visual mockups...' },
            { threshold: 90, msg: 'Finalizing high-end vector layouts...' },
            { threshold: 100, msg: 'Packaging PDF...' }
        ];

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 8) + 3; // Random smooth increments
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
                finalizeDownload();
            }

            progressBar.style.width = `${progress}%`;
            statusText.textContent = `${progress}%`;

            // Update loading messages based on progress thresholds
            const currentUpdate = statusUpdates.find(u => progress <= u.threshold);
            if (currentUpdate) {
                descText.textContent = currentUpdate.msg;
            }
        }, 120);
    }

    function finalizeDownload() {
        descText.textContent = 'Download ready! Initiating transmission...';

        // Dynamic simulated file trigger
        setTimeout(() => {
            triggerFileDownload();
            modal.classList.remove('open');
            document.body.style.overflow = '';
            showToast('ElysLu_Marketing_Portfolio.pdf downloaded successfully!');
        }, 1000);
    }

    function triggerFileDownload() {
        // Create an active mock data blob download to trigger browser's save window
        const mockContent = 'ElysLu - Digital Marketing Portfolio PDF Mock Content\n' +
            'Campaign awareness data, product launch results, and growth indexes.\n' +
            'Generated dynamically on: ' + new Date().toLocaleDateString();

        const blob = new Blob([mockContent], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'ElysLu_Marketing_Portfolio.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
}

/* --------------------------------------------------------------------------
   6. LIVE TOAST NOTIFICATION ENGINE
   -------------------------------------------------------------------------- */
function showToast(message) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <span>${message}</span>
        <button style="background:none; border:none; color:inherit; cursor:pointer; margin-left:16px; font-weight:bold;" aria-label="Dismiss">✕</button>
    `;

    container.appendChild(toast);

    // Trigger animation frame
    setTimeout(() => {
        toast.classList.add('show');
    }, 50);

    // Auto dismiss button
    toast.querySelector('button').addEventListener('click', () => {
        dismissToast(toast);
    });

    // Auto remove after 3.5 seconds
    setTimeout(() => {
        dismissToast(toast);
    }, 3500);
}

function dismissToast(toast) {
    if (!toast.parentNode) return;
    toast.classList.remove('show');
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 300);
}

/* --------------------------------------------------------------------------
   7. PAGE TRANSITIONS (WIPE EFFECT)
   -------------------------------------------------------------------------- */
function initPageTransitions() {
    const wipe = document.getElementById('page-wipe');

    // 1. Initial Page Load Reveal
    if (wipe) {
        // Force reflow
        void wipe.offsetWidth;
        wipe.classList.remove('wipe-initial-in');
        wipe.classList.add('wipe-active-in');
        setTimeout(() => {
            wipe.classList.remove('wipe-active-in');
        }, 600);
    }

    // 2. Intercept Link Clicks for Exit Animation
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        const href = link.getAttribute('href');

        // Skip links that are empty, anchors on the same page, external URLs, or mailto/tel
        if (!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || (href.startsWith('http') && !href.includes(window.location.hostname))) {
            return;
        }

        link.addEventListener('click', (e) => {
            e.preventDefault();

            if (wipe) {
                wipe.classList.add('wipe-active-out');
                setTimeout(() => {
                    window.location.href = href;
                }, 600);
            } else {
                window.location.href = href;
            }
        });
    });
}
