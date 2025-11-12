"use strict";

// Simple PWA setup for Newsletter
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/NewsletterQ12025/service-worker.js")
      .then(reg => console.log("✅ PWA ready:", reg.scope))
      .catch(err => console.warn("❌ PWA registration failed:", err));
  });
}
