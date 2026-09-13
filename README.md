<p align="center">
  <img src="klingon-translator-emblem-v1.png" alt="Klingon Translator emblem" width="230">
</p>

<h1 align="center">Klingon Translator</h1>

<p align="center"><strong>⚔️ Crossing the final frontier of language.</strong></p>

O Klingon Translator é uma extensão gratuita e de código aberto para Firefox, projetada para traduzir inglês americano (EN-US) e português brasileiro (PT-BR) para Klingon (tlhIngan Hol) a partir de um painel flutuante compacto sobre a página atual.

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

## Current status — 0.0.4

`mughwI'` now has three local layers: a verified phrasebook, a productive Klingon verb-prefix matrix, and a deliberately small EN-US / PT-BR source parser.

Examples:

- `Hello` / `Olá` → `qavan.`
- `I understand` / `Eu entendo` → `jIyaj.`
- `I see you` / `Eu vejo você` → `qalegh.`
- `You see me` / `Você me vê` → `cholegh.`
- `We see him` → `wIlegh.`
- `We see them` / `Nós vemos eles` → `DIlegh.`
- `They see him` → `lulegh.`
- `Today is a good day to die` → `Heghlu'meH QaQ jajvam.`

Unsupported constructions are still refused rather than disguised as valid tlhIngan Hol.

## Firefox / privacy readiness

The Manifest V3 package uses only `activeTab` and `scripting`, declares **no data collection**, includes a fixed Gecko add-on ID for Mozilla signing, and explicitly enables Firefox Android compatibility.

The core translator makes no network request and requires no account.

## Development

The engine tests require only Node.js — no runtime dependencies:

```bash
npm test
```

See [ROADMAP.md](ROADMAP.md), [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md), [docs/LINGUISTIC_SCOPE.md](docs/LINGUISTIC_SCOPE.md), and [docs/GRAMMAR_KERNEL.md](docs/GRAMMAR_KERNEL.md).

## Visual direction

The interface is inspired by Klingon visual language of the 24th century: dark graphite/metal, restrained Klingon red, aged metallic accents, and a custom plate incorporating the Klingon trefoil motif.

The goal is **recognizably Klingon without becoming a generic neon sci-fi UI**.

## License

Apache License 2.0. See [LICENSE](LICENSE).

## Fan-project notice

This is an independent, non-commercial fan project and is not affiliated with or endorsed by Paramount, CBS, Mozilla, or other rights holders. *Star Trek*, Klingon-related names, symbols, and associated marks remain the property of their respective owners.

**Qapla'!**
