var Card = require('./cards.js');

// Hand construction

function Hand() {
  this.cards = new Array();
};

// Hand cannot go over 21

Hand.prototype.limit = 21;

// Adding a card to the Hand

Hand.prototype.add = function(card) {
  if (!card instanceof Card) {
    throw new Error("Tried adding a card that doesn\'t exist")
  }
  this.cards.push(card);
};

// Score of the hand

Hand.prototype.score = function() {
  var score = 0, aces = 0
  this.cards.forEach(function(card) {
    if (card.face == 'A') {
      aces++;
    }
    // Adding to score.
    // If face card, add 10
    if (card.face == 'J' || card.face == 'Q' || card.face == 'K') {
      score += 10;
    // Otherwise if an ace, add 11
    } else if (card.face == 'A') {
      score += 11;
    // Otherwise add cards as regular value.
    } else {
      score += parseInt(card.face, 10);
    }
  });
  // If score is above 21, and aces are available, devalue the aces.
  while (score > 21 && aces > 0) {
    score -= 10;
    aces--;
  }
  return score;
};

Hand.prototype.toString = function() {
  var string = "";

  this.cards.forEach(function(card) {
    string += card.face + " of " + card.suite + "\n";
  });

  return string;
};

Hand.prototype.bust = function() {
  return this.score() > this.limit;
};

module.exports = Hand;
