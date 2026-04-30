const state = {
  items: [],
  selected: null,
  category: "all"
};

async function loadInventory() {
  const response = await fetch("sample-inventory.json", { cache: "no-store" });
  if (!response.ok) {
    throw new Error("Unable to load sample-inventory.json");
  }
  return response.json();
}

function setText(id, value) {
  const node = document.getElementById(id);
  if (node) node.textContent = value;
}

function initials(title) {
  return title
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

function statusClass(status) {
  return `status-${status.toLowerCase().replace(/\s+/g, "-")}`;
}

function filteredItems() {
  if (state.category === "all") return state.items;
  return state.items.filter((item) => item.category === state.category);
}

function renderStats(data) {
  setText("status-label", data.demo.status_label);
  setText("total-items", state.items.length);
  setText("available-count", state.items.filter((item) => item.status === "available").length);
  setText("listed-count", state.items.filter((item) => item.status === "listed").length);
  setText("draft-count", state.items.filter((item) => item.status === "draft").length);
  setText("drafts-created", `${data.intakeMock.draftsCreated} drafts`);
  setText("intake-message", data.intakeMock.message);
}

function renderCategoryFilter() {
  const select = document.getElementById("category-filter");
  const categories = Array.from(new Set(state.items.map((item) => item.category))).sort();
  select.innerHTML = [
    `<option value="all">All categories</option>`,
    ...categories.map((category) => `<option value="${category}">${category}</option>`)
  ].join("");
}

function renderWall() {
  const wall = document.getElementById("item-wall");
  wall.innerHTML = filteredItems().map((item) => `
    <article class="item-card" data-item="${item.item_id}" style="--item-color: ${item.color}" tabindex="0">
      <div class="photo-placeholder" aria-hidden="true">${initials(item.title)}</div>
      <div class="item-body">
        <div>
          <h3>${item.title}</h3>
          <p>${item.notes}</p>
        </div>
        <div class="pills">
          <span class="pill">${item.category}</span>
          <span class="pill ${statusClass(item.status)}">${item.status}</span>
          <span class="pill">${item.condition}</span>
        </div>
      </div>
    </article>
  `).join("");
}

function renderDetail(item) {
  state.selected = item;
  setText("detail-title", item.title);
  setText("detail-notes", item.notes);
  setText("detail-category", item.category);
  setText("detail-status", item.status);
  setText("detail-condition", item.condition);
  setText("detail-updated", item.last_updated);
  setText("detail-initials", initials(item.title));
  document.getElementById("detail-placeholder").style.setProperty("--item-color", item.color);
  renderHistory(item);
}

function renderHistory(item) {
  const list = document.getElementById("history-list");
  list.innerHTML = item.history.map((event, index) => `
    <div class="history-item">
      <strong>${index + 1}. ${event}</strong>
      <span>${item.title} / ${item.last_updated}</span>
    </div>
  `).join("");
}

function bindEvents() {
  document.getElementById("category-filter").addEventListener("change", (event) => {
    state.category = event.target.value;
    renderWall();
  });

  document.getElementById("item-wall").addEventListener("click", (event) => {
    const card = event.target.closest("[data-item]");
    if (!card) return;
    const item = state.items.find((record) => record.item_id === card.dataset.item);
    if (item) renderDetail(item);
  });

  document.getElementById("item-wall").addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const card = event.target.closest("[data-item]");
    if (!card) return;
    event.preventDefault();
    const item = state.items.find((record) => record.item_id === card.dataset.item);
    if (item) renderDetail(item);
  });
}

loadInventory()
  .then((data) => {
    state.items = data.items;
    renderStats(data);
    renderCategoryFilter();
    renderWall();
    renderDetail(state.items[0]);
    bindEvents();
  })
  .catch((error) => {
    document.body.innerHTML = `
      <main class="load-error">
        <h1>Inventory OS demo could not load.</h1>
        <p>${error.message}</p>
        <p>Run this folder through a local static server so sample-inventory.json can be loaded.</p>
      </main>
    `;
  });
