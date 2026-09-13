# Grammar kernel

Version 0.0.4 expands `src/translator/grammar.js` from no-object prefixes into the basic pronominal subject/object prefix matrix used by the current productive translator.

## Implemented

The kernel now supports the major basic prefix contrasts documented by the Klingon Language Institute, including:

- no-object forms such as `jI-`, `bI-`, `ma-`, `Su-`, and the null prefix
- `qa-` — I → you (singular)
- `Sa-` — I → you (plural)
- `cho-` — you (singular) → me
- `ju-` — you (singular) → us
- `pI-` / `re-` — we → you
- `wI-` / `DI-` — we → singular/plural third-person object
- `tu-` / `che-` / `bo-` — you (plural) with several object classes
- `mu-`, `Du-`, `nI-`, `nu-`, `lI-` — third-person subject combinations
- `lu-` — third-person plural subject → third-person singular object

The generic Object–Verb–Subject composer remains available for future noun-phrase generation.

## Productive examples

With `legh` (see):

- `qa` + `legh` → `qalegh` — I see you
- `cho` + `legh` → `cholegh` — you see me
- `wI` + `legh` → `wIlegh` — we see him/her/it
- `DI` + `legh` → `DIlegh` — we see them
- `lu` + `legh` → `lulegh` — they see him/her/it

## Sources checked

- `https://www.kli.org/duolingo/make-basic-sentences/`
- `https://www.kli.org/duolingo/use-prefixes/`
- `https://www.kli.org/duolingo/describe-what-you-sense/`
- `https://www.kli.org/duolingo/say-when-an-event-was/`
- `https://www.kli.org/duolingo/identify-people/`

## Deliberately not implemented yet

- reflexive / reciprocal suffix handling
- imperative prefixes
- verb suffix classes and ordering
- negation and aspect
- noun suffix classes
- pronoun-as-copula constructions
- question syntax
- subordinate/relative clauses
- broad lexical selection

Unsupported combinations are rejected instead of guessed.
