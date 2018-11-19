const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let bicon = bot.user.displayAvatarURL;

  let helpEmbed = new Discord.RichEmbed()
  .setTitle("Help")
  .setDescription("A list of commands for Cray! | Prefix: `..`")
  .setThumbnail(bicon)
  .setColor("BLURPLE")
  .addField("> Information", "`botinfo`  `ping`  `serverinfo`")
  .addField("> Fun", "`8ball`  `dog`  `cat`  `avatar`")
  .addField("> Moderation", "`kick`  `ban`  `mute`  `unmute`  `warn`")
  .setFooter("Created by Crazy");

  if (!args[0]) {
    return message.channel.send(helpEmbed);
  } else if (args[0] === "kick") {
    let kickembed = new Discord.RichEmbed()
    .setTitle("Command Help: Kick")
    .setDescription(`*Kick a user from the server.*\n**Usage**: ${prefix}kick [user] [reason]\n**Example**: ${prefix}kick @Crazy Get outta here!`)
    .setColor("RED")
    .setThumbnail("https://cdn.discordapp.com/attachments/498663430798966795/499418754732654612/heavy-exclamation-mark-symbol_2757.png")
    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
    return message.channel.send(kickembed);
  } else if (args[0] === "ban") {
    let banembed = new Discord.RichEmbed()
    .setTitle("Command Help: Ban")
    .setDescription(`*Ban a user from the server.*\n**Usage**: ${prefix}ban [user] [reason]\n**Example**: ${prefix}ban @Crazy Get outta here!`)
    .setColor("RED")
    .setThumbnail("https://cdn.discordapp.com/attachments/498663430798966795/499418754732654612/heavy-exclamation-mark-symbol_2757.png")
    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
    return message.channel.send(banembed);
  } else if (args[0] === "mute") {
    let muteembed = new Discord.RichEmbed()
    .setTitle("Command Help: Mute")
    .setDescription(`*Mute a user for a time period.*\n**Usage**: ${prefix}mute [user] [time] [reason]\n**Example**: ${prefix}mute @Crazy 10m Be gone!`)
    .setColor("RED")
    .setThumbnail("https://cdn.discordapp.com/attachments/498663430798966795/499418754732654612/heavy-exclamation-mark-symbol_2757.png")
    .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL);
    return message.channel.send(muteembed);
  }
}

exports.help = {
  name: 'help',
  description: 'Displays commands for the bot',
  usage: 'help'
}
