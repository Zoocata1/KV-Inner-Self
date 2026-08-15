// Your "Output" tab should look like this
const modifier = (text) => {
  const originalText =
    (typeof text === "string" && text !== "") ? text : " "

  try {
    globalThis.text = originalText
    InnerSelf("output")

    const out = globalThis.text
    return {
      text: (typeof out === "string" && out !== "")
        ? out
        : originalText
    }
  } catch (e) {
    log("Inner Self output error:", e)
    return { text: originalText }
  }
}

modifier(text)
