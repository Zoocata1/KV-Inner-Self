const modifier = (text) => {
  const originalText =
    (typeof text === "string" && text !== "") ? text : " "

  try {
    globalThis.text = originalText

    // Inner Self/Auto-Cards parse their hidden operations first.
    InnerSelf("output")

    const out =
      (typeof globalThis.text === "string" && globalThis.text !== "")
        ? globalThis.text
        : originalText

    // NGO analyzes only the cleaned, player-visible story output.
    NarrativeGuidanceOverhaul("output", out)

    return { text: out }
  } catch (e) {
    log("Inner Self + NGO output error:", e)
    return { text: originalText }
  }
}

modifier(text)
