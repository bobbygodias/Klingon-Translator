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

test("transitive prefix matrix covers key contrasts", () => {
  assert.equal(grammar.conjugateVerb("legh", "1s", "2s"), "qalegh");
  assert.equal(grammar.conjugateVerb("legh", "2s", "1s"), "cholegh");
  assert.equal(grammar.conjugateVerb("legh", "1p", "3s"), "wIlegh");
  assert.equal(grammar.conjugateVerb("legh", "1p", "3p"), "DIlegh");
  assert.equal(grammar.conjugateVerb("legh", "3p", "3s"), "lulegh");
  assert.equal(grammar.conjugateVerb("legh", "3p", "3p"), "legh");
  assert.equal(grammar.conjugateVerb("legh", "3s", "2s"), "Dulegh");
  assert.equal(grammar.conjugateVerb("legh", "3p", "2s"), "nIlegh");
});

test("unsupported reflexive combinations are rejected", () => {
  assert.throws(() => grammar.conjugateVerb("legh", "1s", "1s"), RangeError);
});

test("OVS composer puts object before verb and subject after it", () => {
  assert.equal(grammar.composeOVS({ object: "OBJ", verb: "VERB", subject: "SUBJ" }), "OBJ VERB SUBJ");
});
