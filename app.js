// app.js - Application logic for New Heart Newsletter

// Helper functions
function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el && typeof text === "string") el.textContent = text;
}

function safeSetHTML(id, html) {
  const el = document.getElementById(id);
  if (el && typeof html === "string") el.innerHTML = html;
}

// Language switching function
function switchLanguage(lang) {
  const t = translations[lang] || translations.EN;
  
  // Set body language attribute
  document.body.setAttribute('data-lang', lang);
  
  // Set RTL for Hebrew
  if (lang === 'IL') {
    document.body.setAttribute('dir', 'rtl');
  } else {
    document.body.setAttribute('dir', 'ltr');
  }
  
  // Update active language button
  document.querySelectorAll('.language-buttons span[data-lang]').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });

  // UI Elements
  safeSetText("main-title", t.mainTitle);
  safeSetText("subtitle", t.subtitle);
  safeSetText("founders-greeting-title", t.foundersGreetingTitle);
  safeSetText("founders-title", t.foundersTitle);
  safeSetText("regional-directors-title", t.regionalDirectorsTitle);
  safeSetText("upcoming-nh-title", t.upcomingNhTitle);
  safeSetText("reunions-title", t.reunionsTitle);
  safeSetText("stories-title", t.storiesTitle);
  safeSetText("kids-title", t.kidsTitle);
  safeSetText("editorial-section-title", t.editorialSectionTitle);
  safeSetText("editorial-title-line", t.editorialTitleLine);
  safeSetText("serve-title", t.serveTitle);
  safeSetText("palanca-title", t.palancaTitle);
  safeSetText("qr-instruction", t.qrInstruction);
  safeSetText("footer-copyright", t.footerCopyright);
  safeSetText("footer-note", t.footerNote);
  safeSetText("with-love", t.withLove);
  
  // Bible Verse
  safeSetText("verse-ref", t.verseRef);
  safeSetText("verse-text", t.verseText);
  
  // Founder's Message
  safeSetHTML("founder-msg", t.founderMsg);
  
  // Kids Intro
  safeSetText("kids-intro", t.kidsIntro);
  
  // Ways to Serve
  safeSetText("serve-text", t.serveText);
  
  // Story Roles
  safeSetText("ariel-role", t.arielRole);
  safeSetText("choi-name", t.choiName);
  safeSetText("choi-role", t.choiRole);
  safeSetText("han-name", t.hanName);
  safeSetText("han-role", t.hanRole);
  safeSetText("keziah-role", t.keziahRole);
  safeSetText("parichat-role", t.parichatRole);
  safeSetText("ji-name", t.jiName);
  safeSetText("ji-role", t.jiRole);
  safeSetText("kyungjin-role", t.kyungjinRole);
  
  // Modal Titles
  safeSetText("ariel-modal-title", t.arielModalTitle);
  safeSetText("choi-modal-title", t.choiModalTitle);
  safeSetText("han-modal-title", t.hanModalTitle);
  safeSetText("keziah-modal-title", t.keziahModalTitle);
  safeSetText("parichat-modal-title", t.parichatModalTitle);
  safeSetText("ji-modal-title", t.jiModalTitle);
  safeSetText("kyungjin-modal-title", t.kyungjinModalTitle);
  
  // Editorial Content
  safeSetHTML("editorial-content", t.editorialContent);
  
  // Story Contents
  safeSetHTML("ariel-story-content", t.arielStory);
  safeSetHTML("choi-story-content", t.choiStory);
  safeSetHTML("han-story-content", t.hanStory);
  safeSetHTML("keziah-story-content", t.keziahStory);
  safeSetHTML("parichat-story-content", t.parichatStory);
  safeSetHTML("ji-story-content", t.jiStory);
  safeSetHTML("kyungjin-story-content", t.kyungjinStory);
  
  // Read Story buttons
  document.querySelectorAll(".open-modal").forEach((btn) => {
    btn.textContent = t.readStory;
  });

  // Modal RTL/LTR
  document.querySelectorAll(".modal-content").forEach((mc) => {
    if (lang === "IL") {
      mc.setAttribute("dir", "rtl");
      mc.style.textAlign = "right";
    } else {
      mc.setAttribute("dir", "ltr");
      mc.style.textAlign = "left";
    }
  });
}

