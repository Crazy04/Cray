const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let unmuteHelp = new Discord.RichEmbed()
  .setTitle("Command Help: Unmute")
  .setColor("RANDOM")
  .setDescription("Unmutes a muted user")
  .addField("Usage:", `${prefix}unmute [user] [reason]`)
  .setFooter(" | Created by Crazy", bot.user.avatarURL);

  let umUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let umReason = args.slice(1).join(" ");
  let incidentschannel = message.guild.channels.find(`name`, "logs");
  let muteRole = message.guild.roles.find('name', 'Muted');
  if(!umUser) return message.channel.send(unmuteHelp);
  if(!umReason) return message.channel.send(unmuteHelp);
  if(!umUser.roles.has(muteRole.id)) return message.channel.send(":negative_squared_cross_mark: **That user is not muted!**")

  let unmuteEmbed = new Discord.RichEmbed()
  .setTitle("Unmute")
  .setColor("#FF0000")
  .addField("Unmuted User", `${umUser}`)
  .addField("Moderator", message.author)
  .addField("Reason", umReason)
  .addField("Time", moment().format('Do MMMM, YYYY [at] hh:mm:ss a'))
  .setFooter("Created by Crazy");

  umUser.removeRole(muteRole.id);
  message.delete(500).catch(console.error);
  message.channel.send(`:white_check_mark: **${umUser} has been unmuted!**`);
  incidentschannel.send(unmuteEmbed);
}

exports.help = {
  name: 'unmute',
  description: 'Unmute a user!',
  usage: 'unmute [mention] [reason]'
}
