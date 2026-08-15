// @cache-compatible
const modifier = (text) => {
  const originalText =
    (typeof text === "string" && text !== "") ? text : " "

  try {
    globalThis.text = originalText
    globalThis.stop ??= false

    // Delete the temporary Auto-Cards text we saved last turn so it doesn’t accidentally get reused.
    if (state.InnerSelf?.AC) {
      state.InnerSelf.AC.kvMemorySuffix = ""
      state.InnerSelf.AC.kvTaskSuffix = ""
    }

    InnerSelf("context")

    const changedText = globalThis.text
    const ac = state.InnerSelf?.AC || {}
    const memorySuffix =
      (typeof ac.kvMemorySuffix === "string")
        ? ac.kvMemorySuffix
        : ""
    const taskSuffix =
      (typeof ac.kvTaskSuffix === "string")
        ? ac.kvTaskSuffix
        : ""

    // Auto-Cards is currently creating or compressing a card.
    if (ac.event === true && taskSuffix !== "") {
      const out = `${originalText}${taskSuffix}`
      return globalThis.stop === true
        ? { text: out, stop: true }
        : { text: out }
    }

    if (
      typeof changedText !== "string" ||
      changedText === ""
    ) {
      const out = `${originalText}${memorySuffix}`
      return globalThis.stop === true
        ? { text: out, stop: true }
        : { text: out }
    }

    // If Inner Self already gave us KV-safe context, don’t mess with it.
    if (changedText.startsWith(originalText)) {
      return globalThis.stop === true
        ? { text: changedText, stop: true }
        : { text: changedText }
    }

    // Inner Self temporarily edits the context while figuring things out, then throw away Inner Self’s temporary edits
    const anchors = [
      "<SYSTEM>\n# OPERATING ENVIRONMENT",
      "<SYSTEM>\n# Always continue the story"
    ]

    let suffixStart = -1
    for (const anchor of anchors) {
      const index = changedText.lastIndexOf(anchor)
      if (index > suffixStart) {
        suffixStart = index
      }
    }

    const innerSuffix = (
      suffixStart === -1
        ? ""
        : `\n\n${changedText.slice(suffixStart).trimStart()}`
    )

    const out =
      `${originalText}${memorySuffix}${innerSuffix}`

    return globalThis.stop === true
      ? { text: out, stop: true }
      : { text: out }
  } catch (e) {
    log("Inner Self KV context error:", e)
    return { text: originalText }
  }
}

modifier(text)
