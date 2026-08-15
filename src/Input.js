// Your "Input" tab should look like this
const modifier = (text) => {
  const originalText =
    (typeof text === "string" && text !== "") ? text : " "

  try {
    globalThis.text = originalText
    InnerSelf("input")

    const out = globalThis.text
    return {
      text: (typeof out === "string" && out !== "")
        ? out
        : originalText
    }
  } catch (e) {
    log("Inner Self input error:", e)
    return { text: originalText }
  }
}

modifier(text)
