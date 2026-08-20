// Output Tab

const __saeOwnsOutput = (
  state.SAE
  && ["arc", "deferred", "command"].includes(state.SAE.contextMode)
);

if (!__saeOwnsOutput) {
  try {
    InnerSelf("output");
  } catch (e) {
    log("IS+SAE output Inner Self error:", e);
  }
}

const modifier = (text) => {
  const originalText = (typeof text === "string" && text.length > 0) ? text : " ";
  try {
    const out = onOutput_SAE(text);
    return { text: (typeof out === "string" && out.length > 0) ? out : originalText };
  } catch (e) {
    log("IS+SAE output modifier error:", e);
    return { text: originalText };
  }
}

modifier(text)
