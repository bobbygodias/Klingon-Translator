/*
 * mughwI' — local Klingon translation engine
 * SPDX-License-Identifier: Apache-2.0
 */

(() => {
  const ENGINE_VERSION = "0.0.4";

  const phrase = (text, provenance) => Object.freeze({ text, provenance });

  const PHRASEBOOK = Object.freeze({
    "en-US": Object.freeze({
      "hello": phrase("qavan.", "klingon-assistant/manual/common_expressions"),
      "hello y'all": phrase("Savan.", "klingon-assistant/manual/common_expressions"),
      "what do you want": phrase("nuqneH?", "klingon-assistant/manual/common_expressions"),
      "success": phrase("Qapla'!", "klingon-assistant/manual/common_expressions"),
      "i love you": phrase("qamuSHa'.", "klingon-assistant/manual/common_expressions"),
      "my love": phrase("bangwI'.", "klingon-assistant/manual/common_expressions"),
      "you are my love": phrase("parmaqqaywI' SoH.", "klingon-assistant/manual/common_expressions"),
      "today is a good day to die": phrase("Heghlu'meH QaQ jajvam.", "klingon-assistant/manual/today_is_a_good_day")
    }),
    "pt-BR": Object.freeze({
      "ola": phrase("qavan.", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "oi": phrase("qavan.", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "ola a todos": phrase("Savan.", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "o que voce quer": phrase("nuqneH?", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "sucesso": phrase("Qapla'!", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "eu te amo": phrase("qamuSHa'.", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "te amo": phrase("qamuSHa'.", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "meu amor": phrase("bangwI'.", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "voce e meu amor": phrase("parmaqqaywI' SoH.", "PT-BR semantic alias of klingon-assistant/manual/common_expressions"),
      "hoje e um bom dia para morrer": phrase("Heghlu'meH QaQ jajvam.", "PT-BR semantic alias of klingon-assistant/manual/today_is_a_good_day")
    })
  });

  const UNDERSTAND_SUBJECTS = Object.freeze({
    "en-US": Object.freeze({
      "i understand": "1s", "you understand": "2s", "we understand": "1p", "you all understand": "2p",
      "he understands": "3s", "she understands": "3s", "they understand": "3p"
    }),
    "pt-BR": Object.freeze({
      "eu entendo": "1s", "voce entende": "2s", "tu entendes": "2s", "nos entendemos": "1p", "a gente entende": "1p",
      "voces entendem": "2p", "ele entende": "3s", "ela entende": "3s", "eles entendem": "3p", "elas entendem": "3p"
    })
  });

  function normalizeSource(value) {
    return value.normalize("NFKD").replace(/\p{M}/gu, "").replace(/[’‘]/gu, "'").toLocaleLowerCase("en-US")
      .replace(/[.!?…,:;()[\]{}"“”]/gu, " ").replace(/\s+/gu, " ").trim();
  }

  function generated(text, sourceLanguage, normalizedSource, rule) {
    return {
      ok: true,
      status: "generated-verified-grammar",
      text,
      confidence: "grammar-verified",
      mode: "grammar",
      sourceLanguage,
      normalizedSource,
      provenance: rule
    };
  }

  function tryProductiveGrammar(normalizedSource, sourceLanguage) {
    const grammar = globalThis.KlingonGrammar;
    if (!grammar) return null;

    const understandSubject = UNDERSTAND_SUBJECTS[sourceLanguage]?.[normalizedSource];
    if (understandSubject) {
      return generated(
        `${grammar.conjugateVerb("yaj", understandSubject)}.`,
        sourceLanguage,
        normalizedSource,
        "KLI pronominal verb-prefix system + verified yaj root"
      );
    }

    const parsed = globalThis.KlingonSourceParser?.parseSimpleTransitive(normalizedSource, sourceLanguage);
    if (parsed?.kind === "transitive-pronoun-clause") {
      try {
        return generated(
          `${grammar.conjugateVerb(parsed.root, parsed.subjectPerson, parsed.objectPerson)}.`,
          sourceLanguage,
          normalizedSource,
          "KLI pronominal prefix matrix + verified legh root"
        );
      } catch (error) {
        if (!(error instanceof RangeError)) throw error;
      }
    }

    return null;
  }

  function translate({ text, sourceLanguage }) {
    const source = typeof text === "string" ? text.trim() : "";
    if (!source) return { ok: true, status: "empty", text: "", confidence: null };

    const languageTable = PHRASEBOOK[sourceLanguage];
    if (!languageTable) {
      return { ok: false, status: "unsupported-source-language", text: "", confidence: null, sourceLanguage, message: "Unsupported source language." };
    }

    const normalizedSource = normalizeSource(source);
    const match = languageTable[normalizedSource];
    if (match) {
      return {
        ok: true,
        status: "exact-verified-phrase",
        text: match.text,
        confidence: "verified",
        mode: "phrasebook",
        sourceLanguage,
        normalizedSource,
        provenance: match.provenance
      };
    }

    const productive = tryProductiveGrammar(normalizedSource, sourceLanguage);
    if (productive) return productive;

    return {
      ok: false,
      status: "no-verified-match",
      text: "",
      confidence: null,
      sourceLanguage,
      normalizedSource,
      message: "No verified translation path yet — mughwI' will not guess."
    };
  }

  globalThis.KlingonTranslatorEngine = Object.freeze({ version: ENGINE_VERSION, translate });
})();
