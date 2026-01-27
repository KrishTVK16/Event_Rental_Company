document.addEventListener("DOMContentLoaded", () => {
  if (!window.ER || !document.getElementById("inventoryApp")) return;

  const dateInput = document.getElementById("invDate");
  const categorySelect = document.getElementById("invCategory");
  const tableBody = document.getElementById("invTableBody");
  const resultNote = document.getElementById("invNote");

  const today = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const iso = `${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`;
  if (dateInput && !dateInput.value) dateInput.value = iso;

  ER.categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    categorySelect.appendChild(opt);
  });

  function badgeFor(available) {
    if (available <= 0) return '<span class="badge text-bg-danger badge-status">Unavailable</span>';
    if (available <= 10) return '<span class="badge text-bg-warning badge-status">Low</span>';
    return '<span class="badge text-bg-success badge-status">Available</span>';
  }

  function render() {
    const dateStr = dateInput.value;
    const cat = categorySelect.value;
    const items = ER.inventory.filter(x => (cat === "All" || x.category === cat));

    tableBody.innerHTML = "";

    items.forEach(item => {
      const a = ER.getAvailability(dateStr, item.id);
      const avail = a ? a.available : item.stock;
      const booked = a ? a.booked : 0;
      const maintenance = a ? a.maintenance : 0;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td class="fw-semibold">${item.name}<div class="text-body-secondary small">${item.category}</div></td>
        <td>${item.unit}</td>
        <td>${item.stock}</td>
        <td>${booked}</td>
        <td>${maintenance}</td>
        <td class="fw-semibold">${avail}</td>
        <td>${badgeFor(avail)}</td>
        <td>
          <div class="small">
            <div class="fw-semibold">${ER.formatMoney(item.price)}</div>
            <div class="text-body-secondary">${item.priceType === "per_day" ? "Per day" : "Per event"}</div>
          </div>
        </td>
      `;
      tableBody.appendChild(tr);
    });

    resultNote.textContent = dateStr ? `Availability shown for ${dateStr}.` : "Select a date to see availability.";
  }

  dateInput.addEventListener("change", render);
  categorySelect.addEventListener("change", render);

  render();
});
