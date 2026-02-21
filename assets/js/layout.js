window.ER = window.ER || {};

ER.layout = {
  header(active) {
    const isActive = (k) => (active === k ? "active" : "");

    return `
<header class="border-bottom site-header">
  <nav class="navbar navbar-expand-lg bg-body" aria-label="Primary">
    <div class="container">
      <a class="navbar-brand d-flex align-items-center gap-2 brand-link" href="index.html" aria-label="EventRent">
        <span class="brand-mark" aria-hidden="true">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7 3v3M17 3v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M4 7h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            <path d="M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" stroke="currentColor" stroke-width="2"/>
            <path d="M8.5 12.5 10.5 14.5 15.5 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </span>
        <span class="brand-text">
          <span class="name d-block">EventRent</span>
        </span>
      </a>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain" aria-controls="navMain" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navMain">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle ${active === "home1" || active === "home2" ? "active" : ""}" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Home</a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="index.html">Home 1</a></li>
              <li><a class="dropdown-item" href="home-2.html">Home 2</a></li>
            </ul>
          </li>
          <li class="nav-item"><a class="nav-link ${isActive("about")}" href="about.html">About</a></li>
          <li class="nav-item"><a class="nav-link ${isActive("services")}" href="services.html">Services</a></li>
          <li class="nav-item"><a class="nav-link ${isActive("inventory")}" href="inventory.html">Inventory</a></li>
          <li class="nav-item"><a class="nav-link ${isActive("quote")}" href="quote-builder.html">Quote Builder</a></li>
          <li class="nav-item"><a class="nav-link ${isActive("contact")}" href="contact.html">Contact</a></li>
        </ul>

        <div class="d-lg-flex align-items-lg-center gap-2">
          <div class="d-lg-none border-top pt-3 mt-3">
            <div class="d-flex flex-wrap gap-2 flex-row-reverse justify-content-end">
              <button type="button" class="btn btn-outline-secondary btn-sm btn-icon" data-er-toggle="theme" aria-label="Toggle theme" title="Theme">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/>
                  <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <button type="button" class="btn btn-outline-secondary btn-sm btn-icon" data-er-toggle="rtl" aria-label="Toggle RTL" title="RTL">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <path d="M4 7h10M4 12h14M4 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                  <path d="M20 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
              </button>
              <a class="btn btn-primary btn-sm" href="signup.html">Signup</a>
              <a class="btn btn-primary btn-sm" href="login.html">Login</a>
              <a class="btn btn-outline-secondary btn-sm" href="admin/index.html">Dashboard</a>
            </div>
          </div>

          <div class="d-none d-lg-flex align-items-center gap-2 ms-lg-2 flex-row-reverse">
            <button type="button" class="btn btn-outline-secondary btn-sm btn-icon" data-er-toggle="theme" title="Theme" aria-label="Toggle theme">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/>
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <button type="button" class="btn btn-outline-secondary btn-sm btn-icon" data-er-toggle="rtl" title="RTL" aria-label="Toggle RTL">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M4 7h10M4 12h14M4 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                <path d="M20 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
            </button>
            <a class="btn btn-primary btn-auth" href="signup.html">Signup</a>
            <a class="btn btn-primary btn-auth" href="login.html">Login</a>
            <a class="btn btn-outline-secondary btn-auth" href="admin/index.html">Dashboard</a>
          </div>

          <div class="d-lg-none"></div>
        </div>
      </div>
    </div>
  </nav>
</header>`;
  },

  footer() {
    return `
<footer class="footer mt-auto py-5">
  <div class="container">
    <div class="row g-4">
      <div class="col-lg-4">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="brand-mark" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 3v3M17 3v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M4 7h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z" stroke="currentColor" stroke-width="2"/>
              <path d="M8.5 12.5 10.5 14.5 15.5 9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
          <div class="brand-text"><div class="name">EventRent</div></div>
        </div>
        <p class="text-body-secondary mb-0">A professional event rental template built for fast quoting and accurate availability.</p>
      </div>
      <div class="col-sm-6 col-lg-2">
        <h3 class="h6">Links</h3>
        <ul class="list-unstyled mb-0">
          <li><a href="services.html">Services</a></li>
          <li><a href="inventory.html">Inventory</a></li>
          <li><a href="quote-builder.html">Quote Builder</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </div>
      <div class="col-sm-6 col-lg-3">
        <h3 class="h6">Contact</h3>
        <ul class="list-unstyled mb-0 text-body-secondary text-break">
          <li>support@eventrentpro.example</li>
          <li>+1 (555) 010-2026</li>
          <li>Mon-Sat • 9:00 - 18:00</li>
        </ul>
      </div>
      <div class="col-lg-3">
        <h3 class="h6">Social</h3>
        <div class="d-flex gap-2">
          <a class="btn btn-outline-secondary btn-sm btn-icon" href="#" aria-label="X">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M4 4l16 16M20 4L4 20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </a>
          <a class="btn btn-outline-secondary btn-sm btn-icon" href="#" aria-label="Instagram">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Z" stroke="currentColor" stroke-width="2"/>
              <path d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" stroke-width="2"/>
              <path d="M17.5 6.5h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
            </svg>
          </a>
          <a class="btn btn-outline-secondary btn-sm btn-icon" href="#" aria-label="LinkedIn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M6.5 9.5V18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M6.5 6.5h.01" stroke="currentColor" stroke-width="3" stroke-linecap="round"/>
              <path d="M10.5 18v-5.2c0-1.8 1.2-3.3 3-3.3s3 1.5 3 3.3V18" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M10.5 9.5V18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </a>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-2 mt-4 pt-3 border-top">
      <small class="text-body-secondary">© 2026 EventRent. All rights reserved.</small>
    </div>

    <button id="backToTop" type="button" class="btn btn-primary back-to-top btn-icon" aria-label="Back to top" title="Back to top">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 19V5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M7 10l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  </div>
</footer>`;
  }
};

ER.mountLayout = function (activeKey) {
  const headerHost = document.getElementById("siteHeader");
  const footerHost = document.getElementById("siteFooter");
  if (headerHost) headerHost.innerHTML = ER.layout.header(activeKey);
  if (footerHost) footerHost.innerHTML = ER.layout.footer();
};
