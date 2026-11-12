(() => {
  "use strict";

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const progress = document.querySelector(".scroll-progress");
  const backTop = document.querySelector(".back-top");
  const year = document.querySelector("#year");

  if (year) year.textContent = new Date().getFullYear();

  // Accessible mobile navigation
  menuButton?.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    nav?.classList.toggle("open", !isOpen);
  });

  nav?.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      nav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "Open navigation");
    });
  });

  // Close the mobile menu with Escape and keep its state accessible.
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && nav?.classList.contains("open")) {
      nav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "Open navigation");
      menuButton?.focus();
    }
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 700 && nav?.classList.contains("open")) {
      nav.classList.remove("open");
      menuButton?.setAttribute("aria-expanded", "false");
      menuButton?.setAttribute("aria-label", "Open navigation");
    }
  }, { passive: true });

  // Scroll progress and back-to-top control
  let ticking = false;
  const updateScrollUI = () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    if (progress) progress.style.width = `${percent}%`;
    backTop?.classList.toggle("visible", window.scrollY > 500);
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) {
      window.requestAnimationFrame(updateScrollUI);
      ticking = true;
    }
  }, { passive: true });
  updateScrollUI();
  backTop?.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Reveal animations; content remains visible if IntersectionObserver is unavailable.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Journey filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const journeyItems = document.querySelectorAll("[data-category]");
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      filterButtons.forEach(item => {
        const active = item === button;
        item.classList.toggle("active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      journeyItems.forEach(item => {
        item.hidden = filter !== "all" && item.dataset.category !== filter;
      });
    });
  });

  // Resume: show a helpful hint if the local PDF has not been added.
  const resumeLink = document.querySelector("[data-resume]");
  const resumeNote = document.querySelector("[data-resume-note]");
  resumeLink?.addEventListener("click", event => {
    // A missing local file normally produces a browser 404. Keep the link functional
    // and provide the exact expected path in the page for easy setup.
    if (!resumeLink.getAttribute("href")) {
      event.preventDefault();
      if (resumeNote) resumeNote.hidden = false;
    }
  });

  // Contact form: validates locally and opens the visitor's email app.
  // Configure the real destination in CONTACT_EMAIL below before publishing.
  const CONTACT_EMAIL = "YOUR_EMAIL@example.com";
  const form = document.querySelector("#contact-form");
  const status = document.querySelector("#form-status");
  const emailLink = document.querySelector("[data-email-link]");
  if (emailLink) {
    emailLink.href = `mailto:${CONTACT_EMAIL}`;
    emailLink.textContent = `${CONTACT_EMAIL} ↗`;
  }

  form?.addEventListener("submit", event => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (CONTACT_EMAIL === "YOUR_EMAIL@example.com") {
      status.textContent = "Setup needed: open script.js and replace YOUR_EMAIL@example.com with your real email address.";
      status.style.color = "#9b3d20";
      return;
    }

    const data = new FormData(form);
    const subject = encodeURIComponent(`Portfolio inquiry: ${data.get("subject")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nEmail: ${data.get("email")}\n\n${data.get("message")}`
    );
    status.textContent = "Opening your email application…";
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
  });

  // Cinematic motion system inspired by the reference portfolio.
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loader = document.querySelector(".site-loader");
  const cursorDot = document.querySelector(".custom-cursor");
  const cursorRing = document.querySelector(".custom-cursor-ring");
  const cursorLabel = document.querySelector(".cursor-label");

  const finishLoader = () => window.setTimeout(() => loader?.classList.add("is-done"), 1050);
  if (loader && !reduceMotion && window.matchMedia("(min-width: 701px)").matches) {
    window.addEventListener("load", finishLoader, { once: true });
    window.setTimeout(finishLoader, 2200);
  } else loader?.classList.add("is-done");

  // Custom dot + eased ring cursor with contextual hover label.
  if (finePointer && !reduceMotion && cursorDot && cursorRing) {
    document.body.classList.add("cursor-ready");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener("pointermove", event => {
      mx = event.clientX; my = event.clientY;
      cursorDot.style.left = `${mx}px`; cursorDot.style.top = `${my}px`;
    }, { passive: true });
    const followCursor = () => {
      rx += (mx - rx) * .17; ry += (my - ry) * .17;
      cursorRing.style.left = `${rx}px`; cursorRing.style.top = `${ry}px`;
      requestAnimationFrame(followCursor);
    };
    requestAnimationFrame(followCursor);
    document.querySelectorAll("a, button, .project-card, .journey-card").forEach(el => {
      el.addEventListener("pointerenter", () => {
        cursorRing.classList.add("is-hover");
        if (el.classList.contains("project-card")) cursorLabel.textContent = "VIEW";
        else if (el.matches("a[href^='#contact'], .header-cta")) cursorLabel.textContent = "LET'S TALK";
        else cursorLabel.textContent = "";
      });
      el.addEventListener("pointerleave", () => {
        cursorRing.classList.remove("is-hover"); cursorLabel.textContent = "";
      });
    });
    document.addEventListener("pointerdown", () => cursorRing.classList.add("is-click"));
    document.addEventListener("pointerup", () => cursorRing.classList.remove("is-click"));
  }

  // Lenis smooth scrolling, synchronized with GSAP ScrollTrigger when available.
  let lenis = null;
  if (!reduceMotion && window.Lenis) {
    lenis = new Lenis({ duration: 1.05, smoothWheel: true, wheelMultiplier: .9, touchMultiplier: 1, smoothTouch: false });
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(time => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    } else {
      const raf = time => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", event => {
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) { event.preventDefault(); lenis.scrollTo(target, { offset: -75 }); }
      });
    });
  }

  // Scroll-linked entrance and image depth.
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray(".section-space, .stats, .contact-box").forEach(section => {
      gsap.fromTo(section, { y: 38, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: section, start: "top 88%", once: true }
      });
    });
    gsap.utils.toArray(".journey-card, .project-card, .award-card").forEach((card, index) => {
      gsap.fromTo(card, { y: 55, rotateX: 5, autoAlpha: 0 }, {
        y: 0, rotateX: 0, autoAlpha: 1, duration: .85, delay: (index % 3) * .09,
        ease: "power3.out", scrollTrigger: { trigger: card, start: "top 92%", once: true }
      });
    });
    gsap.utils.toArray(".education article, .skill-row").forEach((item, index) => {
      gsap.from(item, { x: index % 2 ? 28 : -28, autoAlpha: 0, duration: .7, ease: "power2.out",
        scrollTrigger: { trigger: item, start: "top 92%", once: true } });
    });
    const heroArt = document.querySelector(".hero-art");
    if (heroArt) gsap.to(heroArt, { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: .7 } });
  }

  // Magnetic CTA and subtle 3D project tilt on desktop only.
  if (finePointer && !reduceMotion) {
    document.querySelectorAll(".button, .header-cta").forEach(button => {
      button.addEventListener("pointermove", event => {
        const rect = button.getBoundingClientRect();
        const dx = event.clientX - (rect.left + rect.width / 2);
        const dy = event.clientY - (rect.top + rect.height / 2);
        button.style.transform = `translate(${dx * .10}px, ${dy * .16}px)`;
      });
      button.addEventListener("pointerleave", () => { button.style.transform = ""; });
    });
    document.querySelectorAll(".project-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        card.style.transform = `perspective(900px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-5px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }


  // Premium cinematic title reveal (keeps accessible text available to screen readers).
  const heroTitle = document.querySelector(".hero h1");
  if (!reduceMotion && heroTitle && window.gsap) {
    const original = heroTitle.innerHTML;
    const textOnly = heroTitle.innerText.replace(/\s+/g, " ").trim();
    heroTitle.setAttribute("aria-label", textOnly);
    const parts = [];
    heroTitle.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const chunks = node.textContent.split(/(\s+)/);
        chunks.forEach(chunk => {
          if (!chunk) return;
          if (/^\s+$/.test(chunk)) parts.push(document.createTextNode(chunk));
          else {
            const word = document.createElement("span");
            word.className = "hero-word";
            const inner = document.createElement("span");
            inner.textContent = chunk;
            word.appendChild(inner);
            parts.push(word);
          }
        });
      } else if (node.nodeType === Node.ELEMENT_NODE && node.tagName === "BR") {
        parts.push(document.createElement("br"));
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const wrap = document.createElement("span");
        wrap.className = "hero-word";
        const inner = document.createElement("span");
        inner.innerHTML = node.innerHTML;
        wrap.appendChild(inner);
        parts.push(wrap);
      }
    });
    heroTitle.replaceChildren(...parts);
    gsap.fromTo(heroTitle.querySelectorAll(".hero-word > span"),
      { yPercent: 115, rotateX: -45, opacity: 0, filter: "blur(8px)" },
      { yPercent: 0, rotateX: 0, opacity: 1, filter: "blur(0px)", duration: 1.05,
        stagger: .075, ease: "power4.out", delay: .18, clearProps: "all" });
    // Restore the original title markup if scripts are dynamically re-evaluated.
    heroTitle.dataset.motionReady = "true";
  }

  // Pointer-following ambient light on cards; no layout reads during scroll.
  if (finePointer) {
    document.querySelectorAll(".journey-feature,.journey-card,.project-card,.award-card").forEach(card => {
      card.addEventListener("pointermove", event => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
        card.style.setProperty("--my", `${event.clientY - rect.top}px`);
      }, { passive: true });
    });
  }

  // Soft neon click ripple for mouse/trackpad interactions only.
  if (finePointer && !reduceMotion) {
    document.addEventListener("pointerdown", event => {
      if (event.button !== 0 || event.target.closest("input,textarea,select")) return;
      const ripple = document.createElement("span");
      ripple.className = "click-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      document.body.appendChild(ripple);
      ripple.addEventListener("animationend", () => ripple.remove(), { once: true });
    }, { passive: true });
  }

  // Header state and timeline marker progress.
  const header = document.querySelector(".site-header");
  const updateHeader = () => header?.classList.toggle("scrolled", window.scrollY > 24);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  // More fluid, staggered journey and education reveals.
  if (!reduceMotion && window.gsap && window.ScrollTrigger) {
    gsap.utils.toArray(".journey-feature,.education").forEach((item, index) => {
      gsap.fromTo(item, { y: 44, autoAlpha: 0, scale: .985 }, {
        y: 0, autoAlpha: 1, scale: 1, duration: 1.05, delay: index * .06,
        ease: "power3.out",
        scrollTrigger: { trigger: item, start: "top 86%", once: true }
      });
    });
    gsap.utils.toArray(".stats-grid > div").forEach((item, index) => {
      gsap.fromTo(item, { y: 18, autoAlpha: 0 }, {
        y: 0, autoAlpha: 1, duration: .7, delay: index * .08, ease: "power2.out",
        scrollTrigger: { trigger: item.parentElement, start: "top 88%", once: true }
      });
    });
    const portrait = document.querySelector(".portrait-frame");
    if (portrait && finePointer) {
      const art = portrait.closest(".hero-art");
      art?.addEventListener("pointermove", event => {
        const rect = art.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        gsap.to(portrait, { rotateY: px * 5, rotateX: -py * 5, duration: .55, ease: "power2.out" });
      });
      art?.addEventListener("pointerleave", () => gsap.to(portrait, { rotateY: 0, rotateX: 0, duration: .8, ease: "elastic.out(1,.5)" }));
    }
  }

})();