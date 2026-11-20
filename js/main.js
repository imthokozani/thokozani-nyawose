/* ==========================================================================
   THOKOZANI NYAWOSE - PORTFOLIO INTERACTIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Dynamic Footer Year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // 2. Mobile Navigation Toggle
  const navToggle = document.getElementById('mobile-nav-toggle');
  const primaryNav = document.getElementById('primary-nav');

  if (navToggle && primaryNav) {
    navToggle.addEventListener('click', () => {
      const isExpanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isExpanded));
      primaryNav.classList.toggle('open');
    });

    primaryNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        primaryNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // 3. Active Navigation Highlight on Scroll
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollPos = window.scrollY + 140;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });
  updateActiveNav();

  // 4. Scroll Reveal Animation
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => observer.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  // 5. Pre-fill Contact Form Subject when clicking a Pricing Package
  const packageButtons = document.querySelectorAll('.select-package-btn');
  const subjectInput = document.getElementById('sender-subject');
  const nameInput = document.getElementById('sender-name');

  packageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const presetSubject = btn.getAttribute('data-subject');
      if (subjectInput && presetSubject) {
        subjectInput.value = presetSubject;
      }
      setTimeout(() => {
        if (nameInput) nameInput.focus();
      }, 450);
    });
  });

  // 6. Contact Form Handling (Static GitHub Pages Compatible via mailto fallback + validation)
  const contactForm = document.getElementById('portfolio-contact-form');
  const feedbackEl = document.getElementById('form-feedback');

  if (contactForm && feedbackEl) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      feedbackEl.className = 'form-feedback';
      feedbackEl.textContent = '';

      const name = document.getElementById('sender-name').value.trim();
      const email = document.getElementById('sender-email').value.trim();
      const subject = document.getElementById('sender-subject').value.trim();
      const message = document.getElementById('sender-message').value.trim();

      if (!name || !email || !subject || !message) {
        feedbackEl.classList.add('error');
        feedbackEl.textContent = 'Please fill in all required fields before sending your message.';
        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        feedbackEl.classList.add('error');
        feedbackEl.textContent = 'Please enter a valid email address.';
        return;
      }

      const mailtoBody = `${encodeURIComponent(message)}`;
      const mailtoLink = `mailto:nyawose.thokozani@outlook.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`;

      feedbackEl.classList.add('success');
      feedbackEl.textContent = 'Thank you! Opening your default email client to send your message directly to nyawose.thokozani@outlook.com.';

      window.location.href = mailtoLink;
    });
  }

  // 7. Project Details Modal
  const projectDetailsData = {
    delta: {
      title: 'Delta Driving School Management System',
      badge: 'University Capstone Team Project (UKZN)',
      overview: 'Developed as a collaborative university capstone project to digitise manual administrative processes at Delta Driving School.',
      highlights: [
        'Replaced fragmented tracking across WhatsApp, phone calls, spreadsheets, and physical files with a central application.',
        'Supports learner and instructor profiles, lesson and driving test scheduling, payment records, and Crystal Reports summaries.',
        'My individual contributions focused on requirements gathering, relational database design and SQL implementation, Create and selected Update CRUD operations for lesson and test bookings, login verification, and Agile team testing/debugging.'
      ],
      repo: 'https://github.com/imthokozani/delta_driving_school_repo'
    },
    si: {
      title: 'Student Instructional Leader (SI Leader) Attendance Management System',
      badge: 'Independent Personal Project',
      overview: 'Built independently to reduce administrative workload for university SI Leaders managing student session attendance.',
      highlights: [
        'Allows an SI Leader to generate a dedicated QR code for each instructional session.',
        'Students scan the QR code to open a digital attendance form and submit their attendance directly.',
        'Eliminates manual paper registers and reduces repetitive data entry into Excel spreadsheets.'
      ],
      repo: 'https://github.com/imthokozani/SI_APPLICATION'
    },
    churn: {
      title: 'Customer Churn Analysis and Prediction',
      badge: 'Independent Data Analytics & ML Project',
      overview: 'An end-to-end data exploration and predictive modelling project aimed at helping businesses understand and reduce customer attrition.',
      highlights: [
        'Extracted and structured customer datasets using Google BigQuery.',
        'Performed data preparation, cleaning, and variable exploration using Python and Pandas.',
        'Developed a predictive churn identification workflow to highlight customers at higher risk of discontinuing a service.'
      ],
      repo: ''
    }
  };

  const modal = document.getElementById('project-modal');
  const modalBody = document.getElementById('modal-body-content');
  const modalClose = document.getElementById('modal-close');
  const modalButtons = document.querySelectorAll('.project-modal-btn');

  function openProjectModal(key) {
    const data = projectDetailsData[key];
    if (!data || !modal || !modalBody) return;

    const itemsHtml = data.highlights.map(item => `<li>${item}</li>`).join('');
    const repoHtml = data.repo
      ? `<a href="${data.repo}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm">Open GitHub Repository</a>`
      : `<a href="#contact" class="btn btn-primary btn-sm" id="modal-contact-jump">Inquire About This Project</a>`;

    modalBody.innerHTML = `
      <span class="badge badge-solid" style="margin-bottom:0.75rem;">${data.badge}</span>
      <h3 id="modal-title">${data.title}</h3>
      <p>${data.overview}</p>
      <h4 style="margin-bottom:0.5rem; font-size:0.95rem;">Key Highlights &amp; Responsibilities</h4>
      <ul>${itemsHtml}</ul>
      <div style="margin-top:1.25rem;">${repoHtml}</div>
    `;

    modal.hidden = false;
    document.body.style.overflow = 'hidden';

    const jumpBtn = document.getElementById('modal-contact-jump');
    if (jumpBtn) {
      jumpBtn.addEventListener('click', closeProjectModal);
    }
  }

  function closeProjectModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
  }

  modalButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      openProjectModal(btn.getAttribute('data-project'));
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeProjectModal);
  }

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeProjectModal();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && !modal.hidden) {
      closeProjectModal();
    }
  });
});
