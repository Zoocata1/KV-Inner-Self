<img width="220" height="294" alt="cute-anime" src="https://github.com/user-attachments/assets/242580f2-f12a-4355-899a-9bc09afd301a" />
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
InnerSelf("input");
const modifier = (text) => {
  // Any other input modifier scripts can go here
  return { text };
};
modifier(text)
```
9. Select the `Context` tab on the left
10. Delete all code within said tab
11. Copy and paste the following code into your empty `Context` tab:
```javascript
// @cache-compatible
const __innerSelfKVBase = text;

try {
  InnerSelf("context");

  // Cache-compatible V1 context scripts may only append to the exact incoming context.
  if ((typeof text !== "string") || !text.startsWith(__innerSelfKVBase)) {
    log("Inner Self KV: rejected a non-append-only context mutation.");
    text = __innerSelfKVBase || " ";
  }
} catch (e) {
  log("Inner Self KV context error:", e);
  text = __innerSelfKVBase || " ";
}

const modifier = (text) => {
  try {
    const safeText = (typeof text === "string" && text.length > 0)
      ? text
      : (__innerSelfKVBase || " ");

    if (typeof stop === "boolean") {
      return { text: safeText, stop };
    }
    return { text: safeText };
  } catch (e) {
    log("Inner Self KV modifier error:", e);
    return { text: __innerSelfKVBase || " " };
  }
}

modifier(text)
```
12. Select the `Output` tab on the left
13. Delete all code within said tab
14. Copy and paste the following code into your empty `Output` tab:
```javascript
// Your "Output" tab should look like this
InnerSelf("output");
const modifier = (text) => {
  // Any other output modifier scripts can go here
  return { text };
};
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
