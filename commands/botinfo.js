const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;
  let botembed = new Discord.RichEmbed()
  .setTitle("Bot Information")
  .setColor("RANDOM")
  .setThumbnail(bicon)
  .addField("Bot Name", bot.user.username)
  .addField("Prefix", `${prefix}`)
  .addField("Created On", "Monday 08 Oct 2018")
  .addField("Created By", "Crazy#7486")
  .setFooter(`Bot Information requested by ${message.author.username}`, message.author.avatarURL);

  return message.channel.send(botembed);
}

exports.help = {
  name: 'botinfo',
  description: 'Displays information about the bot',
  usage: 'botinfo'
}
