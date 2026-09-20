/* =========================================================
   SAYEEM AKBER PORTFOLIO
   MAIN JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. PAGE LOADER
    ===================================================== */

    const pageLoader = document.getElementById("pageLoader");

    window.addEventListener("load", () => {

        setTimeout(() => {

            if (pageLoader) {
                pageLoader.classList.add("loaded");
            }

        }, 500);

    });


    /* =====================================================
       02. HEADER SCROLL EFFECT
    ===================================================== */

    const siteHeader = document.getElementById("siteHeader");

    const handleHeaderScroll = () => {

        if (!siteHeader) return;

        if (window.scrollY > 50) {

            siteHeader.classList.add("scrolled");

        } else {

            siteHeader.classList.remove("scrolled");

        }

    };

    handleHeaderScroll();

    window.addEventListener(
        "scroll",
        handleHeaderScroll,
        { passive: true }
    );


    /* =====================================================
       03. MOBILE NAVIGATION
    ===================================================== */

    const mobileMenuToggle =
        document.getElementById("mobileMenuToggle");

    const mainNavigation =
        document.getElementById("mainNavigation");

    if (mobileMenuToggle && mainNavigation) {

        mobileMenuToggle.addEventListener("click", () => {

            const isOpen =
                mainNavigation.classList.toggle("mobile-open");

            mobileMenuToggle.classList.toggle(
                "active",
                isOpen
            );

            mobileMenuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            document.body.classList.toggle(
                "menu-open",
                isOpen
            );

        });


        /* Close menu when clicking a navigation link */

        const navLinks =
            mainNavigation.querySelectorAll("a");

        navLinks.forEach((link) => {

            link.addEventListener("click", () => {

                mainNavigation.classList.remove(
                    "mobile-open"
                );

                mobileMenuToggle.classList.remove(
                    "active"
                );

                mobileMenuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            });

        });

    }


    /* =====================================================
       04. SMOOTH SCROLL
    ===================================================== */

    const anchorLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    anchorLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            const headerHeight =
                siteHeader
                    ? siteHeader.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.scrollY -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       05. ACTIVE NAVIGATION
    ===================================================== */

    const sections =
        document.querySelectorAll(
            "main section[id]"
        );

    const navigationLinks =
        document.querySelectorAll(
            ".main-navigation .nav-link"
        );

    const updateActiveNavigation = () => {

        let currentSection = "";

        const scrollPosition =
            window.scrollY +
            (siteHeader
                ? siteHeader.offsetHeight + 100
                : 120);

        sections.forEach((section) => {

            const sectionTop =
                section.offsetTop;

            const sectionHeight =
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            const href =
                link.getAttribute("href");

            if (
                href === `#${currentSection}`
            ) {

                link.classList.add("active");

            }

        });

    };

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       06. EXPERIENCE FILTER
    ===================================================== */

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const experienceItems =
        document.querySelectorAll(".experience-item");

    filterButtons.forEach((button) => {

        button.addEventListener("click", () => {

            const filter =
                button.dataset.filter;


            /* Active button */

            filterButtons.forEach((btn) => {

                btn.classList.remove("active");

            });

            button.classList.add("active");


            /* Filter items */

            experienceItems.forEach((item) => {

                const category =
                    item.dataset.category;


                if (
                    filter === "all" ||
                    category === filter
                ) {

                    item.classList.remove("hidden");

                } else {

                    item.classList.add("hidden");

                }

            });

        });

    });


    /* =====================================================
       07. REVEAL ANIMATION
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-header, " +
            ".section-title, " +
            ".about-text, " +
            ".detail-item, " +
            ".competency-card, " +
            ".experience-item, " +
            ".education-item, " +
            ".certification-card, " +
            ".award-item, " +
            ".project-card, " +
            ".contact-info, " +
            ".contact-form-wrapper, " +
            ".hire-box"
        );


    revealElements.forEach((element) => {

        element.classList.add("reveal");

    });


    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    entry.target.classList.add(
                        "visible"
                    );

                    observer.unobserve(
                        entry.target
                    );

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


    revealElements.forEach((element) => {

        revealObserver.observe(element);

    });


    /* =====================================================
       08. STAGGER ANIMATION
    ===================================================== */

    const staggerGroups = [
        ".competency-grid",
        ".certification-grid",
        ".projects-grid"
    ];


    staggerGroups.forEach((selector) => {

        const group =
            document.querySelector(selector);

        if (!group) return;

        const children =
            group.children;

        Array.from(children).forEach(
            (child, index) => {

                child.style.transitionDelay =
                    `${index * 0.08}s`;

            }
        );

    });


    /* =====================================================
       09. CONTACT FORM
    ===================================================== */

    const contactForm =
        document.getElementById("contactForm");

    const formMessage =
        document.getElementById("formMessage");


    if (contactForm) {

        contactForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();


                const name =
                    document
                        .getElementById("name")
                        ?.value.trim();

                const email =
                    document
                        .getElementById("email")
                        ?.value.trim();

                const subject =
                    document
                        .getElementById("subject")
                        ?.value.trim();

                const message =
                    document
                        .getElementById("message")
                        ?.value.trim();


                if (
                    !name ||
                    !email ||
                    !subject ||
                    !message
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please complete all fields.";

                        formMessage.style.color =
                            "#ff6b6b";

                    }

                    return;

                }


                /* Basic email validation */

                const emailPattern =
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


                if (
                    !emailPattern.test(email)
                ) {

                    if (formMessage) {

                        formMessage.textContent =
                            "Please enter a valid email address.";

                        formMessage.style.color =
                            "#ff6b6b";

                    }

                    return;

                }


                /*
                 * Demo success state.
                 *
                 * Later you can connect this form
                 * to Formspree, EmailJS, PHP, WPForms,
                 * or your own backend.
                 */

                if (formMessage) {

                    formMessage.textContent =
                        "Thanks! Your message is ready to send.";

                    formMessage.style.color =
                        "#82ff1f";

                }


                contactForm.reset();

            }
        );

    }


    /* =====================================================
       10. BACK TO TOP
    ===================================================== */

    const backToTop =
        document.getElementById("backToTop");


    if (backToTop) {

        const toggleBackToTop = () => {

            if (window.scrollY > 600) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );

            }

        };


        toggleBackToTop();

        window.addEventListener(
            "scroll",
            toggleBackToTop,
            { passive: true }
        );


        backToTop.addEventListener(
            "click",
            () => {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );

    }


    /* =====================================================
       11. CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById("currentYear");


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       12. PROFILE CARD MOUSE EFFECT
    ===================================================== */

    const profileCard =
        document.querySelector(".profile-card");


    if (
        profileCard &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        profileCard.addEventListener(
            "mousemove",
            (event) => {

                const rect =
                    profileCard.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left;

                const y =
                    event.clientY -
                    rect.top;


                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;


                const rotateX =
                    ((y - centerY) /
                        centerY) *
                    -3;

                const rotateY =
                    ((x - centerX) /
                        centerX) *
                    3;


                profileCard.style.transform =
                    `perspective(1000px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-8px)`;

            }
        );


        profileCard.addEventListener(
            "mouseleave",
            () => {

                profileCard.style.transform =
                    "";

            }
        );

    }


    /* =====================================================
       13. HERO PARALLAX
    ===================================================== */

    const heroGlowOne =
        document.querySelector(
            ".hero-glow-one"
        );

    const heroGlowTwo =
        document.querySelector(
            ".hero-glow-two"
        );


    window.addEventListener(
        "scroll",
        () => {

            const scroll =
                window.scrollY;


            if (heroGlowOne) {

                heroGlowOne.style.transform =
                    `translate3d(
                        0,
                        ${scroll * 0.12}px,
                        0
                    )`;

            }


            if (heroGlowTwo) {

                heroGlowTwo.style.transform =
                    `translate3d(
                        0,
                        ${scroll * -0.06}px,
                        0
                    )`;

            }

        },
        { passive: true }
    );


    /* =====================================================
       14. PROJECT IMAGE FALLBACK
    ===================================================== */

    const projectImages =
        document.querySelectorAll(
            ".project-image img"
        );


    projectImages.forEach((image) => {

        image.addEventListener(
            "error",
            () => {

                image.style.display = "none";

                const parent =
                    image.closest(".project-image");

                if (parent) {

                    parent.style.background =
                        "linear-gradient(135deg, #101010, #171717)";

                }

            }
        );

    });


    /* =====================================================
       15. PROFILE IMAGE FALLBACK
    ===================================================== */

    const profileImage =
        document.querySelector(
            ".profile-image"
        );


    if (profileImage) {

        profileImage.addEventListener(
            "error",
            () => {

                profileImage.style.display =
                    "none";

            }
        );

    }


    /* =====================================================
       16. ESCAPE KEY
    ===================================================== */

    document.addEventListener(
        "keydown",
        (event) => {

            if (
                event.key === "Escape" &&
                mainNavigation &&
                mainNavigation.classList.contains(
                    "mobile-open"
                )
            ) {

                mainNavigation.classList.remove(
                    "mobile-open"
                );

                mobileMenuToggle?.classList.remove(
                    "active"
                );

                mobileMenuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       17. RESIZE HANDLER
    ===================================================== */

    window.addEventListener(
        "resize",
        () => {

            if (
                window.innerWidth > 900 &&
                mainNavigation
            ) {

                mainNavigation.classList.remove(
                    "mobile-open"
                );

                mobileMenuToggle?.classList.remove(
                    "active"
                );

                mobileMenuToggle?.setAttribute(
                    "aria-expanded",
                    "false"
                );

                document.body.classList.remove(
                    "menu-open"
                );

            }

        }
    );


    /* =====================================================
       18. CONSOLE MESSAGE
    ===================================================== */

    console.log(
        "%cSayeem Akber Portfolio",
        "color:#82ff1f;font-size:18px;font-weight:bold;"
    );

    console.log(
        "%cBrand Designer • WordPress Developer • AI Developer",
        "color:#aaa;font-size:12px;"
    );

});
/* =========================================================
   08. REFERENCE-INSPIRED MOTION SYSTEM
========================================================= */

(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Scroll reveal
    const revealItems = document.querySelectorAll('.reveal-up');
    if ('IntersectionObserver' in window && !reduced) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -50px 0px' });
        revealItems.forEach(el => observer.observe(el));
    } else {
        revealItems.forEach(el => el.classList.add('is-visible'));
    }

    // Pointer spotlight on desktop
    const spot = document.querySelector('.pointer-spot');
    if (spot && !reduced && window.matchMedia('(pointer:fine)').matches) {
        let x = innerWidth / 2, y = innerHeight / 2;
        let tx = x, ty = y;
        window.addEventListener('pointermove', e => { tx = e.clientX; ty = e.clientY; }, { passive: true });
        const tick = () => {
            x += (tx - x) * 0.12;
            y += (ty - y) * 0.12;
            spot.style.left = x + 'px';
            spot.style.top = y + 'px';
            requestAnimationFrame(tick);
        };
        tick();
    } else if (spot) {
        spot.style.display = 'none';
    }

    // Gentle hero parallax for the profile card and grid.
    const hero = document.querySelector('.hero-section');
    const card = document.querySelector('.profile-card');
    const grid = document.querySelector('.hero-grid');
    if (hero && card && !reduced && window.matchMedia('(pointer:fine)').matches) {
        hero.addEventListener('pointermove', e => {
            const r = hero.getBoundingClientRect();
            const px = (e.clientX - r.left) / r.width - .5;
            const py = (e.clientY - r.top) / r.height - .5;
            card.style.transform = `perspective(1000px) rotateY(${px * 5}deg) rotateX(${py * -4}deg) translateY(-4px)`;
            if (grid) grid.style.transform = `perspective(800px) rotateX(62deg) translate(${px * -18}px, ${22 + py * -10}%)`;
        }, { passive: true });
        hero.addEventListener('pointerleave', () => {
            card.style.transform = '';
            if (grid) grid.style.transform = '';
        });
    }

    // Keep the floating rail in sync with the main sections.
    const railLinks = [...document.querySelectorAll('.motion-rail a[data-section]')];
    const railSections = railLinks.map(a => document.getElementById(a.dataset.section)).filter(Boolean);
    if ('IntersectionObserver' in window && railSections.length) {
        const railObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    railLinks.forEach(a => a.classList.toggle('active', a.dataset.section === entry.target.id));
                }
            });
        }, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
        railSections.forEach(s => railObserver.observe(s));
    }

    // Animated skill-tag entrance.
    document.querySelectorAll('.skill-tag').forEach((tag, i) => {
        tag.style.transitionDelay = `${i * 45}ms`;
    });
})();


