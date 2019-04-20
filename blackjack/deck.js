var exports = module.exports = {};
const Card = require('./cards.js');

// Deck construction

var cards;
var Deck = function() {
  var self = this;
  cards = new Array();
  Card.prototype.suites.forEach(function(suite) {
    Card.prototype.faces.forEach(function(face) {
      cards.push(new Card(face, suite));
    });
  });
};
Deck.prototype.constructor = Deck;

// Drawing a card

Deck.prototype.draw = function() {
  return cards.pop();
};

// Shuffling the Deck

Deck.prototype.shuffle = function() {
  for (var j, x, i = cards.length; i; j = Math.floor(Math.random() * i), x = cards[--i], cards[i] = cards[j], cards[j] = x);
  return this;
};

module.exports = Deck;
