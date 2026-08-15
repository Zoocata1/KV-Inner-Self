# INNER SELF FOR OPTIMIZED CONTEXT

This Github Repo serves as the goto for the amazing Inner Self script, Created by LewdLeah, on AI Dungeons that has been modified to run on models using KV caching.

## Changelog

<details>
<summary><b>(click to expand)</b></summary>

### 1.0.0

Current Full Release

</details>

## Install Guide for Scenarios
1. Use the [AI Dungeon website](https://aidungeon.com/) on PC (or view as desktop if mobile-only)
2. [Create a new scenario](https://help.aidungeon.com/faq/what-are-scenarios) or edit an existing scenario
3. Open the `DETAILS` tab at the top while editing your scenario
4. Scroll down to `Scripting` and toggle ON → `Scripts Enabled`
5. Select `EDIT SCRIPTS`
6. Select the `Input` tab on the left
7. Delete all code within said tab
8. Copy and paste the following code into your empty `Input` tab:
```javascript
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
```
9. Select the `Context` tab on the left
10. Delete all code within said tab
11. Copy and paste the following code into your empty `Context` tab:
```javascript
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
```
12. Select the `Output` tab on the left
13. Delete all code within said tab
14. Copy and paste the following code into your empty `Output` tab:
```javascript
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
```
15. Select the `Library` tab on the left
16. Delete all code within said tab
17. DOWNLOAD the full Library code (hyperlink below) and open it in Notepad or Notepad ++
- [Library code](./src/Library.js)
18. Copy the full code from the notepad, (Ctrl + A) -> (Ctrl + C) -> (Ctrl + V) is a shortcut, and paste into your empty `Library` tab
19. Click the big yellow `SAVE` button in the top right corner

### *That's it*

All adventures played from your scenario will now include Inner Self that runs on KV cached models.
