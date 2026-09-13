/*
 * mughwI' — local Klingon translation engine
 * SPDX-License-Identifier: Apache-2.0
 */

(() => {
  const ENGINE_VERSION = "0.0.3";

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

  const GENERATED_NO_OBJECT = Object.freeze({
    "en-US": Object.freeze({
      "i understand": Object.freeze({ root: "yaj", subject: "1s" }),
      "you understand": Object.freeze({ root: "yaj", subject: "2s" }),
      "we understand": Object.freeze({ root: "yaj", subject: "1p" }),
      "you all understand": Object.freeze({ root: "yaj", subject: "2p" })
    }),
    "pt-BR": Object.freeze({
      "eu entendo": Object.freeze({ root: "yaj", subject: "1s" }),
      "voce entende": Object.freeze({ root: "yaj", subject: "2s" }),
      "nos entendemos": Object.freeze({ root: "yaj", subject: "1p" }),
      "voces entendem": Object.freeze({ root: "yaj", subject: "2p" })
    })
  });

  function normalizeSource(value) {
    return value
      .normalize("NFKD")
      .replace(/\p{M}/gu, "")
      .replace(/[’‘]/gu, "'")
      .toLocaleLowerCase("en-US")
      .replace(/[.!?…,:;()[\]{}"“”]/gu, " ")
      .replace(/\s+/gu, " ")
      .trim();
  }

  function translate({ text, sourceLanguage }) {
    const source = typeof text === "string" ? text.trim() : "";

    if (!source) {
      return { ok: true, status: "empty", text: "", confidence: null };
    }

    if (!PHRASEBOOK[sourceLanguage] || !GENERATED_NO_OBJECT[sourceLanguage]) {
      return {
        ok: false,
        status: "unsupported-source-language",
        text: "",
        confidence: null,
        sourceLanguage,
        message: "Unsupported source language."
      };
    }

    const normalizedSource = normalizeSource(source);
    const generated = GENERATED_NO_OBJECT[sourceLanguage][normalizedSource];

    if (generated && globalThis.KlingonGrammar) {
      const verb = globalThis.KlingonGrammar.conjugateNoObjectVerb(
        generated.root,
        generated.subject
      );

      return {
        ok: true,
        status: "generated-verified-grammar",
        text: `${verb}.`,
        confidence: "verified",
        mode: "grammar",
        sourceLanguage,
        normalizedSource,
        provenance: "KLI no-object verb-prefix system + verified yaj root"
      };
    }

    const match = PHRASEBOOK[sourceLanguage][normalizedSource];
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

  globalThis.KlingonTranslatorEngine = Object.freeze({
    version: ENGINE_VERSION,
    translate
  });
})();
