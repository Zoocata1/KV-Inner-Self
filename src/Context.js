// @cache-compatible
const __innerSelfKVBase = text;

try {
  InnerSelf("context");

  // V1 scripts may only appened after non-volitile context so to not break cache.
  if ((typeof text !== "string") || !text.startsWith(__innerSelfKVBase)) {
    log("Inner Self KV: rejected a non-append-only context mutation.");
    text = __innerSelfKVBase || " ";
  }
} catch (e) {
  log("Inner Self KV context error:", e);
  text = __innerSelfKVBase || " ";
}

const modifier = (text) => {
  try {
    const safeText = (typeof text === "string" && text.length > 0)
      ? text
      : (__innerSelfKVBase || " ");

    if (typeof stop === "boolean") {
      return { text: safeText, stop };
    }
    return { text: safeText };
  } catch (e) {
    log("Inner Self KV modifier error:", e);
    return { text: __innerSelfKVBase || " " };
  }
}

modifier(text)
