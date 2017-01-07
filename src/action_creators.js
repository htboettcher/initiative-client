export function setState(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function setPlayerRoll(playerName, roll) {
  return {
    meta: {remote: true},
    type: 'SET_PLAYER_ROLL',
    playerName,
    roll,
  };
}

export function setPlayerInitBonus(playerName, initBonus) {
  return {
    meta: {remote: true},
    type: 'SET_PLAYER_INIT_BONUS',
    playerName,
    initBonus,
  };
}

export function setMonsterRoll(monsterName) {
  return {
    meta: {remote: true},
    type: 'SET_MONSTER_ROLL',
    monsterName
  };
}

export function addCard(entry) {
  return {
    meta: {remote: true},
    type: 'ADD_CARD',
    entry
  };
}

export function removeCard(cardToRemove) {
  return {
    meta: {remote: true},
    type: 'REMOVE_CARD',
    cardToRemove
  };
}

export function updateCombatant(cardToUpdate, newData) {
  return {
    meta: {remote: true},
    type: 'UPDATE_COMBATANT',
    cardToUpdate,
    newData
  };
}

export function delayCard(cardToTrail) {
  return {
    meta: {remote: true},
    type: 'DELAY_CARD',
    cardToTrail
  };
}

export function setNonCombatantRoll(nonCombatantName) {
  return {
    meta: {remote: true},
    type: 'SET_NON_COMBATANT_ROLL',
    nonCombatantName
  };
}

export function setXOfMonsters(monster, monsterCount) {
  return {
    meta: {remote: true},
    type: 'SET_X_MONSTERS',
    monster,
    monsterCount
  };
}

export function nextCard() {
  return {
    meta: {remote: true},
    type: 'NEXT_CARD'
  };
}

export function startCombat() {
  return {
    meta: {remote: true},
    type: 'START_COMBAT'
  };
}

export function saveToDB(id, data) {
  return {
    meta: {remote: true},
    type: 'REQUEST_SAVE_TO_DB',
    id: id,
    col: 'players',
    data: data
  }
}