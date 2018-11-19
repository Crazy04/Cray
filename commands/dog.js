const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const superagent = require('superagent')
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let {body} = await superagent
  .get(`https://random.dog/woof.json`);

  let dogEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Here is your random dog!")
  .setImage(body.url);

  message.channel.send(dogEmbed);

  return;
}

exports.help = {
  name: 'dog',
  description: 'Random dog image!',
  usage: 'dog'
}
