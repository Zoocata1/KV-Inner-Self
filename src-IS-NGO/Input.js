// Input Tab

state.NGO = (state.NGO && typeof state.NGO === "object" && !Array.isArray(state.NGO))
  ? state.NGO
  : {};
state.NGO.version = "IS-NGO-KV.1";

/* === STORY ARC CONFIGURATION === */

state.NGO.initialHeatValue = 0 //Increasing this will increase the chance of the temperature increasing in the first few moments of the story.
state.NGO.initialTemperatureValue = 1 //Increasing this will increase the amount of conflict and tension in the initial sections of the story.
state.NGO.temperatureIncreaseChance = 15 //Increasing this value makes the conflict and tension in the story advance quicker.

state.NGO.heatIncreaseValue = 1 //Increasing this value makes the temperature increase more often, creating a faster paced story.
state.NGO.temperatureIncreaseValue = 1 //Increasing this value makes the conflit and tension in the story advance by larger segments, so the story will feel less like a gradual slope of tension and more like big steps.

state.NGO.playerIncreaseHeatImpact = 2 //The impact that the player has on increasing the conflict, so if the player attacks an NPC or does something drama inducing, the conflict and tension will increase by this amount.
state.NGO.playerDecreaseHeatImpact = 2 //The impact that the player has on decreasing the conflict, so if the player helps others or is doing something relaxing, the conflict and tension will decrease by this amount.
state.NGO.playerIncreaseTemperatureImpact = 1 //The impact that the player has on increasing the conflict, so if the player attacks an NPC or does something drama inducing, the conflict and tension will increase by this amount.
state.NGO.playerDecreaseTemperatureImpact = 1 //The impact that the player has on decreasing the conflict, so if the player helps others or is doing something relaxing, the conflict and tension will decrease by this amount.
state.NGO.threshholdPlayerIncreaseTemperature = 2 //This is the number of conflict words that have to be said by the player in their input in order to increase the temperature.
state.NGO.threshholdPlayerDecreaseTemperature = 2 //This is the number of calming words that have to be said by the player in their input in order to decrease the temperature.

state.NGO.modelIncreaseHeatImpact = 1 //The impact that the AI model has on increasing the conflict.
state.NGO.modelDecreaseHeatImpact = 2 //The impact that the AI model has on decreasing the conflict.
state.NGO.modelIncreaseTemperatureImpact = 1 //The impact that the AI model has on increasing the conflict.
state.NGO.modelDecreaseTemperatureImpact = 1 //The impact that the AI model has on decreasing the conflict.
state.NGO.threshholdModelIncreaseTemperature = 3 //This is the number of conflict words that have to be said by the AI Model in in order to increase the temperature.
state.NGO.threshholdModelDecreaseTemperature = 3 //This is the number of conflict words that have to be said by the AI Model in in order to decrease the temperature.

state.NGO.maximumTemperature = 12 //This is the maximum level of conflict the story can get to. Lower values make for a more calm experience, while higher values can make the story go overboard with the AI trying to kill you at every step. Be careful with this value, as it can get out of hand quite quickly.
state.NGO.trueMaximumTemperature = 15 //This determines the actual maximum temperature, as random explosions can cause the normal maxmium temperature to increase beyond its normal state.NGO. Players cannot cause the temperature to increase beyond the normal maximum. !WARNING! TRUE MAXIMUM TEMPERATURE VALUES ABOVE 15 CAN CAUSE CHAOTIC AND HIGHLY DESTRUCTIVE EVENTS TO RUIN YOUR STORY. ONLY ENABLE VALUES ABOVE 15 IF YOU WANT A REALLY PUNISHING EXPERIENCE.

state.NGO.minimumTemperature = 1 //This determines the lowest value that the player can get the temperature to. Systems like AI influence can reduce it to whatever the true minimum temperature value is.
state.NGO.trueMinimumTemperature = 1 //This determines the true lowest value that the temperature can get to. No system can set the value of the temperature to anything lower.

