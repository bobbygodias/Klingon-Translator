/*
 * Klingon Translator
 * SPDX-License-Identifier: Apache-2.0
 */

browser.action.onClicked.addListener(async (tab) => {
  if (!tab.id) {
    return;
  }

  try {
    await browser.scripting.executeScript({
      target: { tabId: tab.id },
      files: [
        "src/translator/grammar.js",
        "src/translator/engine.js",
        "src/content/overlay.js"
      ]
    });
  } catch (error) {
    // Firefox blocks injection into privileged pages such as about: pages,
    // the built-in PDF viewer, and other browser UI documents.
    console.warn("Klingon Translator could not open on this page.", error);
  }
});
