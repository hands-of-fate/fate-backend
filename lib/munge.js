/* eslint-disable indent */
function mungeTarot(arg) {
    const tarotItem = arg.cards;
    //console.log(arg);
    // here's a shortcut if you want to return an object from an arrow function
    return tarotItem.map(card => ({
            name: card.name,
            type: card.type,
            value: card.value_int,
            suit: card.suit,
            meaning: card.meaning_up,
            meaningReverse: card.meaning_rev
    }));
}
module.exports = { mungeTarot };