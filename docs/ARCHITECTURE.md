# Architecture

## Design principles

Klingon Translator is intentionally small. The extension should earn every permission, dependency, and background activity it introduces.

### 1. Explicit activation

The extension does not inject a permanent content script into every website. A browser `action` click grants temporary `activeTab` access and the background script injects the translator only into the page the user explicitly selected.

### 2. Floating overlay

The user interface is created inside a Shadow DOM host. This isolates the translator's styles from the page and prevents most page CSS from corrupting the UI. The overlay is not a new browser tab and is not tied to Firefox's transient extension popup lifecycle.

### 3. Local-first translation

The internal Klingon engine is codenamed `mughwI'`. The planned pipeline is:

`EN-US / PT-BR input → linguistic analysis → neutral intermediate representation → Klingon morphology + syntax → tlhIngan Hol output`

The project will not label naive word-for-word substitution as valid Klingon translation.

### 4. Linguistic provenance

Lexical and grammatical data should retain source/provenance information wherever practical. The UI may later distinguish canonical vocabulary, high-confidence grammatical generation, and constructed/paraphrased output.

### 5. Privacy

The default engine must not require a remote server, account, analytics endpoint, or telemetry system. Any future external provider must be optional and visibly separate from the local engine.

## Initial module map

- `src/background/main.js` — handles the Firefox action and one-shot script injection.
- `src/content/overlay.js` — creates the draggable Shadow DOM translator panel.
- `src/translator/engine.js` — entry point for the future local linguistic engine.
- `icons/` — project identity and browser action artwork.

## Firefox-specific note

Firefox Manifest V3 currently retains background scripts rather than Chrome-style extension service workers. The project intentionally follows Firefox's WebExtension implementation because Firefox Mobile/Desktop are the primary targets.
