// @cache-compatible
const __isNgoKVBase = text;
let __isNgoAfterGuidance = __isNgoKVBase;

try {
  const note = (
    state.NGO
    && typeof state.NGO.originalAuthorsNote === "string"
  ) ? state.NGO.originalAuthorsNote.trim() : "";

  if (note !== "") {
    const suffix = "\n\n" + note;
    const room = Number.isInteger(info.maxChars)
      ? Math.max(0, info.maxChars - text.length - 16)
      : suffix.length;

    if (suffix.length <= room) {
      text += suffix;
    } else {
      log("IS+NGO KV: NGO guidance skipped; no append budget.");
    }
  }

  if ((typeof text !== "string") || !text.startsWith(__isNgoKVBase)) {
    text = __isNgoKVBase || " ";
  }
  __isNgoAfterGuidance = text;
} catch (e) {
  log("IS+NGO guidance error:", e);
  text = __isNgoKVBase || " ";
  __isNgoAfterGuidance = text;
}

try {
  // Inner Self runs so it remains the final say in output
  InnerSelf("context");

  if ((typeof text !== "string") || !text.startsWith(__isNgoAfterGuidance)) {
    log("IS+NGO KV: rejected a non-append-only Inner Self mutation.");
    text = __isNgoAfterGuidance || (__isNgoKVBase || " ");
  }
} catch (e) {
  log("IS+NGO Inner Self context error:", e);
  text = __isNgoAfterGuidance || (__isNgoKVBase || " ");
}

const modifier = (text) => {
  try {
    const safeText = (
      typeof text === "string"
      && text.length > 0
      && text.startsWith(__isNgoKVBase)
    ) ? text : (__isNgoKVBase || " ");

    if (typeof stop === "boolean") {
      return { text: safeText, stop };
    }
    return { text: safeText };
  } catch (e) {
    log("IS+NGO context modifier error:", e);
    return { text: __isNgoKVBase || " " };
  }
}

modifier(text)
