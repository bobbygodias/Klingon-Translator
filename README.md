<p align="center">
  <img src="klingon-translator-emblem-v1.png" alt="Klingon Translator emblem" width="230">
</p>

<h1 align="center">Klingon Translator</h1>

<p align="center"><strong>⚔️ Crossing the final frontier of language.</strong></p>

O Klingon Translator é uma extensão gratuita e de código aberto para Firefox, projetada para traduzir inglês americano (EN-US) e português brasileiro (PT-BR) para klingon (tlhIngan Hol) a partir de um painel flutuante compacto sobre a página atual.

* Klingon Translator is a free and open-source Firefox extension designed to translate **American English (EN-US)** and **Brazilian Portuguese (PT-BR)** into **Klingon (tlhIngan Hol)** from a compact floating panel over the current page.

O projeto está sendo desenvolvido inicialmente para Firefox Mobile (Android) e Firefox Desktop, com forte ênfase no processamento local, baixo consumo de recursos, privacidade e comportamento linguístico transparente.

* The project is being designed first for **Firefox Mobile (Android)** and **Firefox Desktop**, with a strong preference for local processing, low resource usage, privacy, and transparent linguistic behavior.

## Mission

- EN-US → Klingon
- PT-BR → Klingon
- Floating translator panel; no extra tab required
- Local-first / offline-first translation engine
- Zero telemetry
- No account or login
- Minimal permissions
- Lightweight WebExtension
- Free and open source

## Interaction model

The user activates **Klingon Translator** from the browser action. The extension injects a self-contained floating panel into the active page. The panel remains over the page until the user closes it, allowing text to be entered, translated, copied, and pasted elsewhere without navigating away.

The internal translation engine is codenamed **`mughwI'`** (Klingon for “translator”).

## Current status — 0.0.2

The extension now has a functional end-to-end translation path. `mughwI'` starts with a deliberately small verified phrasebook for EN-US and PT-BR while the full Klingon morphology/syntax engine is being built.

Examples:

- `Hello` / `Olá` → `qavan.`
- `Success` / `Sucesso` → `Qapla'!`
- `I understand` / `Eu entendo` → `jIyaj.`
- `Today is a good day to die` → `Heghlu'meH QaQ jajvam.`

Unknown sentences are refused instead of being disguised as valid Klingon. See [docs/LINGUISTIC_SCOPE.md](docs/LINGUISTIC_SCOPE.md) for the current linguistic boundary and provenance.

## Privacy by design

Klingon Translator should not receive permanent access to every website merely to provide an on-demand tool. The initial architecture therefore uses Firefox's `activeTab` + `scripting` permissions and injects the interface only after an explicit user action.

The core translator is intended to work locally. Optional external translation providers, if ever supported, must remain strictly optional and clearly disclosed.

## Development

The current engine tests require only Node.js — no runtime dependencies:

```bash
npm test
```

See [ROADMAP.md](ROADMAP.md) for planned milestones and [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for technical decisions.

## Visual direction

The interface is inspired by Klingon visual language of the 24th century: dark graphite/metal, restrained Klingon red, aged metallic accents, and a custom plate incorporating the Klingon trefoil motif.

The goal is **recognizably Klingon without becoming a generic neon sci-fi UI**.

## License

Apache License 2.0. See [LICENSE](LICENSE).

## Fan-project notice

This is an independent, non-commercial fan project and is not affiliated with or endorsed by Paramount, CBS, Mozilla, or other rights holders. *Star Trek*, Klingon-related names, symbols, and associated marks remain the property of their respective owners.

**Qapla'!**
