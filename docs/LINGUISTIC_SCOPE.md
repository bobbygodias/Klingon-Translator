# Linguistic scope

Klingon Translator is being built in layers. Version 0.0.2 intentionally does **not** claim free-form Klingon generation.

## Current engine mode

The first functional milestone uses a small verified phrasebook to prove the complete browser-extension path:

`EN-US / PT-BR input → local normalization → verified phrase match → tlhIngan Hol output`

If a phrase is not in the verified set, the engine refuses to guess. This lets the UI, copy flow, privacy model, and testing harness become real before the morphology and syntax generator is broad enough for arbitrary sentences.

## Seed provenance

The initial Klingon forms are checked against the open-source **De7vID/klingon-assistant** project, licensed under Apache-2.0. The seed currently references:

- `scripts/pairs/manual/common_expressions.txt`
- `scripts/pairs/manual/today_is_a_good_day.txt`
- `scripts/pairs/official/movie_dialogue.txt`

Portuguese entries in the seed are semantic aliases created by Klingon Translator that resolve to those verified Klingon expressions.

## What 0.0.2 can do

Examples include:

- `Hello` / `Olá` → `qavan.`
- `Success` / `Sucesso` → `Qapla'!`
- `I understand` / `Eu entendo` → `jIyaj.`
- `Today is a good day to die` / `Hoje é um bom dia para morrer` → `Heghlu'meH QaQ jajvam.`

## What comes next

The phrasebook is a bootstrap layer, not the final translator. The full `mughwI'` pipeline remains:

`source-language analysis → neutral semantic representation → Klingon word order + morphology → verified output metadata`

Before broad translation claims are enabled, noun morphology, verb prefixes/suffixes, clause structure, ambiguity handling, and regression tests must be implemented.
