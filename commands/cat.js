const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const superagent = require("superagent");
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let {body} = await superagent
  .get(`http://aws.random.cat/meow`);

  let catEmbed = new Discord.RichEmbed()
  .setColor("RANDOM")
  .setTitle("Here is your random cat!")
  .setImage(body.file);

  message.channel.send(catEmbed);

  return;
}

exports.help = {
  name: 'cat',
  description: 'Random cat image!',
  usage: 'cat'
}
