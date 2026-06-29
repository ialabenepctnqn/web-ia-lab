const LOGIN_URL = 'https://app.ialab.eneneuquen.com.ar/login';

function injectNav() {
  const root = document.getElementById('nav-root');
  if (!root) return;
  root.innerHTML = `
    <nav>
      <div class="nav-left">
        <a href="/index.html" class="nav-logo">
          <img src="/imagenes/LOGOIALAB.png" alt="ENE IA LAB"
               style="height:36px;width:auto;object-fit:contain;filter:invert(1);">
        </a>
      </div>
      <div class="nav-right">
        <ul class="nav-links">
          <li><a href="/metodologia.html"   class="nav-link-page">Metodología</a></li>
          <li><a href="/eventos.html"        class="nav-link-page">Eventos</a></li>
          <li><a href="/publicaciones.html"  class="nav-link-page">Publicaciones</a></li>
        </ul>
        <a href="/membresia.html" class="nav-cta-btn">
          <i class="fas fa-users"></i> Sumate
        </a>
        <a href="${LOGIN_URL}" class="nav-login-btn">
          <i class="fas fa-sign-in-alt"></i> Login
        </a>
      </div>
    </nav>`;

  // Si hay video intro y estamos en el tope, empezar oculto sin flash de transición
  if (document.getElementById('video-intro') && window.scrollY === 0) {
    root.querySelector('nav').classList.add('hidden');
  }

  // Marcar link activo según pathname
  const path = location.pathname;
  root.querySelectorAll('.nav-link-page').forEach(a => {
    const href = a.getAttribute('href');
    if (path === href || path.endsWith(href)) {
      a.classList.add('nav-link-active');
    }
  });
}

function injectFooter() {
  const root = document.getElementById('footer-root');
  if (!root) return;
  root.innerHTML = `
    <footer>
      <div class="footer-logo">
        <img src="/imagenes/LOGOIALAB.png" alt="IA LAB Logo"
             style="height:38px;width:auto;object-fit:contain;filter:invert(1);">
        <span>2026</span>
      </div>
      <div class="footer-links">
        <a href="mailto:ialab@eneneuquen.com.ar">
          <i class="fas fa-envelope"></i> ialab@eneneuquen.com.ar
        </a>
        <a href="https://www.instagram.com/eneneuquen/" target="_blank" rel="noopener">
          <i class="fab fa-instagram"></i> @eneneuquen
        </a>
        <a href="https://www.linkedin.com/company/eneneuquen/" target="_blank" rel="noopener">
          <i class="fab fa-linkedin"></i> ENE – Polo Tecnológico Neuquén
        </a>
      </div>
      <p class="footer-copy">© 2026 ENE IA LAB · Polo Tecnológico Neuquén · Edificio ENE</p>
    </footer>`;
}

document.addEventListener('DOMContentLoaded', () => {
  injectNav();
  injectFooter();
});
