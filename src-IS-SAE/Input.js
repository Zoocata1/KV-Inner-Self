// Input Tab

const __saeCommandInput = (
  state.SAE
  && typeof text === "string"
  && (
    /\/(?:help\s+sae|redo\s+arc)\b/i.test(text)
    || (state.SAE.saveOutput === true && /\/stop\b/i.test(text))
  )
);

if (!__saeCommandInput) {
  try {
    InnerSelf("input");
  } catch (e) {
    log("IS+SAE input Inner Self error:", e);
  }
}

const modifier = (text) => {
  const originalText = (typeof text === "string" && text.length > 0) ? text : " ";
  try {
    const out = onInput_SAE(text);
    return { text: (typeof out === "string" && out.length > 0) ? out : originalText };
  } catch (e) {
    log("IS+SAE input modifier error:", e);
    return { text: originalText };
  }
}

modifier(text)
