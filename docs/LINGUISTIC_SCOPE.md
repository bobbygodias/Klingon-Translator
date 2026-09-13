# Linguistic scope

Klingon Translator is being built in layers. Version 0.0.3 still intentionally does **not** claim free-form Klingon generation.

## Current engine modes

`mughwI'` now has two local translation paths:

1. **Verified phrasebook** — exact normalized source phrases resolve to checked tlhIngan Hol forms.
2. **Grammar kernel** — a small productive morphology layer composes verified no-object verb prefixes with a verified verb root.

The current productive slice supports:

- `jI-` — first-person singular subject, no object
- `bI-` — second-person singular subject, no object
- `ma-` — first-person plural subject, no object
- `Su-` — second-person plural subject, no object
- null prefix — third-person subject, no object

The grammar module also exposes an Object–Verb–Subject clause composer for the next parser milestone.

## Current examples

- `I understand` / `Eu entendo` → `jIyaj.`
- `You understand` / `Você entende` → `bIyaj.`
- `We understand` / `Nós entendemos` → `mayaj.`
- `You all understand` / `Vocês entendem` → `Suyaj.`

Phrasebook examples such as `qavan.`, `Qapla'!`, and `Heghlu'meH QaQ jajvam.` remain available.

## Refusal behavior

If an input has neither a verified phrase match nor a supported grammar path, the engine refuses to guess. This is deliberate: output should not be presented as valid tlhIngan Hol until its morphology and syntax are covered by implemented rules and tests.

## Provenance

The initial phrase seed is checked against the open-source **De7vID/klingon-assistant** project. The first grammar rules are checked against the **Klingon Language Institute** instructional material describing basic sentence structure and verb prefixes.

See [GRAMMAR_KERNEL.md](GRAMMAR_KERNEL.md) and [../THIRD_PARTY_NOTICES.md](../THIRD_PARTY_NOTICES.md).

## What comes next

The phrasebook is a bootstrap layer and the current grammar kernel is only the first productive slice. The full `mughwI'` pipeline remains:

`source-language analysis → neutral semantic representation → Klingon word order + morphology → verified output metadata`

Before broad translation claims are enabled, the complete verb-prefix matrix, verb suffix classes, noun morphology, clause structure, ambiguity handling, and larger regression suites must be implemented.
