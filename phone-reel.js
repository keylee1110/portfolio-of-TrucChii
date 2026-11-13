document.querySelectorAll('[data-phone-reel]').forEach(reel => {
    const viewport = reel.querySelector('.phone-marquee');
    const group = reel.querySelector('.phone-marquee-group');
    const toggle = reel.querySelector('[data-reel-toggle]');
    const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
    const autoResume = reel.hasAttribute('data-reel-autoresume');
    const repeated = group.cloneNode(true);

    repeated.setAttribute('aria-hidden', 'true');
    repeated.querySelectorAll('a, button').forEach(control => {
        control.tabIndex = -1;
    });
    group.after(repeated);
    reel.dataset.ready = '';

    let visible = false;
    let paused = false;
    let frame = 0;
    let lastTime = 0;
    let remainder = 0;
    let interactionTimer = 0;
    let interacting = false;
    let videoOpen = false;

    function advance(time) {
        frame = 0;
        if (lastTime) {
            remainder += Math.min(time - lastTime, 50) * 0.056;
            const distance = Math.floor(remainder);
            if (distance) {
                remainder -= distance;
                viewport.scrollTo({ left: (viewport.scrollLeft + distance) % group.offsetWidth, behavior: 'instant' });
            }
        }
        lastTime = time;
        frame = requestAnimationFrame(advance);
    }

    function syncPlayback() {
        if (toggle) toggle.textContent = paused ? 'Play slideshow' : 'Pause slideshow';
        const motionAllowed = !reducedMotion.matches || reel.hasAttribute('data-reel-motion');
        if (visible && !paused && !interacting && !videoOpen && !document.hidden && motionAllowed) {
            if (!frame) frame = requestAnimationFrame(advance);
        } else {
            cancelAnimationFrame(frame);
            frame = 0;
            lastTime = 0;
        }
    }

    function pause() {
        paused = true;
        syncPlayback();
    }

    function holdPlayback() {
        if (!autoResume) {
            pause();
            return;
        }
        interacting = true;
        clearTimeout(interactionTimer);
        interactionTimer = setTimeout(() => {
            interacting = false;
            syncPlayback();
        }, 1800);
        syncPlayback();
    }

    toggle?.addEventListener('click', () => {
        paused = !paused;
        interacting = false;
        syncPlayback();
    });
    viewport.addEventListener('pointerdown', holdPlayback, { passive: true });
    viewport.addEventListener('pointerup', holdPlayback, { passive: true });
    viewport.addEventListener('focusin', event => {
        if (!videoOpen && event.target.matches(':focus-visible')) {
            if (toggle) pause();
            else holdPlayback();
        }
    });
    if (autoResume) {
        reel.addEventListener('reel-video', event => {
            videoOpen = event.detail;
            syncPlayback();
        });
    }
    reducedMotion.addEventListener('change', syncPlayback);
    document.addEventListener('visibilitychange', syncPlayback);

    reel.querySelectorAll('[data-reel-step]').forEach(button => {
        button.addEventListener('click', () => {
            holdPlayback();
            const [first, second] = group.children;
            const step = second.offsetLeft - first.offsetLeft;
            viewport.scrollBy({
                left: Number(button.dataset.reelStep) * step,
                behavior: reducedMotion.matches ? 'instant' : 'smooth',
            });
        });
    });

    const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        syncPlayback();
    });
    observer.observe(viewport);
});