// Initialize with English
document.addEventListener('DOMContentLoaded', function() {
  switchLanguage("EN");
});

// Language button clicks
document.querySelectorAll(".language-buttons span[data-lang]").forEach((btn) => {
  btn.addEventListener("click", () => {
    switchLanguage(btn.dataset.lang);
  });
});

// MODALS
const modals = document.querySelectorAll(".modal");

document.querySelectorAll(".open-modal").forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const target = btn.getAttribute("data-target");
    if (!target) return;
    const modal = document.querySelector(target);
    if (modal) {
      modal.classList.add("show");
      document.body.style.overflow = "hidden";
    }
  });
});

document.querySelectorAll(".close-modal").forEach((btn) => {
  btn.addEventListener("click", () => {
    const modal = btn.closest(".modal");
    if (modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
    }
    // Stop any speech
    window.speechSynthesis.cancel();
  });
});

modals.forEach((modal) => {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("show");
      document.body.style.overflow = "auto";
      window.speechSynthesis.cancel();
    }
  });
});

// AUDIO: FULL PAGE
let headerSpeaking = false;
let headerUtterance = null;

function toggleHeaderAudio() {
  if (headerSpeaking) {
    window.speechSynthesis.cancel();
    headerSpeaking = false;
    return;
  }
  const mainText = document.body.innerText;
  headerUtterance = new SpeechSynthesisUtterance(mainText);
  headerUtterance.rate = 0.95;
  
  // Set language based on current selection
  const currentLang = document.body.getAttribute('data-lang');
  const langMap = {
    'EN': 'en-US',
    'KO': 'ko-KR',
    'VN': 'vi-VN',
    'TH': 'th-TH',
    'IL': 'he-IL'
  };
  headerUtterance.lang = langMap[currentLang] || 'en-US';
  
  window.speechSynthesis.speak(headerUtterance);
  headerSpeaking = true;
  headerUtterance.onend = () => {
    headerSpeaking = false;
  };
}

const headerAudioBtn = document.getElementById("audioToggleHeader");
if (headerAudioBtn) {
  headerAudioBtn.addEventListener("click", toggleHeaderAudio);
}

// AUDIO: INDIVIDUAL MODALS
function setupModalSpeakButtons() {
  document.querySelectorAll(".modal-speak-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".modal");
      if (!modal) return;
      
      // If already speaking, stop
      if (btn.classList.contains('speaking')) {
        window.speechSynthesis.cancel();
        btn.classList.remove("speaking");
        return;
      }
      
      const text = modal.innerText;
      const utter = new SpeechSynthesisUtterance(text);
      utter.rate = 0.95;
      
      // Set language
      const currentLang = document.body.getAttribute('data-lang');
      const langMap = {
        'EN': 'en-US',
        'KO': 'ko-KR',
        'VN': 'vi-VN',
        'TH': 'th-TH',
        'IL': 'he-IL'
      };
      utter.lang = langMap[currentLang] || 'en-US';

      btn.classList.add("speaking");
      window.speechSynthesis.cancel();
      window.speechSynthesis.speak(utter);

      utter.onend = () => {
        btn.classList.remove("speaking");
      };
    });
  });
}
setupModalSpeakButtons();

// KIDS BACKGROUND ROTATION
(function setupKidsBackgroundRotation() {
  const bgImages = document.querySelectorAll(".kids-bg-img");
  if (!bgImages || bgImages.length < 2) return;

  let current = 0;
  bgImages.forEach((img, idx) => {
    if (idx !== 0) img.style.opacity = "0";
  });

  setInterval(() => {
    bgImages[current].style.opacity = "0";
    current = (current + 1) % bgImages.length;
    bgImages[current].style.opacity = "1";
  }, 8000);
})();

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const openModal = document.querySelector('.modal.show');
    if (openModal) {
      openModal.classList.remove('show');
      document.body.style.overflow = 'auto';
      window.speechSynthesis.cancel();
    }
  }
});
