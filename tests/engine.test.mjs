import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

for (const relativePath of [
  "../src/translator/grammar.js",
  "../src/translator/source-parser.js",
  "../src/translator/engine.js"
]) {
  const path = fileURLToPath(new URL(relativePath, import.meta.url));
  vm.runInThisContext(fs.readFileSync(path, "utf8"), { filename: path });
}

const engine = globalThis.KlingonTranslatorEngine;

test("engine exposes version 0.0.4", () => {
  assert.equal(engine.version, "0.0.4");
});

test("keeps verified phrasebook path", () => {
  const result = engine.translate({ text: "Olá!!!", sourceLanguage: "pt-BR" });
  assert.equal(result.text, "qavan.");
  assert.equal(result.mode, "phrasebook");
});

test("generates no-object morphology", () => {
  assert.equal(engine.translate({ text: "I understand.", sourceLanguage: "en-US" }).text, "jIyaj.");
  assert.equal(engine.translate({ text: "Vocês entendem.", sourceLanguage: "pt-BR" }).text, "Suyaj.");
});

test("generates EN-US transitive pronoun clauses", () => {
  assert.equal(engine.translate({ text: "I see you.", sourceLanguage: "en-US" }).text, "qalegh.");
  assert.equal(engine.translate({ text: "You see me.", sourceLanguage: "en-US" }).text, "cholegh.");
  assert.equal(engine.translate({ text: "We see him.", sourceLanguage: "en-US" }).text, "wIlegh.");
  assert.equal(engine.translate({ text: "We see them.", sourceLanguage: "en-US" }).text, "DIlegh.");
  assert.equal(engine.translate({ text: "They see him.", sourceLanguage: "en-US" }).text, "lulegh.");
  assert.equal(engine.translate({ text: "They see them.", sourceLanguage: "en-US" }).text, "legh.");
});

test("generates PT-BR transitive pronoun clauses", () => {
  assert.equal(engine.translate({ text: "Eu vejo você.", sourceLanguage: "pt-BR" }).text, "qalegh.");
  assert.equal(engine.translate({ text: "Você me vê.", sourceLanguage: "pt-BR" }).text, "cholegh.");
  assert.equal(engine.translate({ text: "Nós vemos eles.", sourceLanguage: "pt-BR" }).text, "DIlegh.");
});

test("unsupported grammar is refused instead of guessed", () => {
  const result = engine.translate({ text: "I see me.", sourceLanguage: "en-US" });
  assert.equal(result.ok, false);
  assert.equal(result.status, "no-verified-match");
});
