// Output tab

state.NGO = (state.NGO && typeof state.NGO === "object" && !Array.isArray(state.NGO))
  ? state.NGO
  : {};
state.NGO.version = "IS-NGO-KV.1";


//DO NOT CHANGE ANYTHING HERE (Exept the conflict & calming word strings if you want to make them better)

const conflictWords = [
  "attack", "stab", "destroy", "break", "steal", "ruin", "burn", "smash", "sabotage", "disrupt",
  "vandalize", "overthrow", "assassinate", "plunder", "rob", "ransack", "raid", "hijack",
  "detonate", "explode", "ignite", "collapse", "demolish", "shatter", "strike", "slap",
  "obliterate", "annihilate", "corrupt", "infect", "poison", "curse", "hex", "summon",
  "conjure", "mutate", "provoke", "riot", "revolt", "mutiny", "rebel", "resist",
  "intimidate", "blackmail", "manipulate", "brainwash", "lie", "cheat", "swindle",
  "disarm", "fire", "hack", "overload", "flood", "drown", "rot", "dissolve",
  "slaughter", "terminate", "execute", "drama", "conflict", "evil", "kill", "slay",
  "defeat", "fight", "doom", "slice", "pain", "dying", "die", "perish", "blood",
  "ambush", "betray", "ambush", "assault", "threaten", "menace", "harass", "bully",
  "coerce", "extort", "torture", "maim", "wound", "injure", "cripple", "choke",
  "strangle", "shoot", "bomb", "invade", "besiege", "conquer", "dominate",
  "oppress", "persecute", "hunt", "track", "pursue", "capture", "kidnap",
  "imprison", "enslave", "deceive", "frame", "scam", "counterfeit", "forge",
  "threat", "vengeance", "revenge", "wrath", "rage", "fury", "hatred",
  "malice", "hostile", "hostility", "aggression", "clash", "brawl",
  "duel", "skirmish", "war", "battle", "combat", "siege", "destruction",
  "devastate", "crush", "eradicate", "eliminate", "suppress", "undermine",
  "backstab", "doublecross", "terrorize", "defy", "retaliate", "suffer",
  "torment", "scar", "bruise", "fracture", "bleed", "explode", "eruption"
];

const calmingWords = [
  "calm", "rest", "relax", "meditate", "sleep", "comfort", "hug", "smile",
  "forgive", "mend", "repair", "plant", "sing", "dance", "celebrate",
  "collaborate", "share", "give", "donate", "protect", "shelter",
  "trust", "hope", "dream", "revive", "eat", "drink", "balance",
  "cheer", "laugh", "play", "build", "bake", "craft", "cook",
  "empathize", "apologize", "befriend", "admire", "sympathize",
  "thank", "appreciate", "cherish", "love", "pet", "respect",
  "restore", "guide", "teach", "learn", "daydream", "wander",
  "explore", "discover", "reflect", "happy", "joy", "kind",
  "breathe", "inhale", "exhale", "soothe", "heal", "recover",
  "renew", "rejuvenate", "nurture", "care", "support", "assist",
  "encourage", "inspire", "uplift", "comforting", "peace",
  "serene", "tranquil", "gentle", "soft", "warm", "cozy",
  "snuggle", "cuddle", "gratitude", "bless", "harmony",
  "unity", "friendship", "companionship", "patience",
  "understand", "listen", "accept", "believe", "faith",
  "gratify", "satisfy", "content", "ease", "relief",
  "quiet", "still", "calming", "relief", "refresh",
  "bloom", "grow", "flourish", "thrive", "prosper",
  "sunshine", "meadow", "breeze", "ocean", "forest",
  "garden", "music", "lullaby", "whisper", "embrace", 
  "together", "happiness", "peaceful", "kindness", "charity"
];


try {
  InnerSelf("output");
} catch (e) {
  log("IS+NGO output error:", e);
}

const modifier = (text) => {
  const originalText = (typeof text === "string" && text.length > 0) ? text : " ";
  try {
  const lowerText = text.toLowerCase()
  const words = lowerText.split(/\s+/)
  let conflictCount = 0
  let calmingCount = 0

  words.forEach(word => {
    const fixedWord = word.replace(/^[^\w]+|[^\w]+$/g, '')
    if (conflictWords.includes(fixedWord)) {
      conflictCount++
    }
    if (calmingWords.includes(fixedWord)) {
      calmingCount++
    }
  })

  if (conflictCount > 0) {
    state.NGO.heat += conflictCount * state.NGO.modelIncreaseHeatImpact
    if (conflictCount >= state.NGO.threshholdModelIncreaseTemperature){
       state.NGO.storyTemperature += state.NGO.modelIncreaseTemperatureImpact
       log(`Detected ${conflictCount} conflict words (AI). Increasing heat & temperature.`)
    }
    else{
      log(`Detected ${conflictCount} conflict words (AI). Increasing heat.`)
    }
  }
  
  if (calmingCount > 0) {
    state.NGO.heat -= calmingCount * state.NGO.modelDecreaseHeatImpact
    if (calmingCount >= state.NGO.threshholdModelDecreaseTemperature){
       state.NGO.storyTemperature -= state.NGO.modelDecreaseTemperatureImpact
       log(`Detected ${calmingCount} calming words (AI). Decreasing heat & temperature.`)
    }
    else{
      log(`Detected ${calmingCount} calming words (AI). Decreasing heat.`)
    }
  }

  if (state.NGO.storyTemperature > state.NGO.trueMaximumTemperature){
    state.NGO.storyTemperature = state.NGO.trueMaximumTemperature
    log("Temperature over maximum, recalibrating...")
  }

  if (state.NGO.storyTemperature <= 0){
    state.NGO.storyTemperature = 1
    log("Temperature under minimum, recalibrating...")
  }


  // if (state.NGO.memory.authorsNote == state.NGO.originalAuthorsNote){
  //   state.NGO.memory.authorsNote = state.NGO.authorsNoteStorage
  // }

  log("Heat: " + state.NGO.heat)
  log("Temperature: " + state.NGO.storyTemperature)
    const safeText = (typeof text === "string" && text.length > 0) ? text : originalText;
    return { text: safeText };
  } catch (e) {
    log("IS+NGO output modifier error:", e);
    return { text: originalText };
  }
}

modifier(text)
