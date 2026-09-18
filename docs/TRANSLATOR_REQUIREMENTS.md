# Klingon Translator — 0.0.5 / 0.1 Translation Requirements

## Product invariant

Klingon Translator must behave like a translator, not like a phrasebook.

A user should be able to type ordinary EN-US or PT-BR text and receive the best valid Klingon rendering the local engine can produce.

When a literal equivalent does not exist, the engine should preserve meaning through a natural Klingon paraphrase or semantic approximation using attested vocabulary and valid grammar.

The normal user-facing result must not be a refusal merely because the exact source sentence was not pre-registered.

## Non-fabrication rule

`mughwI'` must not invent Klingon vocabulary.

"Do not guess" means:

- do not fabricate unattested Klingon words;
- do not claim unsupported grammar is canonical;
- do not hide uncertainty.

It does **not** mean:

- refuse every sentence not found in a phrase table;
- require exact capitalization or punctuation;
- abandon a translatable concept when a valid paraphrase exists.

## Output confidence

The engine may classify a result internally and expose this unobtrusively in the UI:

1. **Canonical** — attested phrase/expression or directly sourced lexical construction.
2. **Constructed** — generated from attested vocabulary and verified Klingon grammar.
3. **Approximate** — semantic paraphrase used because the source concept has no direct Klingon equivalent.

All three are legitimate translation outputs.

## Required source behavior

- EN-US -> tlhIngan Hol
- PT-BR -> tlhIngan Hol
- Case-insensitive input.
- Accent/punctuation tolerant normalization.
- Continuous typing without focus loss.
- IME/composition-safe input.
- Paste/cut/copy must work normally.
- Automatic source-language detection should become the default, with manual EN-US / PT-BR override.
- Offline/local-first.
- Zero telemetry.
- No account requirement.

## Current 0.0.4 defects confirmed during real-world use

1. Input focus may be lost after individual keystrokes, forcing the user to click the text box repeatedly.
2. Runtime behavior appeared case-sensitive to the user even though the engine normalizer is designed to be case-insensitive.
3. The translation engine recognizes only a very small phrasebook and a tiny productive grammar subset.
4. Unsupported sentences normally return:
   `No verified translation path yet — mughwI' will not guess.`
5. The floating panel is tied to the lifetime of the host page/document and can disappear when that document is replaced or discarded.
6. Manual source-language selection makes valid input fail when the wrong language remains selected.

## 0.0.5 stabilization target

Before expanding the linguistic engine:

- stabilize textarea focus and cursor behavior;
- isolate editor events from host-page keyboard handlers;
- respect composition events;
- add normalization regression tests;
- reproduce on Firefox Desktop and Firefox Android.

## 0.1 productive translator target

Planned pipeline:

`source text -> language detection -> source parsing -> semantic/intermediate representation -> Klingon lexical selection -> Klingon morphology/syntax -> confidence/provenance -> output`

A phrasebook remains useful as a high-confidence fast path, but it must no longer define the limits of the translator.

## Core principle

**mughwI' translates. It does not fabricate tlhIngan Hol.**
