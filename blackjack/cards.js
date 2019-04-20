// Card creation

var Card = function(face, suite) {
  if (this.faces.indexOf(face) == -1) {
    throw new Error("Invalid Face:" + face);
  }
  if (this.suites.indexOf(suite) == -1) {
    throw new Error("Invalid Suit:" + suite);
  }

  this.face = face;
  this.suite = suite;
};

Card.prototype.faces = [ 'A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K' ];
Card.prototype.suites = [ 'Hearts', 'Spades', 'Diamonds', 'Clubs' ];

module.exports = Card;
