/**
 * ============================================================================
 * MODERN DEVELOPER PORTFOLIO - MAIN JAVASCRIPT
 * Features: Spotlight cursor, Theme switcher, Interactive Terminal,
 * Projects filtering, Quick Detail Modal, Scroll spy, and Toast notifications.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initSpotlight();
  initThemeToggle();
  initMobileNav();
  initScrollSpy();
  initTerminal();
  initProjectFilters();
  initProjectModal();
  initSkillBars();
  initContactForm();
  initCopyEmail();
});

/* --------------------------------------------------------------------------
 * 1. MOUSE SPOTLIGHT EFFECT
 * -------------------------------------------------------------------------- */
function initSpotlight() {
  const spotlight = document.querySelector('.spotlight-glow');
  if (!spotlight) return;

  window.addEventListener('pointermove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

/* --------------------------------------------------------------------------
 * 2. THEME SWITCHER (Dark / Light Mode)
 * -------------------------------------------------------------------------- */
function initThemeToggle() {
  const themeBtn = document.getElementById('themeToggleBtn');
  if (!themeBtn) return;

  // Retrieve saved theme or default to dark
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`Switched to ${newTheme} mode`, '🌓');
  });

  function updateThemeIcon(theme) {
    themeBtn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
    themeBtn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
  }
}

/* --------------------------------------------------------------------------
 * 3. MOBILE NAVIGATION DRAWER
 * -------------------------------------------------------------------------- */
function initMobileNav() {
  const openBtn = document.getElementById('mobileMenuBtn');
  const closeBtn = document.getElementById('closeMobileNav');
  const drawer = document.getElementById('mobileNavDrawer');
  const navLinks = drawer ? drawer.querySelectorAll('a') : [];

  if (!openBtn || !drawer) return;

  openBtn.addEventListener('click', () => {
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  const closeDrawer = () => {
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  navLinks.forEach(link => link.addEventListener('click', closeDrawer));
}

/* --------------------------------------------------------------------------
 * 4. SCROLL SPY (Active Nav Link)
 * -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
 * 5. INTERACTIVE TERMINAL WIDGET
 * -------------------------------------------------------------------------- */
function initTerminal() {
  const terminalInput = document.getElementById('terminalInput');
  const terminalOutput = document.getElementById('terminalOutput');
  const quickCmds = document.querySelectorAll('.quick-cmd');
  if (!terminalInput || !terminalOutput) return;

  const commands = {
    help: () => `Available commands:
  • <span class="text-gradient">skills</span>    : Display developer skill stack
  • <span class="text-gradient">projects</span>  : List notable production projects
  • <span class="text-gradient">contact</span>   : Show contact channels
  • <span class="text-gradient">whoami</span>    : About me summary
  • <span class="text-gradient">clear</span>     : Clear terminal history`,

    skills: () => `Core Skills:
  Frontend : React, Next.js, TypeScript, Tailwind CSS, Vue.js
  Backend  : Node.js, Express, Python (FastAPI), PostgreSQL, MongoDB
  DevOps   : Docker, Git, Vercel, Cloudflare, Linux`,

    projects: () => `Featured Works:
  1. PulseFlow SaaS Analytics (Next.js, Tailwind, Tremor, FastAPI)
  2. Luminex Studio (Three.js, WebGL, GSAP, Modern CSS)
  3. Velocity Crypto & Fintech (React Native, WebSocket, Node.js)`,

    contact: () => `Get in touch:
  Email    : nuruddin.akbar@example.com
  GitHub   : github.com/akbar240604
  LinkedIn : linkedin.com/in/nuruddinakbar
  Status   : Open to freelance & full-time roles`,

    whoami: () => `Fullstack Software Engineer (Muhammad Nuruddin Akbar) passionate about building high-performance web applications, fluid micro-interactions, and scalable cloud architectures.`,

    clear: () => {
      terminalOutput.innerHTML = '';
      return null;
    }
  };

  const handleCommand = (rawCmd) => {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    // Append prompt line
    const promptLine = document.createElement('div');
    promptLine.className = 'terminal-line';
    promptLine.innerHTML = `<span class="terminal-prompt">visitor@portfolio:~$</span> ${escapeHTML(rawCmd)}`;
    terminalOutput.appendChild(promptLine);

    // Execute
    if (commands[cmd]) {
      const response = commands[cmd]();
      if (response !== null) {
        const respLine = document.createElement('div');
        respLine.className = 'terminal-line';
        respLine.style.color = '#8b949e';
        respLine.style.whiteSpace = 'pre-wrap';
        respLine.innerHTML = response;
        terminalOutput.appendChild(respLine);
      }
    } else {
      const errLine = document.createElement('div');
      errLine.className = 'terminal-line';
      errLine.style.color = '#ff7b72';
      errLine.innerHTML = `command not found: ${escapeHTML(cmd)}. Type <span style="color:#58a6ff;">help</span> for a list of commands.`;
      terminalOutput.appendChild(errLine);
    }

    terminalOutput.scrollTop = terminalOutput.scrollHeight;
    terminalInput.value = '';
  };

  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      handleCommand(terminalInput.value);
    }
  });

  quickCmds.forEach(btn => {
    btn.addEventListener('click', () => {
      const cmd = btn.getAttribute('data-cmd');
      terminalInput.value = cmd;
      handleCommand(cmd);
    });
  });
}

