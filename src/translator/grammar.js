/*
 * mughwI' grammar kernel — Klingon morphology helpers
 * SPDX-License-Identifier: Apache-2.0
 */

(() => {
  const GRAMMAR_VERSION = "0.1.0";

  const NO_OBJECT_PREFIXES = Object.freeze({
    "1s": "jI",
    "2s": "bI",
    "3s": "",
    "1p": "ma",
    "2p": "Su",
    "3p": ""
  });

  function requireToken(value, name) {
    if (typeof value !== "string" || !value.trim()) {
      throw new TypeError(`${name} must be a non-empty string.`);
    }
    return value.trim();
  }

  function conjugateNoObjectVerb(root, subjectPerson) {
    const verbRoot = requireToken(root, "verb root");
    if (!(subjectPerson in NO_OBJECT_PREFIXES)) {
      throw new RangeError(`Unsupported subject person: ${subjectPerson}`);
    }

    return `${NO_OBJECT_PREFIXES[subjectPerson]}${verbRoot}`;
  }

  function composeOVS({ object = "", verb, subject = "", leading = [] }) {
    const verbForm = requireToken(verb, "verb");
    const prelude = Array.isArray(leading)
      ? leading
          .filter((part) => typeof part === "string" && part.trim())
          .map((part) => part.trim())
      : [];

    const objectPhrase = typeof object === "string" ? object.trim() : "";
    const subjectPhrase = typeof subject === "string" ? subject.trim() : "";

    return [...prelude, objectPhrase, verbForm, subjectPhrase]
      .filter(Boolean)
      .join(" ");
  }

  globalThis.KlingonGrammar = Object.freeze({
    version: GRAMMAR_VERSION,
    noObjectPrefixes: NO_OBJECT_PREFIXES,
    conjugateNoObjectVerb,
    composeOVS
  });
})();
