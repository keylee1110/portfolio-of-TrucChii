import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { existsSync, readFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import test from 'node:test';

const root = resolve(import.meta.dirname, '..');
const read = (file) => readFileSync(join(root, file), 'utf8');
const home = read('index.html');

function sectionMarkup(html, className) {
  const start = html.indexOf(`<section class="${className}`);
  assert.notEqual(start, -1, `Missing ${className}`);
  const end = html.indexOf('</section>', start);
  assert.notEqual(end, -1, `Unclosed ${className}`);
  return html.slice(start, end + '</section>'.length).replace(/\r\n/g, '\n');
}

function sha256(value) {
  return createHash('sha256').update(value).digest('hex');
}

const lockedSections = {
  'hero-section': '6166d1502353c3688704cd0e39470be750d215e402cb80f593bd25e38730c064',
  'about-section': '78310bdb2001efa328db8aa766685b0cfc468b2a4d986f8f545f0bdd8cfb99eb',
  'skills-tools-section': 'e8599570d5b95cf5f06c11534eb9722ad0e72b7ee74a667b8c1b98b5836bf751',
};

test('locked homepage sections retain their approved markup', () => {
  for (const [className, expectedHash] of Object.entries(lockedSections)) {
    assert.equal(sha256(sectionMarkup(home, className)), expectedHash, className);
  }
});

test('homepage has three featured project links and no Results section', () => {
  const projects = sectionMarkup(home, 'campaigns-section');
  assert.equal((projects.match(/data-project-card/g) || []).length, 3);
  assert.doesNotMatch(home, /class="results-section"|id="results"/);
});

test('homepage lower sections follow the approved order', () => {
  const markers = [
    'testimonial-section',
    'practice-section',
    'certification-section',
    'contact-section',
  ];
  let previous = -1;
  for (const marker of markers) {
    const current = home.indexOf(marker);
    assert.ok(current > previous, `${marker} is missing or out of order`);
    previous = current;
  }
});

test('Certification contains exactly five accessible items', () => {
  const certification = sectionMarkup(home, 'certification-section');
  assert.equal((certification.match(/class="cert-row/g) || []).length, 5);
});

const projects = [
  ['project-livefest.html', 'LIVE FEST 2025'],
  ['project-live-pro.html', 'LIVE PRO CAMPAIGN'],
  ['community-subprojects.html', 'Community Fest'],
];

test('Work page lists the same three projects', () => {
  const work = read('work.html');
  assert.equal((work.match(/data-work-item/g) || []).length, 3);
  assert.match(work, /class="work-intro-sticky"/);
  for (const [file] of projects) assert.match(work, new RegExp(`href="${file}"`));
});

test('all eight project pages exist and placeholders are explicit', () => {
  for (const [file, title] of projects) {
    assert.ok(existsSync(join(root, file)), `Missing ${file}`);
    const html = read(file);
    assert.match(html, new RegExp(title));
    assert.match(html, /ElysLu/);
    if (file.includes('placeholder')) {
      assert.match(html, /data-editable-placeholder/);
      assert.match(html, /Replace with/i);
    }
  }
});

test('production files contain no TrucLu branding', () => {
  const files = ['index.html', 'work.html', 'app.js', ...projects.map(([file]) => file)];
  for (const file of files) assert.doesNotMatch(read(file), /TrucLu/i, file);
});

test('all local HTML src and href references resolve', () => {
  const files = ['index.html', 'work.html', ...projects.map(([file]) => file)];
  for (const file of files) {
    const html = read(file);
    for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
      const reference = match[1];
      if (/^(?:https?:|mailto:|#|javascript:)/.test(reference)) continue;
      const target = reference.split(/[?#]/)[0];
      assert.ok(existsSync(join(root, dirname(file), target)), `${file} -> ${reference}`);
    }
  }
});

test('LIVE FEST case study uses the approved editorial sections and artwork', () => {
  const html = read('project-livefest.html');
  const assets = [
    'assets/livefest-nexus-workshop.png',
    'assets/livefest-auditorium-hall.png',
    'assets/livefest-event-poster.png',
    'assets/livefest-ui-ux.png',
    'assets/livefest-planning-sheet.png',
    'assets/livefest-planning-showcase-lower.png',
    'assets/livefest-ooh-saigon-river-hero.png',
  ];

  for (const asset of assets) {
    assert.ok(existsSync(join(root, asset)), `Missing ${asset}`);
    const pattern = asset.replace(/\.png$/, '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\.(?:png|webp)';
    assert.match(html, new RegExp(pattern));
  }

  assert.doesNotMatch(html, /class="ui-card"/);
  assert.doesNotMatch(html, /Selected interface and interactive screen designs/);
  assert.doesNotMatch(html, /OOH planning and production sheet placeholder/);
  assert.match(html, /<video class="ooh-video" controls playsinline preload="metadata">/);
  assert.match(html, /assets\/livefest-ooh-video\.mp4/);
  assert.ok(existsSync(join(root, 'assets/livefest-ooh-video.mp4')), 'Missing OOH campaign video');
  assert.match(html, /\.ooh-video\s*\{[^}]*width:\s*100%[^}]*height:\s*auto[^}]*object-fit:\s*contain/s);
  assert.doesNotMatch(html, /class="phone-caption"/);
  assert.equal((html.match(/data-phone-slot=/g) || []).length, 10);
  assert.match(html, /class="phone-marquee-track"/);

  const orderedMarkers = [
    'data-section="ui-ux-showcase"',
    'data-section="merchandise-campaign"',
    'data-section="ooh-campaign"',
    'data-section="daily-livestream"',
    'class="cs-nav-footer"',
  ];
  let previous = -1;
  for (const marker of orderedMarkers) {
    const current = html.indexOf(marker);
    assert.ok(current > previous, `${marker} is missing or out of order`);
    previous = current;
  }
});

test('Community Fest uses the approved results, overview, and subproject layout', () => {
  const html = read('community-subprojects.html');
  assert.match(html, /<h1[^>]*>Community Fest<\/h1>/);
  assert.equal((html.match(/class="detail-stat-card"/g) || []).length, 4);
  assert.match(html, /assets\/community-fest-poster\.png/);
  assert.equal((html.match(/class="community-project-card"/g) || []).length, 2);
  assert.match(html, /href="project-community-01\.html"/);
  assert.match(html, /href="project-community-02\.html"/);
  assert.equal((html.match(/community-card-title font-display hero-gradient-text/g) || []).length, 2);
  assert.match(html, /linear-gradient\(to right, #ff002d, #ffff00, #000, #ff002d\)/);
  assert.match(html, /animation: community-title-gradient 2\.5s linear infinite/);
  assert.doesNotMatch(html, />Objective</);
  assert.doesNotMatch(html, />Campaign Visuals</);

  for (const file of ['project-community-01.html', 'project-community-02.html']) {
    assert.ok(existsSync(join(root, file)), `Missing ${file}`);
    assert.match(read(file), /href="community-subprojects\.html#community-subprojects-title"/);
  }
});

test('all project pages use the homepage pill button system', () => {
  const projectFiles = [
    ...projects.map(([file]) => file),
    'project-community-01.html',
    'project-community-02.html',
  ];

  for (const file of projectFiles) {
    assert.match(read(file), /src="app\.js\?v=20260621"/, file);
  }

  const appSource = read('app.src.js');
  assert.match(appSource, /const isProjectPage =/);
  assert.match(appSource, /if \(isProjectPage \|\|/);
});

test('Community Project 01 follows the approved three-section campaign story', () => {
  const html = read('project-community-01.html');
  const orderedSections = [
    'data-section="master-video-production"',
    'data-section="promotional-videos"',
    'data-section="revenue-acceleration"',
  ];
  let previous = -1;

  for (const marker of orderedSections) {
    const current = html.indexOf(marker);
    assert.ok(current > previous, `${marker} is missing or out of order`);
    previous = current;
  }

  assert.match(html, /www\.tiktok\.com\/@tiktoklive_vietnam\/video\/7516599034404982024/);
  assert.match(html, /data-src="https:\/\/www\.tiktok\.com\/player\/v1\/7516599034404982024/);
  assert.match(html, /assets\/community-project-01-master-video\.jpg/);
  assert.match(html, /isEdgeOrWebView/);
  for (const asset of [
    'community-project-01-shooting-01.png',
    'community-project-01-shooting-02.png',
    'community-project-01-campaign-visual.png',
    'community-project-01-performance-dashboard.png',
    'community-project-01-conversion-dashboard.png',
  ]) assert.match(html, new RegExp(`assets/${asset.replaceAll('.', '\\.')}`));
  for (const id of [
    '7518232367668972807',
    '7518005984829213959',
    '7517989704755711239',
    '7517993704393674002',
  ]) assert.match(html, new RegExp(`tiktoklive_vietnam/video/${id}`));
  assert.equal((html.match(/class="tiktok-phone-link"/g) || []).length, 4);
  assert.equal((html.match(/community-project-01-video-0[1-4]\.jpg/g) || []).length, 4);
  assert.match(html, /assets\/community-project-01-campaign-asset\.png/);
  assert.match(html, /\.campaign-asset\s*\{[^}]*max-width:\s*440px/s);
  assert.match(html, /assets\/community-project-01-campaign-page\.png/);
  assert.match(html, /data-scrollable-phone/);
  assert.match(html, /overscroll-behavior:\s*contain/);
  assert.doesNotMatch(html, />Asset 0[1-3]</);
  assert.equal((html.match(/class="phone-screen[^"]*"/g) || []).length, 5);
  for (const result of ['2.5M', '180K', '8.2%', '+35%']) assert.match(html, new RegExp(result.replace('+', '\\+')));
  assert.equal((html.match(/<img\b/gi) || []).length, 12);
});

test('Community Project 02 follows the approved five-section event story', () => {
  const html = read('project-community-02.html');
  const orderedSections = [
    'data-section="core-concept"',
    'data-section="on-site-operations"',
    'data-section="day-2"',
    'data-section="day-3"',
    'data-section="post-event-production"',
  ];
  let previous = -1;

  for (const marker of orderedSections) {
    const current = html.indexOf(marker);
    assert.ok(current > previous, `${marker} is missing or out of order`);
    previous = current;
  }

  assert.match(html, /Core Concept: “THE SPARK”/);
  assert.match(html, /On-Site Event Operations \(with Agency Inspike\):/);
  assert.match(html, /Post-Event Video Production/);
  assert.match(html, /Crafting the Brief/);
  assert.match(html, /planning-showcase-img-wrap/);
  assert.match(html, /https:\/\/drive\.google\.com\/drive\/folders\/1IHczm0DTxmpmijZK1PPtwYP87D0RTMm8/);
  assert.match(html, /View the team merchandise collection/);
  for (const id of ['7543960811744660754', '7540983489504529682', '7550897423560756498']) {
    assert.match(html, new RegExp(`tiktoklive_vietnam/video/${id}`));
  }
  for (const asset of [
    'community-project-02-video-01.jpg',
    'community-project-02-video-02.jpg',
    'community-project-02-video-03.jpg',
  ]) assert.match(html, new RegExp(`assets/${asset.replaceAll('.', '\\.')}`));
  assert.equal((html.match(/class="tiktok-phone-link"/g) || []).length, 3);
  assert.doesNotMatch(html, /Xem chi tiết|bộ merchandise|tại đây/i);
});

test('LIVE PRO CAMPAIGN follows the approved five-section story', () => {
  const html = read('project-live-pro.html');
  const orderedSections = [
    'data-section="campaign-overview"',
    'data-section="research-strategy"',
    'data-section="campaign-results"',
    'data-section="creator-rewards"',
    'data-section="recognition-videos"',
  ];
  let previous = -1;
  for (const marker of orderedSections) {
    const current = html.indexOf(marker);
    assert.ok(current > previous, `${marker} is missing or out of order`);
    previous = current;
  }
  for (const id of ['7550218638649789714', '7575815911777635592', '7576529267064950036', '7587673281524780308']) {
    assert.match(html, new RegExp(`tiktoklive_vietnam/video/${id}`));
  }
});

test('Obsolete project-launch.html is deleted', () => {
  assert.ok(!existsSync(join(root, 'project-launch.html')), 'Obsolete project-launch.html route should be removed');
});
