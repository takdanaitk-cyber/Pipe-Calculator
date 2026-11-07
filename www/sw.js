// Service worker สำหรับติดตั้งเป็น PWA (ใช้งานออฟไลน์) เปลี่ยน VERSION เมื่อแก้ไฟล์
const VERSION = 'pipe-calculator-v1';
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "fonts/ibm-plex-mono-latin-400-normal.woff2",
  "fonts/ibm-plex-mono-latin-500-normal.woff2",
  "fonts/ibm-plex-sans-thai-latin-400-normal.woff2",
  "fonts/ibm-plex-sans-thai-latin-500-normal.woff2",
  "fonts/ibm-plex-sans-thai-latin-600-normal.woff2",
  "fonts/ibm-plex-sans-thai-thai-400-normal.woff2",
  "fonts/ibm-plex-sans-thai-thai-500-normal.woff2",
  "fonts/ibm-plex-sans-thai-thai-600-normal.woff2"
];
self.addEventListener('install', (e) => { e.waitUntil(caches.open(VERSION).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k !== VERSION).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  e.respondWith(caches.match(e.request).then((hit) => hit || fetch(e.request)));
});
