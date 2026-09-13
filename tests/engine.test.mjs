import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const enginePath = fileURLToPath(new URL("../src/translator/engine.js", import.meta.url));
const source = fs.readFileSync(enginePath, "utf8");
vm.runInThisContext(source, { filename: enginePath });

const engine = globalThis.KlingonTranslatorEngine;

test("engine exposes version 0.0.2", () => {
  assert.equal(engine.version, "0.0.2");
});

test("translates verified EN-US greeting", () => {
  const result = engine.translate({ text: "Hello!", sourceLanguage: "en-US" });
  assert.equal(result.ok, true);
  assert.equal(result.text, "qavan.");
  assert.equal(result.confidence, "verified");
});

test("normalizes PT-BR accents and punctuation", () => {
  const result = engine.translate({ text: "Olá!!!", sourceLanguage: "pt-BR" });
  assert.equal(result.ok, true);
  assert.equal(result.text, "qavan.");
});

test("translates a verified canonical expression", () => {
  const result = engine.translate({
    text: "Today is a good day to die.",
    sourceLanguage: "en-US"
  });

  assert.equal(result.ok, true);
  assert.equal(result.text, "Heghlu'meH QaQ jajvam.");
});

test("PT-BR semantic alias reaches the same verified Klingon phrase", () => {
  const result = engine.translate({
    text: "Hoje é um bom dia para morrer.",
    sourceLanguage: "pt-BR"
  });

  assert.equal(result.ok, true);
  assert.equal(result.text, "Heghlu'meH QaQ jajvam.");
});

test("unknown input is refused instead of guessed", () => {
  const result = engine.translate({
    text: "My targ ate the navigation console.",
    sourceLanguage: "en-US"
  });

  assert.equal(result.ok, false);
  assert.equal(result.status, "no-verified-match");
  assert.match(result.message, /will not guess/i);
});
