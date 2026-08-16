const modifier = (text) => {
  const originalText =
    (typeof text === "string" && text !== "") ? text : " "

  try {
    globalThis.text = originalText

    // Inner Self/Auto-Cards keep their original Input behavior.
    InnerSelf("input")

    // NGO reads the player's original action, not AC's replacement text.
    NarrativeGuidanceOverhaul("input", originalText)

    const out = globalThis.text
    return {
      text: (typeof out === "string" && out !== "")
        ? out
        : originalText
    }
  } catch (e) {
    log("Inner Self + NGO input error:", e)
    return { text: originalText }
  }
}

modifier(text)
