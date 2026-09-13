/*
 * Controlled EN-US / PT-BR source parser for mughwI'
 * SPDX-License-Identifier: Apache-2.0
 */

(() => {
  const PARSER_VERSION = "0.1.0";

  const TABLES = Object.freeze({
    "en-US": Object.freeze({
      subjects: Object.freeze([
        ["you all", "2p"], ["i", "1s"], ["you", "2s"], ["he", "3s"], ["she", "3s"], ["it", "3s"], ["we", "1p"], ["they", "3p"]
      ]),
      objects: Object.freeze([
        ["you all", "2p"], ["me", "1s"], ["you", "2s"], ["him", "3s"], ["her", "3s"], ["it", "3s"], ["us", "1p"], ["them", "3p"]
      ]),
      verbs: Object.freeze({ see: "legh", sees: "legh" })
    }),
    "pt-BR": Object.freeze({
      subjects: Object.freeze([
        ["a gente", "1p"], ["voces", "2p"], ["eles", "3p"], ["elas", "3p"], ["eu", "1s"], ["voce", "2s"], ["tu", "2s"], ["ele", "3s"], ["ela", "3s"], ["nos", "1p"]
      ]),
      objects: Object.freeze([
        ["a gente", "1p"], ["voces", "2p"], ["eles", "3p"], ["elas", "3p"], ["voce", "2s"], ["ele", "3s"], ["ela", "3s"], ["nos", "1p"], ["me", "1s"], ["te", "2s"]
      ]),
      verbs: Object.freeze({ vejo: "legh", ve: "legh", vemos: "legh", veem: "legh", ves: "legh" })
    })
  });

  function matchPrefix(text, entries) {
    return entries.find(([surface]) => text === surface || text.startsWith(`${surface} `)) ?? null;
  }

  function matchSuffix(text, entries) {
    return entries.find(([surface]) => text === surface || text.endsWith(` ${surface}`)) ?? null;
  }

  function parseSVO(text, table) {
    const subjectMatch = matchPrefix(text, table.subjects);
    const objectMatch = matchSuffix(text, table.objects);
    if (!subjectMatch || !objectMatch) return null;

    const [subjectSurface, subjectPerson] = subjectMatch;
    const [objectSurface, objectPerson] = objectMatch;
    const middle = text.slice(subjectSurface.length, text.length - objectSurface.length).trim();
    const root = table.verbs[middle];
    if (!root) return null;

    return { kind: "transitive-pronoun-clause", root, subjectPerson, objectPerson };
  }

  function parsePortugueseClitic(text, table) {
    const subjectMatch = matchPrefix(text, table.subjects);
    if (!subjectMatch) return null;
    const [subjectSurface, subjectPerson] = subjectMatch;
    const rest = text.slice(subjectSurface.length).trim();
    const parts = rest.split(" ");
    if (parts.length !== 2) return null;
    const [objectSurface, verbSurface] = parts;
    const objectMatch = table.objects.find(([surface]) => surface === objectSurface && ["me", "te", "nos"].includes(surface));
    const root = table.verbs[verbSurface];
    if (!objectMatch || !root) return null;
    return { kind: "transitive-pronoun-clause", root, subjectPerson, objectPerson: objectMatch[1] };
  }

  function parseSimpleTransitive(normalizedText, sourceLanguage) {
    const table = TABLES[sourceLanguage];
    if (!table) return null;
    return parseSVO(normalizedText, table) || (sourceLanguage === "pt-BR" ? parsePortugueseClitic(normalizedText, table) : null);
  }

  globalThis.KlingonSourceParser = Object.freeze({
    version: PARSER_VERSION,
    parseSimpleTransitive
  });
})();
