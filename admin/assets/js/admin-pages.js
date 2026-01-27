document.addEventListener("DOMContentLoaded", () => {
  if (!window.ER) return;

  const calendarHost = document.getElementById("availabilityCalendar");
  if (calendarHost) {
    const dateKeys = Object.keys(ER.bookings || {}).sort();
    const rows = [];

    dateKeys.forEach(dateStr => {
      const m = ER.bookings[dateStr] || {};
      const items = Object.keys(m);
      items.forEach(itemId => {
        const item = ER.inventory.find(x => x.id === itemId);
        const booked = m[itemId];
        const stock = item ? item.stock : 0;
        const maint = ER.maintenance && ER.maintenance[itemId] ? ER.maintenance[itemId] : 0;
        const available = Math.max(0, stock - booked - maint);
        rows.push({ dateStr, item: item ? item.name : itemId, booked, stock, maint, available });
      });
    });

    calendarHost.innerHTML = rows.length ? `
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Date</th>
              <th>Item</th>
              <th>Stock</th>
              <th>Booked</th>
              <th>Maintenance</th>
              <th>Available</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${rows.map(r => {
              const badge = r.available <= 0
                ? '<span class="badge text-bg-danger">Unavailable</span>'
                : (r.available <= 10 ? '<span class="badge text-bg-warning">Low</span>' : '<span class="badge text-bg-success">Available</span>');
              return `
                <tr>
                  <td>${r.dateStr}</td>
                  <td class="fw-semibold">${r.item}</td>
                  <td>${r.stock}</td>
                  <td>${r.booked}</td>
                  <td>${r.maint}</td>
                  <td class="fw-semibold">${r.available}</td>
                  <td>${badge}</td>
                </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    ` : `<div class="text-body-secondary">No booking data in demo dataset.</div>`;
  }

  const invAdminHost = document.getElementById("adminInventoryTable");
  if (invAdminHost) {
    invAdminHost.innerHTML = `
      <div class="table-responsive">
        <table class="table table-hover align-middle mb-0">
          <thead class="table-light">
            <tr>
              <th>Item</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Maintenance</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            ${ER.inventory.map(it => {
              const maint = ER.maintenance && ER.maintenance[it.id] ? ER.maintenance[it.id] : 0;
              const badge = maint > 0 ? '<span class="badge text-bg-warning">Maintenance</span>' : '<span class="badge text-bg-success">Active</span>';
              return `
                <tr>
                  <td class="fw-semibold">${it.name}</td>
                  <td>${it.category}</td>
                  <td>${it.stock}</td>
                  <td>${maint}</td>
                  <td>
                    <div class="small">
                      <div class="fw-semibold">${ER.formatMoney(it.price)}</div>
                      <div class="text-body-secondary">${it.priceType === "per_day" ? "Per day" : "Per event"}</div>
                    </div>
                  </td>
                  <td>${badge}</td>
                </tr>`;
            }).join("")}
          </tbody>
        </table>
      </div>
    `;
  }
});
