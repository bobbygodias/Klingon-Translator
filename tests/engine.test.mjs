import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

for (const relativePath of ["../src/translator/grammar.js", "../src/translator/engine.js"]) {
  const path = fileURLToPath(new URL(relativePath, import.meta.url));
  vm.runInThisContext(fs.readFileSync(path, "utf8"), { filename: path });
}

const engine = globalThis.KlingonTranslatorEngine;

test("engine exposes version 0.0.3", () => {
  assert.equal(engine.version, "0.0.3");
});

test("translates a verified phrasebook greeting", () => {
  const result = engine.translate({ text: "Olá!!!", sourceLanguage: "pt-BR" });
  assert.equal(result.ok, true);
  assert.equal(result.text, "qavan.");
  assert.equal(result.mode, "phrasebook");
});

test("generates first-person no-object morphology", () => {
  const result = engine.translate({ text: "I understand.", sourceLanguage: "en-US" });
  assert.equal(result.ok, true);
  assert.equal(result.text, "jIyaj.");
  assert.equal(result.mode, "grammar");
  assert.equal(result.status, "generated-verified-grammar");
});

test("generates plural prefixes from PT-BR", () => {
  assert.equal(
    engine.translate({ text: "Nós entendemos.", sourceLanguage: "pt-BR" }).text,
    "mayaj."
  );
  assert.equal(
    engine.translate({ text: "Vocês entendem.", sourceLanguage: "pt-BR" }).text,
    "Suyaj."
  );
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
