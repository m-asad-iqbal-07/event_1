/**
 * Walima Reception Invitation
 * Dr. Muhammad Abubakar Farooq Khan & Dr. Hira Niazi
 * Date: Saturday, 12 December 2026 | 12:30 PM
 * Venue: Green Lagoon Hotel & Restaurant, Chashma, Kundian
 */

// ----------------------------------------------------
// 1. CONFIGURATION & TARGET DATE
// ----------------------------------------------------
// Target Date: 12 December 2026 at 12:30 PM
// (Month is 0-indexed in JS Date: 11 = December)
const walimaDate = new Date(2026, 11, 12, 12, 30, 0);

// ----------------------------------------------------
// 2. WAX SEAL & ENVELOPE OPENING ANIMATION
// ----------------------------------------------------
let isEnvelopeOpened = false;

function openInvitation() {
  if (isEnvelopeOpened) return;
  isEnvelopeOpened = true;

  const wrapper = document.getElementById('envelopeWrapper');
  const screen = document.getElementById('envelopeScreen');
  const main = document.getElementById('invitationMain');
  const instruction = document.getElementById('openInstruction');

  // Trigger 3D fold opening
  wrapper.classList.add('opening');
  if (instruction) instruction.style.opacity = '0';

  // Spawn opening gold sparkles & emerald petals
  createSparkleBurst();

  setTimeout(() => {
    // Fade out envelope and reveal full invitation
    screen.classList.add('opened');
    main.classList.remove('hidden');

    // Scroll smoothly to top of card
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Launch floating petals & gold dust canvas
    initPetalsCanvas();
  }, 1100);
}

function createSparkleBurst() {
  const seal = document.getElementById('waxSeal');
  if (!seal) return;
  const rect = seal.getBoundingClientRect();
  const burstCount = 24;

  for (let i = 0; i < burstCount; i++) {
    const sparkle = document.createElement('div');
    sparkle.innerText = Math.random() > 0.5 ? '✨' : (Math.random() > 0.5 ? '🌿' : '🤍');
    sparkle.style.position = 'fixed';
    sparkle.style.left = `${rect.left + rect.width / 2}px`;
    sparkle.style.top = `${rect.top + rect.height / 2}px`;
    sparkle.style.fontSize = `${16 + Math.random() * 16}px`;
    sparkle.style.pointerEvents = 'none';
    sparkle.style.zIndex = '9999';
    sparkle.style.transition = 'all 1s cubic-bezier(0.1, 0.8, 0.3, 1)';
    document.body.appendChild(sparkle);

    const angle = (Math.PI * 2 * i) / burstCount;
    const distance = 80 + Math.random() * 140;
    const targetX = Math.cos(angle) * distance;
    const targetY = Math.sin(angle) * distance;

    requestAnimationFrame(() => {
      sparkle.style.transform = `translate(${targetX}px, ${targetY}px) scale(0)`;
      sparkle.style.opacity = '0';
    });

    setTimeout(() => sparkle.remove(), 1200);
  }
}

