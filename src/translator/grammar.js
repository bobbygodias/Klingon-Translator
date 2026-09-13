/*
 * mughwI' grammar kernel — Klingon morphology helpers
 * SPDX-License-Identifier: Apache-2.0
 */

(() => {
  const GRAMMAR_VERSION = "0.2.0";

  const PREFIX_MATRIX = Object.freeze({
    "1s": Object.freeze({ none: "jI", "2s": "qa", "2p": "Sa", "3s": "vI", "3p": "vI" }),
    "2s": Object.freeze({ none: "bI", "1s": "cho", "1p": "ju", "3s": "Da", "3p": "Da" }),
    "3s": Object.freeze({ none: "", "1s": "mu", "2s": "Du", "1p": "nu", "2p": "lI", "3s": "", "3p": "" }),
    "1p": Object.freeze({ none: "ma", "2s": "pI", "2p": "re", "3s": "wI", "3p": "DI" }),
    "2p": Object.freeze({ none: "Su", "1s": "tu", "1p": "che", "3s": "bo", "3p": "bo" }),
    "3p": Object.freeze({ none: "", "1s": "mu", "2s": "nI", "1p": "nu", "2p": "lI", "3s": "lu", "3p": "" })
  });

  function requireToken(value, name) {
    if (typeof value !== "string" || !value.trim()) {
      throw new TypeError(`${name} must be a non-empty string.`);
    }
    return value.trim();
  }

  function getVerbPrefix(subjectPerson, objectPerson = "none") {
    const row = PREFIX_MATRIX[subjectPerson];
    if (!row || !(objectPerson in row)) {
      throw new RangeError(`Unsupported subject/object combination: ${subjectPerson} -> ${objectPerson}`);
    }
    return row[objectPerson];
  }

  function conjugateVerb(root, subjectPerson, objectPerson = "none") {
    const verbRoot = requireToken(root, "verb root");
    return `${getVerbPrefix(subjectPerson, objectPerson)}${verbRoot}`;
  }

  function conjugateNoObjectVerb(root, subjectPerson) {
    return conjugateVerb(root, subjectPerson, "none");
  }

  function composeOVS({ object = "", verb, subject = "", leading = [] }) {
    const verbForm = requireToken(verb, "verb");
    const prelude = Array.isArray(leading)
      ? leading.filter((part) => typeof part === "string" && part.trim()).map((part) => part.trim())
      : [];
    const objectPhrase = typeof object === "string" ? object.trim() : "";
    const subjectPhrase = typeof subject === "string" ? subject.trim() : "";

    return [...prelude, objectPhrase, verbForm, subjectPhrase].filter(Boolean).join(" ");
  }

  globalThis.KlingonGrammar = Object.freeze({
    version: GRAMMAR_VERSION,
    prefixMatrix: PREFIX_MATRIX,
    getVerbPrefix,
    conjugateVerb,
    conjugateNoObjectVerb,
    composeOVS
  });
})();
