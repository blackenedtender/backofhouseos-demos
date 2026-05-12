(function () {
  const moduleButtons = Array.from(document.querySelectorAll(".module-entry"));
  const pathButtons = Array.from(document.querySelectorAll(".path-step"));
  const mobilePreview = document.getElementById("mobile-preview");
  const preview = {
    title: document.getElementById("preview-title"),
    layer: document.getElementById("preview-layer"),
    status: document.getElementById("preview-status"),
    proves: document.getElementById("preview-proves"),
    private: document.getElementById("preview-private"),
    evidence: document.getElementById("preview-evidence"),
    link: document.getElementById("preview-link"),
    held: document.getElementById("preview-held"),
  };

  if (!moduleButtons.length || !preview.title) return;

  function setStatusClass(status) {
    preview.status.className = "preview-status";
    preview.status.classList.add(`status-${status.toLowerCase()}`);
  }

  function setActiveButton(id) {
    moduleButtons.forEach((button) => {
      const active = button.dataset.module === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    pathButtons.forEach((button) => {
      const active = button.dataset.module === id;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });
  }

  function renderEvidence(button) {
    const bullets = [
      button.dataset.proofOne,
      button.dataset.proofTwo,
      button.dataset.proofThree,
    ].filter(Boolean);

    preview.evidence.replaceChildren(
      ...bullets.map((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        return li;
      }),
    );
  }

  function renderMobilePreview(button) {
    if (!mobilePreview) return;

    const status = button.dataset.status || "REVIEW";
    const route = button.dataset.route || "";
    const bullets = [
      button.dataset.proofOne,
      button.dataset.proofTwo,
      button.dataset.proofThree,
    ].filter(Boolean);

    const card = document.createElement("div");
    card.className = "mobile-preview-card";

    const head = document.createElement("div");
    head.className = "preview-head";

    const titleWrap = document.createElement("div");
    const title = document.createElement("h3");
    title.textContent = button.dataset.name || "";
    const layer = document.createElement("p");
    layer.textContent = button.dataset.layer || "";
    titleWrap.append(title, layer);

    const statusEl = document.createElement("span");
    statusEl.className = `preview-status status-${status.toLowerCase()}`;
    statusEl.textContent = status;
    head.append(titleWrap, statusEl);

    const proves = document.createElement("p");
    proves.textContent = button.dataset.proves || "";

    const list = document.createElement("ul");
    bullets.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      list.append(li);
    });

    const boundary = document.createElement("p");
    boundary.textContent = button.dataset.private || "";

    const actionWrap = document.createElement("div");
    actionWrap.className = "preview-actions";
    if (route) {
      const link = document.createElement("a");
      link.className = "text-action primary";
      link.href = route;
      link.textContent = "Enter room";
      actionWrap.append(link);
    } else {
      const held = document.createElement("span");
      held.className = "held-state";
      held.textContent = "Implementation held";
      actionWrap.append(held);
    }

    card.append(head, proves, list, boundary, actionWrap);
    mobilePreview.replaceChildren(card);
    mobilePreview.hidden = false;
    mobilePreview.classList.add("is-open");
    button.after(mobilePreview);
  }

  function updatePreview(button) {
    const status = button.dataset.status || "REVIEW";
    const route = button.dataset.route || "";

    preview.title.textContent = button.dataset.name || "";
    preview.layer.textContent = button.dataset.layer || "";
    preview.status.textContent = status;
    setStatusClass(status);
    preview.proves.textContent = button.dataset.proves || "";
    preview.private.textContent = button.dataset.private || "";
    renderEvidence(button);

    if (route) {
      preview.link.hidden = false;
      preview.link.href = route;
      preview.link.textContent = "Enter room";
      preview.held.hidden = true;
    } else {
      preview.link.hidden = true;
      preview.link.removeAttribute("href");
      preview.held.hidden = false;
    }

    setActiveButton(button.dataset.module);
    renderMobilePreview(button);
  }

  function findModule(id) {
    return moduleButtons.find((button) => button.dataset.module === id);
  }

  moduleButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
    button.addEventListener("focus", () => updatePreview(button));
    button.addEventListener("pointerenter", (event) => {
      if (event.pointerType === "mouse" || event.pointerType === "pen") updatePreview(button);
    });
    button.addEventListener("click", () => updatePreview(button));
  });

  pathButtons.forEach((button) => {
    button.setAttribute("aria-pressed", button.classList.contains("is-active") ? "true" : "false");
    button.addEventListener("focus", () => {
      const target = findModule(button.dataset.module);
      if (target) updatePreview(target);
    });
    button.addEventListener("click", () => {
      const target = findModule(button.dataset.module);
      if (target) updatePreview(target);
    });
  });

  updatePreview(moduleButtons.find((button) => button.classList.contains("is-active")) || moduleButtons[0]);
})();
