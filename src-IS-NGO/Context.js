// @cache-compatible
const modifier = (text) => {
  const originalText =
    (typeof text === "string" && text !== "") ? text : " "

  try {
    globalThis.text = originalText
    globalThis.stop ??= false

    if (state.InnerSelf?.AC) {
      state.InnerSelf.AC.kvMemorySuffix = ""
      state.InnerSelf.AC.kvTaskSuffix = ""
    }

    // Let the existing KV/FIFO Inner Self + Auto-Cards logic run first.
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

    // Auto-Cards keeps exclusive ownership of its model-task turns.
    if (ac.event === true && taskSuffix !== "") {
      const out = `${originalText}${taskSuffix}`

      return globalThis.stop === true
        ? { text: out, stop: true }
        : { text: out }
    }

    const guidance =
      NarrativeGuidanceOverhaul("context", originalText)

    const ngoSuffix =
      (typeof guidance === "string" && guidance.trim() !== "")
        ? `\n\n${guidance.trim()}`
        : ""

    let innerSuffix = ""

    if (
      typeof changedText === "string"
      && changedText !== ""
    ) {
      if (changedText.startsWith(originalText)) {
        innerSuffix = changedText.slice(originalText.length)
      } else {
        // Recover only Inner Self's dynamic suffix; discard its working-copy edits.
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

        if (suffixStart !== -1) {
          innerSuffix =
            `\n\n${changedText.slice(suffixStart).trimStart()}`
        }
      }
    }

    // KV order:
    // stable AI Dungeon prefix -> AC memories -> NGO -> Inner Self brain/task.
    const out =
      `${originalText}${memorySuffix}${ngoSuffix}${innerSuffix}`

    return globalThis.stop === true
      ? { text: out, stop: true }
      : { text: out }
  } catch (e) {
    log("Inner Self + NGO KV context error:", e)
    return { text: originalText }
  }
}

modifier(text)
