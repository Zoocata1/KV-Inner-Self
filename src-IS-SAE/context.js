// @cache-compatible
const __isSaeKVBase = text;
let __isSaeAfterArc = __isSaeKVBase;

try {
  text = onContext_SAE(text);

  if ((typeof text !== "string") || !text.startsWith(__isSaeKVBase)) {
    log("IS+SAE KV: rejected a non-append-only SAE context mutation.");
    text = __isSaeKVBase || " ";
    if (state.SAE) state.SAE.contextMode = "normal";
  }
  __isSaeAfterArc = text;
} catch (e) {
  log("IS+SAE SAE-context error:", e);
  text = __isSaeKVBase || " ";
  __isSaeAfterArc = text;
  if (state.SAE) state.SAE.contextMode = "normal";
}

const __isSaeMode = state.SAE?.contextMode || "normal";

// SAE should not conflict with brain operation by Inner Self tehe.
if (__isSaeMode === "normal") {
  try {
    InnerSelf("context");

    if ((typeof text !== "string") || !text.startsWith(__isSaeAfterArc)) {
      log("IS+SAE KV: rejected a non-append-only Inner Self mutation.");
      text = __isSaeAfterArc || (__isSaeKVBase || " ");
    }
  } catch (e) {
    log("IS+SAE Inner Self context error:", e);
    text = __isSaeAfterArc || (__isSaeKVBase || " ");
  }
}

const modifier = (text) => {
  try {
    const safeText = (
      typeof text === "string"
      && text.length > 0
      && text.startsWith(__isSaeKVBase)
    ) ? text : (__isSaeKVBase || " ");

    if (typeof stop === "boolean") {
      return { text: safeText, stop };
    }
    return { text: safeText };
  } catch (e) {
    log("IS+SAE context modifier error:", e);
    return { text: __isSaeKVBase || " " };
  }
}

modifier(text)
