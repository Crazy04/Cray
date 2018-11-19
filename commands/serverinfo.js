const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const moment = require('moment');
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let sicon = message.guild.iconURL;
  let serverembed = new Discord.RichEmbed()
  .setDescription("Server Information")
  .setColor("RANDOM")
  .setThumbnail(sicon)
  .addField("Server Name", message.guild.name)
  .addField("Created On", moment(message.guild.createdAt).format("Do MMMM, YYYY [at] hh:mm:ss a"))
  .addField("You Joined", moment(message.member.joinedAt).format("Do MMMM, YYYY [at] hh:mm:ss a"))
  .addField("Member Count", message.guild.memberCount)
  .setFooter(`Server Information requested by ${message.author.username}`, message.author.avatarURL);

  return message.channel.send(serverembed);
}

exports.help = {
  name: 'serverinfo',
  description: 'Displays information about the server',
  usage: 'serverinfo'
}