/* =========================================================
   ULTRA MOTION / INTERACTION LAYER
========================================================= */

(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll progress
  const progress = document.createElement("div");
  progress.className = "scroll-progress";
  document.body.appendChild(progress);

  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  if (reduceMotion) return;

  // Magnetic buttons / tags
  document.querySelectorAll(".btn,.nav-hire,.availability-badge").forEach(el => {
    el.addEventListener("pointermove", e => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX-r.left-r.width/2) / r.width;
      const y = (e.clientY-r.top-r.height/2) / r.height;
      el.style.transform = `translate(${x*8}px,${y*8}px)`;
    });
    el.addEventListener("pointerleave",()=>el.style.transform="");
  });

  // Tilt cards
  document.querySelectorAll(".profile-card,.competency-card,.certification-card,.project-card,.selected-project,.work-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      const r=card.getBoundingClientRect();
      const x=(e.clientX-r.left)/r.width-.5;
      const y=(e.clientY-r.top)/r.height-.5;
      card.style.transform=`perspective(900px) rotateX(${-y*5}deg) rotateY(${x*7}deg) translateY(-5px)`;
    });
    card.addEventListener("pointerleave",()=>card.style.transform="");
  });

  // Hero parallax
  const hero = document.querySelector(".hero-section");
  if (hero) {
    const heroImage = hero.querySelector(".hero-profile");
    const heroText = hero.querySelector(".hero-content");
    window.addEventListener("scroll", () => {
      const y = Math.min(window.scrollY, innerHeight);
      if (heroImage) heroImage.style.transform = `translate3d(0,${y*.07}px,0)`;
      if (heroText) heroText.style.transform = `translate3d(0,${y*-.025}px,0)`;
    }, {passive:true});
  }

  // Reveal observer with stagger
  const revealItems = document.querySelectorAll(".reveal-up,.about-text,.detail-item,.competency-card,.experience-item,.education-item,.certification-card,.award-item,.project-card,.contact-form");
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    });
  }, {threshold:.12, rootMargin:"0px 0px -8% 0px"});

  revealItems.forEach((el,i) => {
    el.style.transitionDelay = `${Math.min((i%6)*70,350)}ms`;
    revealObserver.observe(el);
  });

  // Section headings subtly react to visibility
  document.querySelectorAll(".section-title").forEach(title => {
    const o=new IntersectionObserver(es=>{
      es.forEach(e=>{
        if(e.isIntersecting){title.classList.add("is-visible");o.unobserve(title)}
      });
    },{threshold:.6});
    o.observe(title);
  });

  // Image sheen follows pointer
  document.querySelectorAll(".profile-card,.project-card").forEach(card=>{
    card.addEventListener("pointermove",e=>{
      const r=card.getBoundingClientRect();
      const px=((e.clientX-r.left)/r.width)*100;
      const py=((e.clientY-r.top)/r.height)*100;
      card.style.setProperty("--mx",px+"%");
      card.style.setProperty("--my",py+"%");
    });
  });
})();


