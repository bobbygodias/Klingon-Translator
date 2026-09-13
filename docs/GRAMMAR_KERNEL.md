# Grammar kernel

Version 0.0.3 introduces the first productive grammar module in `src/translator/grammar.js`.

## Implemented rules

### No-object verb prefixes

The kernel currently composes these subject/no-object prefixes:

- `jI-` — I
- `bI-` — you (singular)
- null prefix — he/she/it/they
- `ma-` — we
- `Su-` — you (plural)

For example, with the verified verb root `yaj` (understand):

- `jI` + `yaj` → `jIyaj`
- `bI` + `yaj` → `bIyaj`
- `ma` + `yaj` → `mayaj`
- `Su` + `yaj` → `Suyaj`

### Basic clause order

The kernel also includes a generic Object–Verb–Subject composer. This is infrastructure for future source-language parsing; version 0.0.3 does not yet expose arbitrary OVS generation to user input.

## Sources checked

The implemented grammar slice was checked against Klingon Language Institute instructional material:

- Basic sentence prefixes: `https://www.kli.org/duolingo/make-basic-sentences/`
- Third-person/null prefix and Object–Verb–Subject ordering: `https://www.kli.org/duolingo/say-when-an-event-was/`

The `yaj` form is also present in the verified `De7vID/klingon-assistant` dialogue data already referenced by this project.

## Deliberately not implemented yet

The kernel does not yet claim support for:

- the complete subject/object verb-prefix matrix
- imperative prefixes
- verb suffix classes and suffix ordering
- negation and aspect
- noun suffix classes
- pronoun-as-copula constructions
- question syntax
- subordinate/relative clauses
- arbitrary lexical selection

Those features will be added behind tests and provenance rather than guessed.
