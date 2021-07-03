module.exports = [
  {
    owner_id: 1,
    all_cards: '[]',
    current_deck: '[]',
    health: 0,
    items: '[]'
  }
];








// {
// The owner_id points to the user that owns this player object. Users will be only allowed one object, for the time being (stretch goal to add multiple 'save files' per user)
//     owner_id: 1,

// The all_cards is an array of all of the cards a player has previously seen. This does not change in between 'runs' (a play through of the five combats) and the player will be able to look at this library of cards outside of the run.
//     all_cards: [],

// The current_deck is an array that consists of a random selection of 12 minor arcana cards. These cards are immediately added to the all_cards array if not already present. These cards reset inbetween runs.
//     current_deck: [],

// The health is a value that tracks the player's health throughout a single run. Every time a run ends, whether that be through success or failure, the health value is reset and the player is taken back to the home page.
//     health: 0,

// The items is an array where stretch goals live for now. When implemented, they will be items that allow special effects to occur outside of the normal flow of combat; ie, items do not end your turn when used (unlike normal cards).
//     items: []
// }