state.NGO.overheatTimer = 4 //After the maximum temperature is reached, the script will go into overheat mode, meaning that after this many actions, the temperature will start to decrease. This is good if you want your maximum tension point to last multiple actions before calming down.
state.NGO.overheatReductionForHeat = 5 //After the overheat timer is over, the temperature will decrease by this amount. A higher number will make the story much calmer after the maxmium temperature point, a lower number will make the action decrease more gradually.
state.NGO.overheatReductionForTemperature = 1 //After the overheat timer is over, the temperature will decrease by this amount. A higher number will make the story much calmer after the maxmium temperature point, a lower number will make the action decrease more gradually.

state.NGO.cooldownTimer = 5 //After the overheat timer is over, this cooldown timer determines the number of actions the story will take before being able to increase the temperature and conflict again. A higher value will allow the player to have more downtime, a lower value will push the player to jump into the next conflict faster.
state.NGO.cooldownRate = 2 //For each action that the cooldown phase goes for, the temperature will reduce by this amount. A higher value will make the temperature decrease more rapidly, a lower value will make the cooldown more of a gradual slope.

state.NGO.randomExplosionChance = 3 //This determines the percent chance that the story will suddenly have the temperature increased by a large value.
state.NGO.randomExplosionHeatIncreaseValue = 5 //This determines the impact of the random temperature increase. A higher value will make the story suddenly have something crazy happen, a lower value will make more of a mild surprise.
state.NGO.randomExplosionTemperatureIncreaseValue = 2 //This determines the impact of the random temperature increase. A higher value will make the story suddenly have something crazy happen, a lower value will make more of a mild surprise.


