/*
 * Floating page overlay for Klingon Translator
 * SPDX-License-Identifier: Apache-2.0
 */

(() => {
  const HOST_ID = "klingon-translator-host";
  const existing = document.getElementById(HOST_ID);

  if (existing) {
    const existingInput = existing.shadowRoot?.querySelector("#kt-input");
    existing.style.display = "block";
    existingInput?.focus();
    return;
  }

  const host = document.createElement("div");
  host.id = HOST_ID;
  host.style.position = "fixed";
  host.style.top = "72px";
  host.style.right = "12px";
  host.style.zIndex = "2147483647";
  host.style.width = "min(410px, calc(100vw - 24px))";
  host.style.maxWidth = "calc(100vw - 24px)";
  host.style.margin = "0";
  host.style.padding = "0";

  const shadow = host.attachShadow({ mode: "open" });

  const style = document.createElement("style");
  style.textContent = `
    :host { all: initial; }
    * { box-sizing: border-box; }
    .panel {
      overflow: hidden;
      border: 1px solid #6e6254;
      border-top: 3px solid #872c2c;
      border-radius: 8px;
      background: linear-gradient(145deg, #17191a, #222526);
      color: #eee7dc;
      font: 14px/1.4 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      box-shadow: 0 18px 48px rgba(0, 0, 0, .55);
    }
    .header {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 10px 9px 12px;
      background: linear-gradient(180deg, #2b2d2d, #1c1e1f);
      border-bottom: 1px solid #514940;
      cursor: grab;
      touch-action: none;
      user-select: none;
    }
    .header:active { cursor: grabbing; }
    .mark {
      width: 9px;
      height: 28px;
      transform: skew(-14deg);
      background: #8b3030;
      box-shadow: 10px 0 0 #4e2424;
      flex: 0 0 19px;
    }
    .titles { min-width: 0; flex: 1; }
    .title {
      margin: 0;
      font-size: 15px;
      font-weight: 750;
      letter-spacing: .055em;
      text-transform: uppercase;
    }
    .subtitle {
      margin-top: 1px;
      color: #aaa096;
      font-size: 11px;
      letter-spacing: .04em;
    }
    .close {
      width: 34px;
      height: 34px;
      border: 1px solid transparent;
      border-radius: 6px;
      background: transparent;
      color: #e5ddd1;
      font-size: 22px;
      line-height: 1;
      cursor: pointer;
    }
    .close:hover, .close:focus-visible {
      outline: none;
      border-color: #7d3434;
      background: #3b2424;
    }
    .body { padding: 12px; }
    .toolbar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-bottom: 9px;
    }
    label {
      color: #bdb4a8;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: .05em;
      text-transform: uppercase;
    }
    select {
      border: 1px solid #5b544d;
      border-radius: 5px;
      background: #111314;
      color: #eee7dc;
      padding: 7px 9px;
      font: inherit;
    }
    textarea {
      display: block;
      width: 100%;
      min-height: 98px;
      resize: vertical;
      border: 1px solid #57514a;
      border-radius: 6px;
      background: #0f1112;
      color: #f3ede4;
      padding: 10px;
      font: 14px/1.45 system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      caret-color: #b44848;
    }
    textarea:focus, select:focus {
      outline: 2px solid rgba(156, 57, 57, .55);
      outline-offset: 1px;
    }
    .direction {
      margin: 10px 0 5px;
      color: #978e83;
      font-size: 11px;
      letter-spacing: .04em;
      text-transform: uppercase;
    }
    .output {
      min-height: 66px;
      border-left: 3px solid #853232;
      background: #151718;
      padding: 10px;
      white-space: pre-wrap;
      overflow-wrap: anywhere;
    }
    .output.placeholder { color: #867f77; }
    .footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      margin-top: 11px;
    }
    .status {
      color: #867e74;
      font-size: 10px;
      letter-spacing: .065em;
      text-transform: uppercase;
    }
    .copy {
      border: 1px solid #704141;
      border-radius: 5px;
      background: #682b2b;
      color: #fff4eb;
      padding: 7px 13px;
      font: 700 12px/1.2 system-ui, sans-serif;
      letter-spacing: .035em;
      text-transform: uppercase;
      cursor: pointer;
    }
    .copy:disabled {
      opacity: .42;
      cursor: default;
    }
    @media (max-width: 520px) {
      .panel { border-radius: 7px; }
      .body { padding: 10px; }
    }
  `;

  const panel = document.createElement("section");
  panel.className = "panel";
  panel.setAttribute("role", "dialog");
  panel.setAttribute("aria-label", "Klingon Translator");

  const header = document.createElement("header");
  header.className = "header";

  const mark = document.createElement("div");
  mark.className = "mark";
  mark.setAttribute("aria-hidden", "true");

  const titles = document.createElement("div");
  titles.className = "titles";
  const title = document.createElement("h2");
  title.className = "title";
  title.textContent = "Klingon Translator";
  const subtitle = document.createElement("div");
  subtitle.className = "subtitle";
  subtitle.textContent = "mughwI' · local translation console";
  titles.append(title, subtitle);

  const closeButton = document.createElement("button");
  closeButton.className = "close";
  closeButton.type = "button";
  closeButton.setAttribute("aria-label", "Close Klingon Translator");
  closeButton.textContent = "×";

  header.append(mark, titles, closeButton);

  const body = document.createElement("div");
  body.className = "body";

  const toolbar = document.createElement("div");
  toolbar.className = "toolbar";
  const sourceLabel = document.createElement("label");
  sourceLabel.htmlFor = "kt-language";
  sourceLabel.textContent = "Source";
  const language = document.createElement("select");
  language.id = "kt-language";
  language.innerHTML = '<option value="en-US">English (US)</option><option value="pt-BR">Português (BR)</option>';
  toolbar.append(sourceLabel, language);

  const input = document.createElement("textarea");
  input.id = "kt-input";
  input.placeholder = "Type a phrase, expression, or sentence…";
  input.setAttribute("aria-label", "Text to translate into Klingon");
  input.spellcheck = true;

  const direction = document.createElement("div");
  direction.className = "direction";
  direction.textContent = "→ tlhIngan Hol";

  const output = document.createElement("div");
  output.className = "output placeholder";
  output.setAttribute("aria-live", "polite");
  output.textContent = "mughwI' linguistic engine is being assembled.";

  const footer = document.createElement("div");
  footer.className = "footer";
  const status = document.createElement("div");
  status.className = "status";
  status.textContent = "LOCAL · OFFLINE · ZERO TELEMETRY";
  const copy = document.createElement("button");
  copy.className = "copy";
  copy.type = "button";
  copy.textContent = "Copy";
  copy.disabled = true;
  footer.append(status, copy);

  body.append(toolbar, input, direction, output, footer);
  panel.append(header, body);
  shadow.append(style, panel);
  document.documentElement.append(host);

  let debounceTimer;
  function renderTranslation() {
    const result = globalThis.KlingonTranslatorEngine?.translate({
      text: input.value,
      sourceLanguage: language.value
    });

    if (!input.value.trim()) {
      output.className = "output placeholder";
      output.textContent = "mughwI' linguistic engine is being assembled.";
      copy.disabled = true;
      return;
    }

    if (result?.ok && result.text) {
      output.className = "output";
      output.textContent = result.text;
      copy.disabled = false;
      return;
    }

    output.className = "output placeholder";
    output.textContent = result?.message ?? "Translation engine unavailable.";
    copy.disabled = true;
  }

  input.addEventListener("input", () => {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(renderTranslation, 300);
  });
  language.addEventListener("change", renderTranslation);

  closeButton.addEventListener("click", () => host.remove());
  copy.addEventListener("click", async () => {
    if (!output.textContent || copy.disabled) return;
    await navigator.clipboard.writeText(output.textContent);
    const previous = copy.textContent;
    copy.textContent = "Copied";
    setTimeout(() => { copy.textContent = previous; }, 900);
  });

  let drag = null;
  header.addEventListener("pointerdown", (event) => {
    if (event.target === closeButton || closeButton.contains(event.target)) return;
    const rect = host.getBoundingClientRect();
    drag = {
      pointerId: event.pointerId,
      offsetX: event.clientX - rect.left,
      offsetY: event.clientY - rect.top
    };
    header.setPointerCapture(event.pointerId);
  });

  header.addEventListener("pointermove", (event) => {
    if (!drag || event.pointerId !== drag.pointerId) return;
    const width = host.getBoundingClientRect().width;
    const x = Math.max(6, Math.min(window.innerWidth - width - 6, event.clientX - drag.offsetX));
    const y = Math.max(6, Math.min(window.innerHeight - 54, event.clientY - drag.offsetY));
    host.style.left = `${x}px`;
    host.style.top = `${y}px`;
    host.style.right = "auto";
  });

  function stopDrag(event) {
    if (drag && event.pointerId === drag.pointerId) {
      drag = null;
    }
  }
  header.addEventListener("pointerup", stopDrag);
  header.addEventListener("pointercancel", stopDrag);

  input.focus();
})();
