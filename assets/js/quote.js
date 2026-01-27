document.addEventListener("DOMContentLoaded", () => {
  if (!window.ER || !document.getElementById("quoteApp")) return;

  const dateInput = document.getElementById("qbDate");
  const addBtn = document.getElementById("qbAddItem");
  const rowsHost = document.getElementById("qbRows");

  const transportInput = document.getElementById("qbTransport");
  const discountInput = document.getElementById("qbDiscount");

  const summaryHost = document.getElementById("qbSummary");
  const issuesHost = document.getElementById("qbIssues");

  const pad = (n) => String(n).padStart(2, "0");
  const today = new Date();
  const iso = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
  if (dateInput && !dateInput.value) dateInput.value = iso;

  function itemOptions(selectedId) {
    return ER.inventory.map(it => {
      const sel = it.id === selectedId ? "selected" : "";
      return `<option value="${it.id}" ${sel}>${it.name} — ${ER.formatMoney(it.price)} (${it.priceType === "per_day" ? "Per day" : "Per event"})</option>`;
    }).join("");
  }

  function addRow(initialId) {
    const row = document.createElement("div");
    row.className = "row g-2 align-items-end border rounded-3 p-2 mb-2";

    row.innerHTML = `
      <div class="col-lg-6">
        <label class="form-label">Item</label>
        <select class="form-select" data-qb="item">
          <option value="">Select an item</option>
          ${itemOptions(initialId || "")}
        </select>
      </div>
      <div class="col-6 col-lg-2">
        <label class="form-label">Qty</label>
        <input class="form-control" data-qb="qty" type="number" min="1" step="1" placeholder="0" />
      </div>
      <div class="col-6 col-lg-2">
        <div class="form-label">Available</div>
        <div class="fw-semibold" data-qb="avail">—</div>
      </div>
      <div class="col-lg-2 d-grid">
        <button type="button" class="btn btn-outline-danger" data-qb="remove">Remove</button>
      </div>
      <div class="col-12">
        <div class="small text-body-secondary" data-qb="meta"></div>
      </div>
    `;

    row.querySelector("[data-qb='remove']").addEventListener("click", () => {
      row.remove();
      recalc();
    });

    row.querySelector("[data-qb='item']").addEventListener("change", recalc);
    row.querySelector("[data-qb='qty']").addEventListener("input", recalc);

    rowsHost.appendChild(row);
    recalc();
  }

  function getRows() {
    return Array.from(rowsHost.querySelectorAll(".row")).map(row => {
      const itemId = row.querySelector("[data-qb='item']").value;
      const qty = Number(row.querySelector("[data-qb='qty']").value || 0);
      return { row, itemId, qty };
    });
  }

  function recalc() {
    const dateStr = dateInput.value;
    const rows = getRows();

    let subtotal = 0;
    const issues = [];

    rows.forEach(({ row, itemId, qty }, idx) => {
      const availEl = row.querySelector("[data-qb='avail']");
      const metaEl = row.querySelector("[data-qb='meta']");

      if (!itemId) {
        availEl.textContent = "—";
        metaEl.textContent = "";
        return;
      }

      const item = ER.inventory.find(x => x.id === itemId);
      const a = ER.getAvailability(dateStr, itemId);
      const available = a ? a.available : item.stock;

      availEl.textContent = String(available);
      metaEl.textContent = `${item.category} • ${item.priceType === "per_day" ? "Per day" : "Per event"} • Unit: ${item.unit}`;

      if (qty <= 0) {
        issues.push(`Row ${idx + 1}: Enter a quantity for ${item.name}.`);
        return;
      }

      if (available < qty) {
        issues.push(`Row ${idx + 1}: ${item.name} only has ${available} available for ${dateStr}.`);
      }

      subtotal += qty * item.price;
    });

    const transport = Number(transportInput.value || 0);
    const discount = Number(discountInput.value || 0);

    const taxable = Math.max(0, subtotal + transport - discount);
    const tax = taxable * (ER.taxRate || 0);
    const total = taxable + tax;

    issuesHost.innerHTML = issues.length
      ? `<div class="alert alert-warning mb-0"><div class="fw-semibold mb-1">Availability / Validation</div><ul class="mb-0">${issues.map(x => `<li>${x}</li>`).join("")}</ul></div>`
      : `<div class="alert alert-success mb-0"><div class="fw-semibold">Ready</div><div class="small">All items are within available stock for the selected date.</div></div>`;

    summaryHost.innerHTML = `
      <div class="d-flex justify-content-between"><span>Subtotal</span><span class="fw-semibold">${ER.formatMoney(subtotal)}</span></div>
      <div class="d-flex justify-content-between"><span>Transport</span><span class="fw-semibold">${ER.formatMoney(transport)}</span></div>
      <div class="d-flex justify-content-between"><span>Discount</span><span class="fw-semibold">-${ER.formatMoney(discount)}</span></div>
      <div class="d-flex justify-content-between"><span>Tax (${Math.round((ER.taxRate || 0) * 100)}%)</span><span class="fw-semibold">${ER.formatMoney(tax)}</span></div>
      <hr class="my-2" />
      <div class="d-flex justify-content-between"><span class="h6 mb-0">Total</span><span class="h5 mb-0">${ER.formatMoney(total)}</span></div>
    `;

    const printBtn = document.getElementById("qbPrint");
    if (printBtn) {
      printBtn.disabled = issues.length > 0 || rows.length === 0 || rows.every(r => !r.itemId);
    }
  }

  dateInput.addEventListener("change", recalc);
  transportInput.addEventListener("input", recalc);
  discountInput.addEventListener("input", recalc);
  addBtn.addEventListener("click", () => addRow(""));

  document.getElementById("qbPrint").addEventListener("click", () => {
    recalc();
    window.print();
  });

  addRow("chairs-banquet");
});