// ----------------------------------------------------
// 3. LIVE COUNTDOWN TIMER (Target: 12 Dec 2026, 12:30 PM)
// ----------------------------------------------------
function updateCountdown() {
  const now = new Date().getTime();
  const distance = walimaDate.getTime() - now;

  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minEl = document.getElementById('cdMinutes');
  const secEl = document.getElementById('cdSeconds');

  if (distance < 0) {
    if (daysEl) daysEl.innerText = "00";
    if (hoursEl) hoursEl.innerText = "00";
    if (minEl) minEl.innerText = "00";
    if (secEl) secEl.innerText = "00";
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
  if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
  if (minEl) minEl.innerText = String(minutes).padStart(2, '0');
  if (secEl) secEl.innerText = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ----------------------------------------------------
// 4. CALENDAR & LOCATION ACTIONS
// ----------------------------------------------------
function addToCalendar(e) {
  e.preventDefault();
  const title = encodeURIComponent("Walima Reception: Dr. Muhammad Abubakar Farooq Khan & Dr. Hira Niazi");
  const details = encodeURIComponent(
    "With immense joy, you are cordially invited to celebrate the Walima Reception of:\n" +
    "Dr. Muhammad Abubakar Farooq Khan & Dr. Hira Niazi\n\n" +
    "Date: Saturday, 12 December 2026\n" +
    "Schedule:\n" +
    "• 12:30 PM: Arrival of Guests\n" +
    "• 01:00 PM – 03:00 PM: Royal Lunch & Walima Feast\n\n" +
    "Venue: Green Lagoon Hotel & Restaurant, Chashma Barrage, Kundian, Mianwali\n\n" +
    "Warmly Welcomed By:\n" +
    "• Mr. Dr. Muhammad Farooq Khan\n" +
    "• Mr. Dr. Muhammad Talha Farooq Khan\n" +
    "• Mr. Dr. Muhammad Umer Farooq Khan\n\n" +
    "Contact: 0333 6835177 | 0333 6825188 | 0336 3700003"
  );
  const location = encodeURIComponent("Green Lagoon Hotel & Restaurant, Chashma, Kundian, Mianwali");

  // Saturday, 12 December 2026: 12:30 PM to 4:00 PM PKT (UTC+5 -> 07:30 UTC to 11:00 UTC)
  const dates = "20261212T073000Z/20261212T110000Z";

  const googleCalUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}&dates=${dates}`;
  window.open(googleCalUrl, '_blank');
}

function copyAddress(address) {
  navigator.clipboard.writeText(address).then(() => {
    showToast("📍 Address copied: " + address);
  }).catch(() => {
    showToast("Address: " + address);
  });
}

function copyInviteLink() {
  const url = window.location.href;
  navigator.clipboard.writeText(url).then(() => {
    showToast("🔗 Invitation link copied!");
  }).catch(() => {
    showToast("Link: " + url);
  });
}

function shareOnWhatsApp() {
  const text = encodeURIComponent(
    `✨ *Dawat-e-Walima Invitation* ✨\n\n` +
    `You are cordially invited to celebrate the blessed Walima Reception of:\n\n` +
    `🤵 *Dr. Muhammad Abubakar Farooq Khan*\n` +
    `   &\n` +
    `👰 *Dr. Hira Niazi*\n\n` +
    `📅 *Date:* Saturday, 12 December 2026\n` +
    `⏰ *Schedule:*\n` +
    `• 12:30 PM: Arrival of Guests\n` +
    `• 01:00 PM – 03:00 PM: Royal Lunch & Walima Feast\n\n` +
    `📍 *Venue:* Green Lagoon Hotel & Restaurant, Chashma Barrage, Kundian, Mianwali\n\n` +
    `Warmly Welcomed By:\n` +
    `• Mr. Dr. Muhammad Farooq Khan\n` +
    `• Mr. Dr. Muhammad Talha Farooq Khan\n` +
    `• Mr. Dr. Muhammad Umer Farooq Khan\n\n` +
    `📞 Contact: 0333 6835177 | 0333 6825188 | 0336 3700003\n\n` +
    `Tap the link to open the digital invitation card:\n${window.location.href}`
  );
  window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
}

// ----------------------------------------------------
// 5. TOAST NOTIFICATIONS
// ----------------------------------------------------
let toastTimeout = null;
function showToast(message) {
  const toast = document.getElementById('toastNotice');
  if (!toast) return;
  toast.innerText = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// ----------------------------------------------------
// 6. FALLING PETALS & GOLD SHIMMER CANVAS
// ----------------------------------------------------
function initPetalsCanvas() {
  const canvas = document.getElementById('petalsCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  const particles = [];
  const count = 30;

  for (let i = 0; i < count; i++) {
    const isLeaf = Math.random() > 0.6;
    const isGold = !isLeaf && Math.random() > 0.5;

    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height - canvas.height,
      size: isGold ? (3 + Math.random() * 4) : (10 + Math.random() * 12),
      speedY: 1 + Math.random() * 2,
      speedX: (Math.random() - 0.5) * 1.2,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 2,
      isGold: isGold,
      color: isLeaf 
        ? 'rgba(18, 75, 42, 0.65)' 
        : (isGold ? 'rgba(212, 175, 55, 0.75)' : 'rgba(255, 250, 240, 0.7)')
    });
  }

  function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let p of particles) {
      p.y += p.speedY;
      p.x += p.speedX;
      p.rotation += p.rotSpeed;

      if (p.y > canvas.height + 20) {
        p.y = -20;
        p.x = Math.random() * canvas.width;
      }

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.isGold) {
        // Gold shimmer dot
        ctx.beginPath();
        ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = '#caa84e';
        ctx.shadowBlur = 6;
        ctx.fill();
      } else {
        // Delicate leaf / white petal
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(p.size / 2, -p.size / 2, p.size, 0);
        ctx.quadraticCurveTo(p.size / 2, p.size / 2, 0, 0);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.restore();
    }

    requestAnimationFrame(render);
  }

  render();
}
