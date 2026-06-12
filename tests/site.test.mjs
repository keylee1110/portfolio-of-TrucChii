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

test('homepage has eight featured project links and no Results section', () => {
  const projects = sectionMarkup(home, 'campaigns-section');
  assert.equal((projects.match(/data-project-card/g) || []).length, 8);
  assert.match(projects, /href="work\.html"/);
  assert.doesNotMatch(home, /class="results-section"|id="results"/);
});

test('homepage lower sections follow the approved order', () => {
  const markers = [
    'case-study-section',
    'expertise-section',
    'archive-section',
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

test('Certification contains exactly six accessible items', () => {
  const certification = sectionMarkup(home, 'certification-section');
  assert.equal((certification.match(/class="cert-row/g) || []).length, 6);
});

const projects = [
  ['project-awareness.html', 'Brand Awareness Campaign'],
  ['project-launch.html', 'Product Launch Campaign'],
  ['project-ugc.html', 'Influencer Marketing Campaign'],
  ['project-placeholder-04.html', 'Project 04'],
  ['project-placeholder-05.html', 'Project 05'],
  ['project-placeholder-06.html', 'Project 06'],
  ['project-placeholder-07.html', 'Project 07'],
  ['project-placeholder-08.html', 'Project 08'],
];

test('Work page lists the same eight projects', () => {
  const work = read('work.html');
  assert.equal((work.match(/data-work-item/g) || []).length, 8);
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
