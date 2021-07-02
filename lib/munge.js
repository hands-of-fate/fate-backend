/* eslint-disable indent */
function mungeTarot(arg) {
    const tarotItem = arg.cards;
    //console.log(arg);
    const mungedTarotCards = tarotItem.map(card => {
        return {
            name: card.name,
            type: card.type,
            value: card.value_int,
            suit: card.suit,
            meaning: card.meaning_up,
            meaningReverse: card.meaning_rev
        };
    });
    return mungedTarotCards;
}
module.exports = { mungeTarot };