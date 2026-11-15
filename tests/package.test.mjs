import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = fileURLToPath(new URL("../", import.meta.url));
const manifest = JSON.parse(
  fs.readFileSync(path.join(projectRoot, "manifest.json"), "utf8")
);
const workflow = fs.readFileSync(
  path.join(projectRoot, ".github/workflows/build-firefox.yml"),
  "utf8"
);

const requiredSizes = ["16", "32", "48", "96", "128"];
const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

test("manifest declares the complete browser icon set", () => {
  assert.deepEqual(Object.keys(manifest.icons).sort((a, b) => Number(a) - Number(b)), requiredSizes);
  assert.deepEqual(
    Object.keys(manifest.action.default_icon).sort((a, b) => Number(a) - Number(b)),
    requiredSizes
  );

  for (const size of requiredSizes) {
    assert.equal(manifest.action.default_icon[size], manifest.icons[size]);
  }
});

test("every manifest icon exists and is a PNG", () => {
  for (const size of requiredSizes) {
    const iconPath = path.join(projectRoot, manifest.icons[size]);
    assert.equal(fs.existsSync(iconPath), true, `missing icon: ${manifest.icons[size]}`);

    const signature = fs.readFileSync(iconPath).subarray(0, pngSignature.length);
    assert.equal(signature.equals(pngSignature), true, `invalid PNG: ${manifest.icons[size]}`);
  }
});

test("Firefox XPI workflow packages every PNG icon", () => {
  assert.match(workflow, /icons\/\*\.png/);
});
