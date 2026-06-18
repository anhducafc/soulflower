// ===================================================================
// SOUL FLOWER — Hành vi chung cho tất cả các trang
// ===================================================================
(function () {
  "use strict";

  // Header đổi nền khi cuộn
  var header = document.getElementById("header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 30);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  // Menu mobile
  var navToggle = document.getElementById("navToggle");
  if (navToggle) {
    navToggle.addEventListener("click", function () {
      var isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
    document.querySelectorAll(".nav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Reveal khi cuộn tới
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (!prefersReduced && "IntersectionObserver" in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  // Form liên hệ: lưu vào localStorage để trang admin xem được (demo, không có backend thật)
  var contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var nameVal = document.getElementById("name").value.trim();
      var emailVal = document.getElementById("email").value.trim();
      var messageVal = document.getElementById("message").value.trim();

      try {
        var raw = localStorage.getItem("soulflower_messages");
        var messages = raw ? JSON.parse(raw) : [];
        messages.unshift({
          id: "msg-" + Date.now(),
          name: nameVal,
          contact: emailVal,
          message: messageVal,
          date: new Date().toISOString()
        });
        localStorage.setItem("soulflower_messages", JSON.stringify(messages));
      } catch (err) {
        console.warn("Không lưu được lời nhắn vào localStorage.", err);
      }

      var note = document.getElementById("formNote");
      if (note) {
        note.textContent = "Cảm ơn bạn đã gửi lời nhắn. Đây là bản demo nên form chưa kết nối email thật — hãy gắn vào dịch vụ form (Formspree, Getform...) hoặc backend riêng khi triển khai.";
      }
      contactForm.reset();
    });
  }
})();
