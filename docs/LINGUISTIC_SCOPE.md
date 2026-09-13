# Linguistic scope

Klingon Translator is being built in layers. Version 0.0.4 still intentionally does **not** claim unrestricted free-form Klingon generation.

## Current engine modes

`mughwI'` now has three local translation paths:

1. **Verified phrasebook** — checked expressions resolve directly to known tlhIngan Hol forms.
2. **Grammar kernel** — productive subject/object verb-prefix composition.
3. **Controlled source parser** — a small EN-US / PT-BR parser maps supported pronoun clauses to semantic person/number features before Klingon morphology is generated.

## Current productive examples

- `I understand` / `Eu entendo` → `jIyaj.`
- `I see you` / `Eu vejo você` → `qalegh.`
- `You see me` / `Você me vê` → `cholegh.`
- `We see him` → `wIlegh.`
- `We see them` / `Nós vemos eles` → `DIlegh.`
- `They see him` → `lulegh.`
- `They see them` → `legh.`

Phrasebook expressions such as `qavan.`, `Qapla'!`, and `Heghlu'meH QaQ jajvam.` remain available.

## Refusal behavior

If an input has neither a verified phrase match nor a supported grammar/parser path, the engine refuses to guess. Reflexive combinations such as `I see me` are intentionally rejected until the relevant suffix rules are implemented.

## Provenance

The initial phrase seed is checked against the open-source **De7vID/klingon-assistant** project. Grammar rules are checked against public **Klingon Language Institute** instructional material describing basic sentence structure, verb prefixes, and the `lu-` contrast.

See [GRAMMAR_KERNEL.md](GRAMMAR_KERNEL.md) and [../THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).

## What comes next

The full pipeline remains:

`source-language analysis → neutral semantic representation → Klingon word order + morphology → verified output metadata`

Before broad translation claims are enabled, verb suffix classes, noun morphology, richer clause structure, ambiguity handling, lexical expansion, and larger regression suites must be implemented.
