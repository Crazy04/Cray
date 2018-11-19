const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const moment = require('moment');
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let warnHelp = new Discord.RichEmbed()
  .setTitle("Command Help: Warn")
  .setDescription("Issues a warning to a user.")
  .setColor("RANDOM")
  .addField("Usage", `${prefix}warn [user] [reason]`);

  let wReason = args.slice(1).join(" ");
  let wUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let incidentschannel = message.guild.channels.find(`name`, "logs")
  if(!incidentschannel) return message.channel.send("**Create a logs channel to log moderator commands!**");
  if(wReason.length < 1) return message.channel.send(warnHelp).catch(console.error);
  if(!wUser) return message.channel.send(warnHelp).catch(console.error);

  let warnEmbed = new Discord.RichEmbed()
  .setTitle("Warn")
  .setColor("RANDOM")
  .addField("Warned User", `${wUser} with ID: ${wUser.id}`)
  .addField("Moderator", `${message.author}`)
  .addField("In Channel", message.channel)
  .addField("Time", moment().format('Do MMMM, YYYY [at] hh:mm:ss a'))
  .addField("Reason", wReason)
  .setFooter("Created by Crazy");

  message.delete();
  incidentschannel.send(warnEmbed);
  message.channel.send(":white_check_mark: ***User has been warned!***");

  return;
}

exports.help = {
  name: 'warn',
  description: 'Warn a user!',
  usage: 'warn [mention] [reason]'
}