/* DONT MODIFY ANYTHING BEYOND THIS POINT */
function randomint(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const conflictWords = ["attack", "stab", "destroy", "break", "steal", "ruin", "burn", "smash", "sabotage", "disrupt", "vandalize", "overthrow", "assassinate", "plunder", "rob", "ransack", "raid", "hijack", "detonate", "explode", "ignite", "collapse", "demolish", "shatter", "strike", "slap", "obliterate", "annihilate", "corrupt", "infect", "poison", "curse", "hex", "summon", "conjure", "mutate", "provoke", "riot", "revolt", "mutiny", "rebel", "resist", "intimidate", "blackmail", "manipulate", "brainwash", "lie", "cheat", "swindle", "disarm", "fire", "hack", "overload", "flood", "drown", "rot", "dissolve", "slaughter", "terminate", "execute", "drama", "conflict", "evil", "kill", "slay", "defeat", "fight", "doom", "slice", "pain", "dying", "die", "perish", "blood"]

const calmingWords = ["calm", "rest", "relax", "meditate", "sleep", "comfort", "hug", "smile", "forgive", "mend", "repair", "plant", "sing", "dance", "celebrate", "collaborate", "share", "give", "donate", "protect", "shelter", "trust", "hope", "dream", "revive", "eat", "drink", "balance", "cheer", "laugh", "play", "build", "bake", "craft", "cook", "empathize", "apologize", "befriend", "admire", "sympathize", "thank", "appreciate", "cherish", "love", "pet", "respect", "restore", "guide", "teach", "learn", "daydream", "wander", "explore", "discover", "reflect", "happy", "joy", "kind", "heal", "help", "assist"]

try {
  InnerSelf("input");
} catch (e) {
  log("IS+NGO input error:", e);
}

const modifier = (text) => {
  const originalText = (typeof text === "string" && text.length > 0) ? text : " ";
  try {
  state.NGO.originalAuthorsNote = ""

  if (state.NGO.heat == undefined){
    state.NGO.heat = state.NGO.initialHeatValue
    state.NGO.cooldownMode = false
    state.NGO.overheatMode = false
  }
  if (state.NGO.storyTemperature == undefined){
    state.NGO.storyTemperature = state.NGO.initialTemperatureValue
  }
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

  if (state.NGO.cooldownMode == false){
    if (conflictCount > 0) {
      state.NGO.heat += conflictCount * state.NGO.playerIncreaseHeatImpact
      if (conflictCount >= state.NGO.threshholdPlayerIncreaseTemperature){
        state.NGO.storyTemperature += conflictCount * state.NGO.playerIncreaseTemperatureImpact
        log(`Detected ${conflictCount} conflict words (Player). Increasing heat & temperature.`)
      }
      else{
        log(`Detected ${conflictCount} conflict words (Player). Increasing heat.`)
      }
    }
    
    if (calmingCount > 0) {
      state.NGO.heat -= calmingCount * state.NGO.playerDecreaseHeatImpact
      if (calmingCount >= state.NGO.threshholdPlayerDecreaseTemperature){
        state.NGO.storyTemperature -= calmingCount * state.NGO.playerDecreaseTemperatureImpact
        log(`Detected ${calmingCount} calming words (Player). Decreasing heat & temperature.`)
      }
      else{
        log(`Detected ${calmingCount} calming words (Player). Decreasing heat.`)
      }
    }
  }

  state.NGO.chance = randomint(1, 100)
  if (state.NGO.chance <= state.NGO.randomExplosionChance){
    state.NGO.heat = state.NGO.heat + state.NGO.randomExplosionHeatIncreaseValue
    state.NGO.storyTemperature = state.NGO.storyTemperature + state.NGO.randomExplosionTemperatureIncreaseValue
    log("!WARNING! Explosion Occured! (+" + state.NGO.randomExplosionHeatIncreaseValue + " heat) (+" + state.NGO.randomExplosionTemperatureIncreaseValue + " temperature)")
  }
  if(state.NGO.cooldownMode == false && state.NGO.overheatMode == false){
    state.NGO.heat = state.NGO.heat + state.NGO.heatIncreaseValue
    log("Heat: " + state.NGO.heat)
  }
  state.NGO.chance = randomint(1, state.NGO.temperatureIncreaseChance)
  if (state.NGO.chance <= state.NGO.heat){
    state.NGO.heat = 0
    state.NGO.storyTemperature = state.NGO.storyTemperature + state.NGO.temperatureIncreaseValue
    log("Temperature Increased. Temperature is now " + state.NGO.storyTemperature)
  }
  if (state.NGO.storyTemperature >= state.NGO.maximumTemperature){
    if (state.NGO.cooldownMode == false && state.NGO.overheatMode == false){
      state.NGO.overheatMode = true
      state.NGO.overheatTurnsLeft = state.NGO.overheatTimer
      log("Overheat Mode Activated")
    }
  }
  if (state.NGO.cooldownMode == true){
    state.NGO.cooldownTurnsLeft --
    log("Cooldown Timer: " + state.NGO.cooldownTurnsLeft)
    state.NGO.storyTemperature = state.NGO.storyTemperature - state.NGO.cooldownRate
    if(state.NGO.cooldownTurnsLeft <= 0){
      state.NGO.cooldownMode = false
      log("Cooldown Mode Disabled")
    }
  }
  else{
    if(state.NGO.overheatMode == true){
      state.NGO.overheatTurnsLeft --
      log("Overheat Timer: " + state.NGO.overheatTurnsLeft)
      if (state.NGO.overheatTurnsLeft <= 0){
        state.NGO.storyTemperature = state.NGO.storyTemperature - state.NGO.overheatReductionForTemperature
        state.NGO.heat = state.NGO.heat - state.NGO.overheatReductionForHeat
        state.NGO.overheatMode = false
        state.NGO.cooldownMode = true
        state.NGO.cooldownTurnsLeft = state.NGO.cooldownTimer
        log("Cooldown Mode Activated")
      }
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

  if (state.NGO.cooldownMode == false){
    log("cooldownMode false, deploying prompt")
  //Non-Optimized Story Prompts
    if (state.NGO.storyTemperature == 1) {
      state.NGO.originalAuthorsNote = "Story Phase: Introduction. Introduce characters and locations. There should be no conflict or tension in the story. "
    }
    if (state.NGO.storyTemperature == 2) {
      state.NGO.originalAuthorsNote = "Story Phase: Introduction. Introduce characters, locations, and plot hooks. There should be only a little conflict and tension in the story unless the player is seeking it out. "
    }
    if (state.NGO.storyTemperature == 3) {
      state.NGO.originalAuthorsNote = "Story Phase: Introduction. Introduce characters, locations, and plot hooks. There should be only minor conflicts. Introduce the possibility of a moderate conflict that could appear far in the future. "
    }
    if (state.NGO.storyTemperature == 4) {
      state.NGO.originalAuthorsNote = "Story Phase: Introduction. Introduce characters, locations, and plot hooks. There should be only minor conflicts. Introduce the possibility of a moderate conflict that could appear far in the future. "
    }
    if (state.NGO.storyTemperature == 5) {
      state.NGO.originalAuthorsNote = "Story Phase: Rising Action. Introduce more minor conflicts. Give minor hints as to what a greater conflict in the far future could be. "
    }
    if (state.NGO.storyTemperature == 6) {
      state.NGO.originalAuthorsNote = "Story Phase: Rising Action. Introduce the occasional moderate conflict. Give minor hints as to what a greater conflict in the far future could be. "
    }
    if (state.NGO.storyTemperature == 7) {
      state.NGO.originalAuthorsNote = "Story Phase: Rising Action. Introduce the occasional moderate conflict. Give minor hints as to what a greater conflict in the far future could be. Introduce conntections to discovered plot hooks. "
    }
    if (state.NGO.storyTemperature == 8) {
      state.NGO.originalAuthorsNote = "Story Phase: Rising Action. Introduce the occasional moderate conflict. Give moderate hints as to what a greater conflict in the far future could be. Introduce conntections to discovered plot hooks. "
    }
    if (state.NGO.storyTemperature == 9) {
      state.NGO.originalAuthorsNote = "Story Phase: Rising Action. Introduce the occasional moderate conflict. Give moderate hints as to what a greater conflict in the far future could be. Introduce conntections to discovered plot hooks. Begin moving the story towards the greater conflict ahead. "
    }
    if (state.NGO.storyTemperature == 10) {
      state.NGO.originalAuthorsNote = "Story Phase: Climax. Introduce the climax of the story. All previous hints about this greater conflict should intersect with this climactic moment. Plot hooks should be connected to this climax. Emphisise major conflict. "
    }
    if (state.NGO.storyTemperature == 11) {
      state.NGO.originalAuthorsNote = "Story Phase: Climax. Plot hooks should be connected to this climax. Emphisise major conflict. Push the characters near their limits while staying fair. "
    }
    if (state.NGO.storyTemperature == 12) {
      state.NGO.originalAuthorsNote = "Story Phase: Climax. Advance the climax of the story, introduce a challenge to go with it. Emphisise major conflict. Push the characters near their limits while staying fair. "
    }
    if (state.NGO.storyTemperature == 13) {
      state.NGO.originalAuthorsNote = "Story Phase: Climax. Advance the climax of the story, introduce challenges to go with it. Emphisise major conflict. Push the characters to their limits. Punish terrible decisions with an appropreate story response. "
    }
    if (state.NGO.storyTemperature == 14) {
      state.NGO.originalAuthorsNote = "Story Phase: Climax. Advance the climax of the story. Emphisise major conflict. Push the characters to their limits. Punish bad decisions while not being unfair. "
    }
    if (state.NGO.storyTemperature == 15) {
      state.NGO.originalAuthorsNote = "Story Phase: Climax. Advance the climax of the story. Emphisise major conflict. Push the characters to their limits. Punish bad decisions that the characters make. Be unfair at times, but make unfairness in the story make sense with the current plot. "
    }
    if (state.NGO.storyTemperature == 16) {
      //!WARNING! IT IS NOT RECOMMENDED FOR YOUR STORY TO GET TO THIS STATE. ONLY ENABLE YOUR TRUE MAXIMUM TEMPERATURE TO THIS VALUE IF YOU REALLY REALLY WANT IT TO BE PUNISHING.
      state.NGO.originalAuthorsNote = "Story Phase: Ultimate Climax. Emphisise increadibly difficult conflict. Push the characters to their limits. Punish bad decisions that the characters make. Be unfair at times. "
    }
    if (state.NGO.storyTemperature == 17) {
      //!WARNING! IT IS NOT RECOMMENDED FOR YOUR STORY TO GET TO THIS STATE. ONLY ENABLE YOUR TRUE MAXIMUM TEMPERATURE TO THIS VALUE IF YOU REALLY REALLY WANT IT TO BE PUNISHING.
      state.NGO.originalAuthorsNote = "Story Phase: Ultimate Climax. Emphisise insanely difficult conflict. Push the characters to their absolute limits. Punish bad decisions that the characters make. Make the challenges unfair for characters. "
    }
    if (state.NGO.storyTemperature == 18) {
      //!WARNING! IT IS NOT RECOMMENDED FOR YOUR STORY TO GET TO THIS STATE. ONLY ENABLE YOUR TRUE MAXIMUM TEMPERATURE TO THIS VALUE IF YOU REALLY REALLY WANT IT TO BE PUNISHING.
      state.NGO.originalAuthorsNote = "Story Phase: Ultimate Climax. Emphisise insanely difficult conflict. Push the characters to their absolute limits. Heavily punish bad decisions that the characters make. Make the challenges increadibly unfair. "
    }
    if (state.NGO.storyTemperature == 19) {
      //!WARNING! IT IS NOT RECOMMENDED FOR YOUR STORY TO GET TO THIS STATE. ONLY ENABLE YOUR TRUE MAXIMUM TEMPERATURE TO THIS VALUE IF YOU REALLY REALLY WANT IT TO BE PUNISHING.
      state.NGO.originalAuthorsNote = "Story Phase: Ultimate Climax. Emphisise impossibly difficult conflict. Push the characters to their absolute limits. Very heavily punish bad decisions that the characters make. Make the challenges increadibly unfair. "
    }
    if (state.NGO.storyTemperature == 20) {
      //!WARNING! IT IS NOT RECOMMENDED FOR YOUR STORY TO GET TO THIS STATE. ONLY ENABLE YOUR TRUE MAXIMUM TEMPERATURE TO THIS VALUE IF YOU REALLY REALLY WANT IT TO BE PUNISHING.
      state.NGO.originalAuthorsNote = "Story Phase: Omega Insane Ultimate Climax of Doom. Emphisise insanely difficult conflict. Push the characters to their absolute limits. Very heavily punish bad decisions that the characters make. Make the challenges increadibly unfair. There is no success. "
    }
    if (state.NGO.storyTemperature > 20) {
      //!WARNING! IT IS NOT RECOMMENDED FOR YOUR STORY TO GET TO THIS STATE. ONLY ENABLE YOUR TRUE MAXIMUM TEMPERATURE TO THIS VALUE IF YOU REALLY REALLY WANT IT TO BE PUNISHING.
      state.NGO.originalAuthorsNote = "Story Phase: Apocalypse. Emphisise impossible conflict. There is no success. Make challenges blatently unfair. Punish every decision. Actively attempt to push the characters away from their goal in any way possible. "
    }
  }
  else{
    log("cooldownMode true, deploying alternate prompt")
  //Cooldown Prompts
    if (state.NGO.storyTemperature <= 1) {
      state.NGO.cooldownMode = false
    }
    if (state.NGO.storyTemperature == 2) {
      state.NGO.originalAuthorsNote = "Story Phase: Downtime. There should be only small bits of tension, with most of the current story being filled with peace and quiet. "
    }
    if (state.NGO.storyTemperature == 3) {
      state.NGO.originalAuthorsNote = "Story Phase: Downtime. There should be only minor tension, with most of the current story being filled with peace and quiet. "
    }
    if (state.NGO.storyTemperature == 4) {
      state.NGO.originalAuthorsNote = "Story Phase: Downtime. There should be only minor tension, with most of the current story being filled with peaceful encounters. "
    }
    if (state.NGO.storyTemperature == 5) {
      state.NGO.originalAuthorsNote = "Story Phase: Downtime. There should be only minor tension, with most of the current story being filled with peaceful encounters, unless characters actively try to cause chaos. "
    }
    if (state.NGO.storyTemperature == 6) {
      state.NGO.originalAuthorsNote = "Story Phase: Downtime. There should be only minor tension and conflict, with most of the current story being filled with peaceful encounters, unless characters actively try to cause chaos."
    }
    if (state.NGO.storyTemperature == 7) {
      state.NGO.originalAuthorsNote = "Story Phase: Downtime. There should be only minor tension and conflict, with most of the current story being filled with neutral encounters, unless characters actively try to cause chaos. "
    }
    if (state.NGO.storyTemperature == 8) {
      state.NGO.originalAuthorsNote = "Story Phase: Downtime. There should be only minor tension and conflict, with most of the current story containing neutral encounters and minor surprises. This section of story should have a satisfying conclusion for its characters. "
    }
    if (state.NGO.storyTemperature == 9) {
      state.NGO.originalAuthorsNote = "Story Phase: Falling Action. The conflicts should be quickly ending, and this section of story should have a satisfying conclusion for its characters. There is still some minor tension and conflict. "
    }
    if (state.NGO.storyTemperature == 10) {
      state.NGO.originalAuthorsNote = "Story Phase: Falling Action. The conflicts should be slowly ending, and this section of story should have a satisfying conclusion for its characters. There is still some moderate tension and conflict. "
    }
    if (state.NGO.storyTemperature == 11) {
      state.NGO.originalAuthorsNote = "Story Phase: Falling Action. The conflicts should be slowly ending, and this section of story should have a satisfying conclusion for its characters. There is still moderate tension and conflict, but not as much as before. "
    }
    if (state.NGO.storyTemperature == 12) {
      state.NGO.originalAuthorsNote = "Story Phase: Falling Action. The conflicts should be slowly ending, and this section of story should have a satisfying conclusion for its characters. There is still moderatly high tension and conflict, but not as much as before. "
    }
    if (state.NGO.storyTemperature == 13) {
      state.NGO.originalAuthorsNote = "Story Phase: Falling Action. The conflicts should be slowly ending. There is still moderatly high tension and conflict, but not as much as before. "
    }
    if (state.NGO.storyTemperature == 14) {
      state.NGO.originalAuthorsNote = "Story Phase: Falling Action. The conflicts should be beginning to come to a close. There is still moderatly high tension and conflict, but not as much as before. "
    }
    if (state.NGO.storyTemperature == 15) {
      state.NGO.originalAuthorsNote = "Story Phase: Falling Action. The conflicts should be beginning to come to a close. Tension and conflict is still high. "
    }
    if (state.NGO.storyTemperature == 16) {
      state.NGO.originalAuthorsNote = "Story Phase: Extreme Falling Action. The conflicts should start to show signs of ending. Tension and conflict is still high. "
    }
    if (state.NGO.storyTemperature == 17) {
      state.NGO.originalAuthorsNote = "Story Phase: Extreme Falling Action. The conflicts should start to show signs of slightly ending. Tension and conflict is still high. "
    }
    if (state.NGO.storyTemperature == 18) {
      state.NGO.originalAuthorsNote = "Story Phase: Extreme Falling Action. The conflicts should start to show signs of slightly ending. Tension and conflict is still very high. "
    }
    if (state.NGO.storyTemperature == 19) {
      state.NGO.originalAuthorsNote = "Story Phase: Extreme Falling Action. Tension and conflict is still very high. "
    }
    if (state.NGO.storyTemperature >= 20) {
      state.NGO.originalAuthorsNote = "Story Phase: Omega Extreme Falling Action. Tension and conflict is still extremely high. "
    }
  }
  // state.NGO.authorsNoteStorage = state.NGO.memory.authorsNote
    const safeText = (typeof text === "string" && text.length > 0) ? text : originalText;
    return { text: safeText };
  } catch (e) {
    log("IS+NGO input modifier error:", e);
    return { text: originalText };
  }
}

modifier(text)
