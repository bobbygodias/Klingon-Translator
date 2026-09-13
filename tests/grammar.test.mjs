import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import vm from "node:vm";
import { fileURLToPath } from "node:url";

const grammarPath = fileURLToPath(new URL("../src/translator/grammar.js", import.meta.url));
vm.runInThisContext(fs.readFileSync(grammarPath, "utf8"), { filename: grammarPath });
const grammar = globalThis.KlingonGrammar;

test("no-object prefixes compose correctly", () => {
  assert.equal(grammar.conjugateNoObjectVerb("yaj", "1s"), "jIyaj");
  assert.equal(grammar.conjugateNoObjectVerb("yaj", "2s"), "bIyaj");
  assert.equal(grammar.conjugateNoObjectVerb("yaj", "1p"), "mayaj");
  assert.equal(grammar.conjugateNoObjectVerb("yaj", "2p"), "Suyaj");
});

test("third person no-object uses null prefix", () => {
  assert.equal(grammar.conjugateNoObjectVerb("yaj", "3s"), "yaj");
  assert.equal(grammar.conjugateNoObjectVerb("yaj", "3p"), "yaj");
});

test("OVS composer puts object before verb and subject after it", () => {
  assert.equal(
    grammar.composeOVS({ object: "OBJ", verb: "VERB", subject: "SUBJ" }),
    "OBJ VERB SUBJ"
  );
});