/* --------------------------------------------------------------------------
 * 6. PROJECTS FILTERING
 * -------------------------------------------------------------------------- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          card.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
 * 7. PROJECT DETAILS MODAL
 * -------------------------------------------------------------------------- */
const projectsData = {
  saas: {
    title: 'PulseFlow - AI SaaS Analytics Platform',
    badge: 'Fullstack / SaaS',
    image: './assets/images/project-saas.jpg',
    overview: 'PulseFlow is a cloud telemetry and business intelligence platform designed for high-throughput SaaS applications. It converts raw API logs into actionable predictive insights and real-time revenue cohorts.',
    features: [
      'Real-time streaming charts powered by WebSockets and Chart.js',
      'AI anomaly detection models integrated via FastAPI microservices',
      'Multi-tenant authentication with role-based team management (RBAC)',
      'Automated PDF & CSV weekly reporting pipeline'
    ],
    techStack: ['Next.js 14', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'Docker'],
    demoUrl: 'https://example.com/demo-pulseflow',
    githubUrl: 'https://github.com/example/pulseflow'
  },
  creative: {
    title: 'Luminex Studio - 3D Architectural & Design Agency',
    badge: 'Frontend / WebGL',
    image: './assets/images/project-creative.jpg',
    overview: 'An award-winning interactive agency showcase featuring bespoke 3D glass reflections, dynamic physics animations, and immersive soundscapes crafted for luxury digital brands.',
    features: [
      'Interactive 3D model viewer with custom WebGL shaders',
      'Ultra-smooth page transitions with GSAP and Lenis smooth scrolling',
      'Fully responsive design with 60 FPS mobile optimization',
      'Integrated CMS for client portfolio and press releases'
    ],
    techStack: ['Three.js', 'WebGL', 'GSAP', 'HTML5 Canvas', 'Vanilla CSS', 'Vite'],
    demoUrl: 'https://example.com/demo-luminex',
    githubUrl: 'https://github.com/example/luminex'
  },
  fintech: {
    title: 'Velocity - Mobile Crypto & Wealth Management',
    badge: 'Fintech / Mobile',
    image: './assets/images/project-fintech.jpg',
    overview: 'Velocity delivers sub-millisecond crypto order execution and automated portfolio balancing in a consumer-friendly mobile web experience with biometric security.',
    features: [
      'Live crypto ticker orderbook with instant trade simulations',
      'Bank-grade encrypted local wallet storage with biometric prompt',
      'Automated dollar-cost averaging (DCA) scheduler',
      'Interactive profit/loss visualizer across historical horizons'
    ],
    techStack: ['React Native Web', 'TypeScript', 'Node.js', 'Redis', 'WebCrypto API'],
    demoUrl: 'https://example.com/demo-velocity',
    githubUrl: 'https://github.com/example/velocity'
  }
};

function initProjectModal() {
  const modalOverlay = document.getElementById('projectModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const detailBtns = document.querySelectorAll('.view-detail-btn');

  if (!modalOverlay || !closeBtn) return;

  const openModal = (projectId) => {
    const data = projectsData[projectId];
    if (!data) return;

    document.getElementById('modalImage').src = data.image;
    document.getElementById('modalBadge').textContent = data.badge;
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalOverview').textContent = data.overview;

    // Render features list
    const featuresList = document.getElementById('modalFeatures');
    featuresList.innerHTML = data.features.map(f => `<li style="margin-bottom:0.4rem;">${f}</li>`).join('');

    // Render tech stack tags
    const techWrapper = document.getElementById('modalTechStack');
    techWrapper.innerHTML = data.techStack.map(t => `<span class="tech-tag">${t}</span>`).join('');

    // Buttons
    document.getElementById('modalDemoLink').href = data.demoUrl;
    document.getElementById('modalGithubLink').href = data.githubUrl;

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  detailBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-project');
      openModal(id);
    });
  });

  closeBtn.addEventListener('click', closeModal);

  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
 * 8. ANIMATED SKILL PROGRESS BARS
 * -------------------------------------------------------------------------- */
function initSkillBars() {
  const progressFills = document.querySelectorAll('.progress-fill');
  if (!progressFills.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetWidth = entry.target.getAttribute('data-width') || '80%';
        entry.target.style.width = targetWidth;
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  progressFills.forEach(bar => observer.observe(bar));
}

/* --------------------------------------------------------------------------
 * 9. CONTACT FORM
 * -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolioContactForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    // Simulate sending state
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>Sending message...</span>`;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      form.reset();
      showToast('Pesan berhasil terkirim! Terima kasih.', '🚀');
    }, 1200);
  });
}

/* --------------------------------------------------------------------------
 * 10. COPY EMAIL TO CLIPBOARD
 * -------------------------------------------------------------------------- */
function initCopyEmail() {
  const copyBtn = document.getElementById('copyEmailBtn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = copyBtn.getAttribute('data-email') || 'nuruddin.akbar@example.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Email copied: ${email}`, '📋');
    }).catch(() => {
      showToast('Gagal menyalin email', '⚠️');
    });
  });
}

/* --------------------------------------------------------------------------
 * UTILITIES: TOAST NOTIFICATIONS & SANITIZER
 * -------------------------------------------------------------------------- */
function showToast(message, icon = '✨') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>${icon}</span><span>${escapeHTML(message)}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}
