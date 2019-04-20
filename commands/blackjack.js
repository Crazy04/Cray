const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
let prefix = botconfig.prefix;
var bjGames = new Array();

exports.run = async (bot, message, args) => {
  var Deck = require('../blackjack/deck.js');
  var Hand = require('../blackjack/hand.js');

  function BlackJack(bet, callback) {
    this.bet = bet;
    this.deck = new Deck().shuffle();
    this.player = new Hand();
    this.dealer = new Hand();

    this.player.add(this.deck.draw());
    this.player.add(this.deck.draw());

    this.dealer.add(this.deck.draw());


    let blackjackEmbed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setTitle(`BlackJack Game`)
    .setDescription("Type `hit` to draw another card or `stand` to pass.")
    .setColor("#ADD8E6")
    .addField(`**Your Hand**`, this.player.toString() + `\n**Total Points:** ${this.player.score()}`, true)
    .addField(`**Dealer\'s Hand**`, this.dealer.toString() + `?\n\n**Total Points:** ${this.dealer.score()}`, true)
    .setTimestamp();
    message.channel.send(blackjackEmbed);

    this.dealer.add(this.deck.draw());

    console.log(`${message.author.tag} started a game of BlackJack.`);
    console.log(`${message.author.tag}\'s Hand:` + this.player.toString());
    console.log(`${message.author.tag}\'s Bot\'s Hand:` + this.dealer.toString());
  };

  // Playing function. 0 = game continues, 1 = player wins, 2 = bot wins
  BlackJack.prototype.play = function(hit, callback) {
    if (hit) {
      console.log(`${message.author.tag} hit.`);
      this.player.add(this.deck.draw());
      if (this.player.bust()) {
        console.log(`${message.author.tag} busted on hit`);
        s = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`BlackJack Game`)
        .setDescription("You busted!")
        .setColor("#ADD8E6")
        .addField(`**Your Hand**`, this.player.toString() + `\n**Total Points:** ${this.player.score()}`, true)
        .addField(`**Dealer\'s Hand**`, this.dealer.toString() + `?\n\n**Total Points:** ${this.dealer.score()}`, true)
        .setTimestamp();
        return callback(2, s);
      } else {
        s = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`BlackJack Game`)
        .setDescription("Type `hit` to draw another card or `stand` to pass.")
        .setColor("#ADD8E6")
        .addField(`**Your Hand**`, this.player.toString() + `\n**Total Points:** ${this.player.score()}`, true)
        .addField(`**Dealer\'s Hand**`, this.dealer.toString() + `?\n\n**Total Points:** ${this.dealer.score()}`, true)
        .setTimestamp();
        return callback(0, s);
      }
    } else {
      console.log(`${message.author.tag} stood`);
      if (this.dealer.score() > this.player.score() && !this.dealer.bust()) {
        s = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`BlackJack Game`)
        .setDescription("You lost!")
        .setColor("#ADD8E6")
        .addField(`**Your Hand**`, this.player.toString() + `\n**Total Points:** ${this.player.score()}`, true)
        .addField(`**Dealer\'s Hand**`, this.dealer.toString() + `\n**Total Points:** ${this.dealer.score()}`, true)
        .setTimestamp();
        return callback(2, s);
      }
      while (!this.dealer.bust() && this.dealer.score() <= this.player.score()) {
        this.dealer.add(this.deck.draw());
        console.log(`${message.author.tag}\'s Bot\'s Hand:` + this.dealer.toString());
        s = new Discord.RichEmbed()
        .setAuthor(message.author.tag, message.author.avatarURL)
        .setTitle(`BlackJack Game`)
        .setDescription("Bot draws a card.")
        .setColor("#ADD8E6")
        .addField(`**Your Hand**`, this.player.toString() + `\n**Total Points:** ${this.player.score()}`, true)
        .addField(`**Dealer\'s Hand**`, this.dealer.toString() + `\n**Total Points:** ${this.dealer.score()}`, true)
        .setTimestamp();

        if (this.dealer.bust()) {
          console.log(`${message.author.tag}\'s bot bust`);
          s = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle(`BlackJack Game`)
          .setDescription("You win!")
          .setColor("#ADD8E6")
          .addField(`**Your Hand**`, this.player.toString() + `\n**Total Points:** ${this.player.score()}`, true)
          .addField(`**Dealer\'s Hand**`, this.dealer.toString() + `\n**Total Points:** ${this.dealer.score()}`, true)
          .setTimestamp();
          return callback(1, s);
        }

        if (!this.dealer.bust() && this.dealer.score() > this.player.score()) {
          console.log(`${message.author.tag}\'s bot won`);
          s = new Discord.RichEmbed()
          .setAuthor(message.author.tag, message.author.avatarURL)
          .setTitle(`BlackJack Game`)
          .setDescription("You lost!")
          .setColor("#ADD8E6")
          .addField(`**Your Hand**`, this.player.toString() + `\n**Total Points:** ${this.player.score()}`, true)
          .addField(`**Dealer\'s Hand**`, this.dealer.toString() + `\n**Total Points:** ${this.dealer.score()}`, true)
          .setTimestamp();
          return callback(2, s);
        }
      }
    }
  }

  if (!bjGames[message.author.id]) {
    bjGames[message.author.id] = new BlackJack();
    const filter = m => m.author.id === message.author.id && m.content === "hit" || m.content === "stand";
    const collector = message.channel.createMessageCollector(filter);
    collector.on('collect', m => {
      if (m.content === "hit") {
        bjGames[message.author.id].play(true, function(status, string) {
          if (status == 0) {
            message.channel.send(string)
          };
          if (status == 2) {
            message.channel.send(string);
            delete bjGames[message.author.id];
            collector.stop();
          };
        })
      } else if (m.content === "stand") {
        bjGames[message.author.id].play(false, function(status, string) {
          if (status == 1) {
            message.channel.send(string);
            delete bjGames[message.author.id]
            collector.stop()
          }
          if (status == 2) {
            message.channel.send(string);
            delete bjGames[message.author.id]
            collector.stop()
          }
        })
      } else {
        return;
      }
    });
  } else {
    message.channel.send("**You are already in a game! Finish the current game bafore starting another one!**");
  };
}

exports.help = {
  name: 'blackjack',
  description: 'Play Blackjack with the bot!',
  usage: 'blackjack [bet]'
}
