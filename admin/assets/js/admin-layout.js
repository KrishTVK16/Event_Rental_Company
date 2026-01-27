window.ER = window.ER || {};

ER.adminLayout = {
  sidebar(active) {
    const isActive = (k) => (active === k ? "active" : "");

    return `
<div class="admin-sidebar p-3" id="adminSidebar" aria-label="Admin sidebar">
  <a class="d-flex align-items-center gap-2 text-decoration-none mb-3 brand-link" href="../index.html">
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

  <div class="d-flex flex-wrap gap-2 mb-3">
    <button type="button" class="btn btn-outline-secondary btn-sm btn-icon" data-er-toggle="rtl" aria-label="Toggle RTL" title="RTL">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M4 7h10M4 12h14M4 17h10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M20 7v10" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
    <button type="button" class="btn btn-outline-secondary btn-sm btn-icon" data-er-toggle="theme" aria-label="Toggle theme" title="Theme">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" stroke="currentColor" stroke-width="2"/>
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </button>
  </div>

  <nav class="nav nav-pills flex-column gap-1">
    <a class="nav-link ${isActive("overview")}" href="index.html">Overview</a>
    <a class="nav-link ${isActive("inventory")}" href="inventory.html">Inventory Management</a>
    <a class="nav-link ${isActive("calendar")}" href="availability-calendar.html">Availability Calendar</a>
    <a class="nav-link ${isActive("quotes")}" href="quotes.html">Quote Management</a>
    <a class="nav-link ${isActive("bookings")}" href="bookings.html">Orders / Bookings</a>
    <a class="nav-link ${isActive("customers")}" href="customers.html">Customers</a>
    <a class="nav-link ${isActive("payments")}" href="payments.html">Payments</a>
    <a class="nav-link ${isActive("reports")}" href="reports.html">Reports</a>
  </nav>
</div>`;
  },

  topbar(title) {
    return `
<div class="admin-topbar bg-body p-3">
  <div class="container-fluid px-0">
    <div class="d-flex align-items-center justify-content-between gap-2">
      <div class="d-flex align-items-center gap-2">
        <button class="btn btn-outline-secondary d-lg-none" type="button" id="adminSidebarToggle" aria-label="Toggle sidebar">Menu</button>
        <div>
          <div class="fw-semibold">${title || "Dashboard"}</div>
          <div class="small text-body-secondary">Fast operations • clear visibility</div>
        </div>
      </div>
      <div class="d-flex align-items-center gap-2">
        <a class="btn btn-outline-secondary" href="../index.html" role="button">Logout</a>
        <a class="btn btn-outline-secondary" href="../quote-builder.html">Build Quote</a>
      </div>
    </div>
  </div>
</div>`;
  }
};

ER.mountAdmin = function (activeKey, title) {
  const sidebarHost = document.getElementById("adminSidebarHost");
  const topbarHost = document.getElementById("adminTopbarHost");

  if (sidebarHost) sidebarHost.innerHTML = ER.adminLayout.sidebar(activeKey);
  if (topbarHost) topbarHost.innerHTML = ER.adminLayout.topbar(title);

  const toggle = document.getElementById("adminSidebarToggle");
  const sidebar = document.getElementById("adminSidebar");

  if (toggle && sidebar) {
    toggle.addEventListener("click", () => {
      sidebar.classList.toggle("show");
    });
  }
};
