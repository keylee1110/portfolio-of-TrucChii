const workflow = document.querySelector('.loreal-workflow');
const runway = workflow.querySelector('.loreal-workflow-runway');
const stage = workflow.querySelector('.loreal-workflow-stage');
const track = workflow.querySelector('.loreal-workflow-track');
const reel = document.querySelector('.loreal-reel');
let travel = 0;
let pinTop = 0;
let scrollDistance = 0;
let scrollFrame = 0;

function updateWorkflow() {
    scrollFrame = 0;
    if (!workflow.hasAttribute('data-pinned')) return;
    const progress = Math.max(0, Math.min(1, (pinTop - runway.getBoundingClientRect().top) / scrollDistance));
    track.style.setProperty('--workflow-x', `${-travel * progress}px`);
}

function measureWorkflow() {
    workflow.setAttribute('data-pinned', '');
    const last = track.lastElementChild;
    const overflow = track.offsetWidth - stage.clientWidth;
    travel = overflow > 0 ? overflow + (stage.clientWidth - last.offsetWidth) / 2 : 0;
    pinTop = parseFloat(getComputedStyle(stage).top);
    scrollDistance = Math.max(360, travel);
    const hold = Math.min(180, innerHeight * 0.22);
    runway.style.setProperty('--workflow-height', `${stage.offsetHeight + scrollDistance + hold}px`);
    updateWorkflow();
}

const workflowSize = new ResizeObserver(measureWorkflow);
workflowSize.observe(stage);
workflowSize.observe(track);
window.addEventListener('resize', measureWorkflow, { passive: true });
window.addEventListener('scroll', () => {
    if (workflow.hasAttribute('data-pinned') && !scrollFrame) scrollFrame = requestAnimationFrame(updateWorkflow);
}, { passive: true });
measureWorkflow();

const revealObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute('data-revealed', '');
        revealObserver.unobserve(entry.target);
    }
}, { rootMargin: '0px 0px -8% 0px' });

const floatObserver = new IntersectionObserver(entries => {
    for (const entry of entries) {
        entry.target.toggleAttribute('data-floating', entry.isIntersecting);
    }
});

const revealItems = document.querySelectorAll('[data-loreal-reveal]');
revealItems.forEach(item => revealObserver.observe(item));
document.querySelectorAll('.loreal-float').forEach(photo => floatObserver.observe(photo));
document.body.setAttribute('data-reveal-ready', '');

const dialog = document.querySelector('.loreal-video-dialog');
const player = dialog.querySelector('video');

reel.addEventListener('click', event => {
    const clip = event.target.closest('[data-loreal-clip]');
    if (!clip || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    player.poster = clip.querySelector('img').src;
    player.src = clip.href;
    player.setAttribute('aria-label', clip.getAttribute('aria-label'));
    dialog.showModal();
    reel.dispatchEvent(new CustomEvent('reel-video', { detail: true }));
    player.play().catch(() => {});
});

dialog.addEventListener('close', () => {
    player.pause();
    player.removeAttribute('src');
    player.load();
    reel.dispatchEvent(new CustomEvent('reel-video', { detail: false }));
});