/* ===== Single cinematic cursor controller ===== */
(function cinematicCursor(){
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const orbit = document.createElement('div');
  orbit.className = 'cursor-orbit';
  document.body.appendChild(orbit);
  let x = innerWidth/2, y = innerHeight/2, ox=x, oy=y;
  window.addEventListener('mousemove', e => { x=e.clientX; y=e.clientY; }, {passive:true});
  const tick=()=>{
    ox += (x-ox)*.2; oy += (y-oy)*.2;
    orbit.style.transform=`translate3d(${ox}px,${oy}px,0) translate(-50%,-50%)`;
    requestAnimationFrame(tick);
  }; tick();
  document.querySelectorAll('a,button,.btn,.nav-link,.skill-tag,.project-card,.experience-main,.filter-btn').forEach(el=>{
    el.addEventListener('mouseenter',()=>orbit.classList.add('is-hover'));
    el.addEventListener('mouseleave',()=>orbit.classList.remove('is-hover'));
  });
})();

/* =========================================================
   CINEMATIC MICRO-INTERACTIONS
========================================================= */
(() => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce) return;

  // Add a soft pointer spotlight layer if the markup has no usable one.
  let spot = document.querySelector(".pointer-spot");
  if (!spot) {
    spot = document.createElement("div");
    spot.className = "pointer-spot";
    Object.assign(spot.style,{
      position:"fixed", left:"50%", top:"50%", transform:"translate(-50%,-50%)",
      pointerEvents:"none", zIndex:"0"
    });
    document.body.prepend(spot);
  }

  // Section cards get a subtle mouse-follow sheen.
  const cards = document.querySelectorAll(
    ".competency-card,.certification-card,.award-item,.project-card,.experience-main,.contact-form-wrapper"
  );
  if (window.matchMedia("(pointer:fine)").matches) {
    cards.forEach(card => {
      card.addEventListener("pointermove", e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX-r.left)/r.width)*100;
        const y = ((e.clientY-r.top)/r.height)*100;
        card.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(184,255,0,.055), transparent 42%), rgba(255,255,255,.012)`;
      });
      card.addEventListener("pointerleave", () => {
        card.style.background = "";
      });
    });
  }

  // Slight heading letter reveal.
  document.querySelectorAll(".section-title,.hero-headline,.contact-title").forEach(el=>{
    el.style.willChange="transform";
    const base = el.style.transform;
    el.addEventListener("pointermove",e=>{
      const r=el.getBoundingClientRect();
      const px=(e.clientX-r.left)/r.width-.5;
      const py=(e.clientY-r.top)/r.height-.5;
      el.style.transform=`translate3d(${px*3}px,${py*2}px,0)`;
    });
    el.addEventListener("pointerleave",()=>el.style.transform=base);
  });
})();

/* Timeline motion polish */
(() => {
  const items = document.querySelectorAll('.cinematic-timeline .experience-item');
  items.forEach((item, i) => item.style.transitionDelay = `${i * 80}ms`);
})();


/* ===== Journey filter + scroll choreography ===== */
document.addEventListener('DOMContentLoaded',()=>{
  const list=document.querySelector('.cinematic-timeline');
  if(!list) return;
  const items=[...list.querySelectorAll('.experience-item')];
  const buttons=[...document.querySelectorAll('.experience-filters .filter-btn')];
  const apply=(filter)=>{
    items.forEach((item,i)=>{
      const show=filter==='all'||item.dataset.category===filter;
      item.classList.toggle('hidden',!show);
      if(show){ item.style.animationDelay=`${Math.min(i*80,320)}ms`; }
    });
  };
  buttons.forEach(btn=>btn.addEventListener('click',()=>apply(btn.dataset.filter)));
  apply('all');

  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>entries.forEach(e=>{
      if(e.isIntersecting) e.target.classList.add('journey-in-view');
    }),{threshold:.22,rootMargin:'0px 0px -12% 0px'});
    items.forEach(i=>obs.observe(i));
  }
});



/* --- Single animated mouse cursor --- */
(() => {
  if (window.matchMedia("(pointer:coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const cursor = document.createElement("div");
  cursor.className = "cinematic-cursor";
  document.body.appendChild(cursor);

  let targetX = -100, targetY = -100;
  let currentX = targetX, currentY = targetY;

  window.addEventListener("pointermove", (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    cursor.classList.add("is-visible");
  }, {passive:true});

  const interactive = [
    "a","button","input","textarea","select",
    ".btn",".skill-tag",".nav-link",
    ".competency-card",".certification-card",
    ".experience-main",".project-card",".award-item"
  ].join(",");

  document.addEventListener("pointerover", (e) => {
    if (e.target.closest(interactive)) cursor.classList.add("is-hover");
  });
  document.addEventListener("pointerout", (e) => {
    if (e.target.closest(interactive)) cursor.classList.remove("is-hover");
  });

  function animate(){
    currentX += (targetX-currentX)*0.18;
    currentY += (targetY-currentY)*0.18;
    cursor.style.transform =
      `translate3d(${currentX}px,${currentY}px,0)`;
    requestAnimationFrame(animate);
  }
  animate();
})();
