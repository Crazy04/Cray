const Discord = require('discord.js');
const config = require('../botconfig.json');
const moment = require('moment');
let prefix = config.prefix;

exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let bReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(":negative_squared_cross_mark: **Insufficient permissions!**");

  let banHelp = new Discord.RichEmbed()
  .setTitle("Command Help: Ban")
  .setDescription("Ban a member from the server.")
  .setThumbnail("https://cdn.discordapp.com/attachments/498663430798966795/499418754732654612/heavy-exclamation-mark-symbol_2757.png")
  .setColor("RANDOM")
  .addField("Usage:", `${prefix}ban [user] [reason]`);

  let banembed = new Discord.RichEmbed()
  .setTitle("Ban")
  .setColor("RANDOM")
  .addBlankField("Banned User", `${bUser}`)
  .addField("Banned By", `${message.author} with ID: ${message.author.id}`)
  .addField("In Channel", message.channel)
  .addBlankField("For Reason", bReason)
  .addField("Time", message.createdAt);

  if(!bReason) return message.channel.send(banHelp);
  if(!bUser) return message.channel.send(banHelp);
  if(bUser.hasPermission("BAN_MEMBERS")) return message.channel.send(":negative_squared_cross_mark: **That user can't be banned!**");

  let incidentschannel = message.guild.channels.find(`name`, "logs")
  if(!incidentschannel) return message.channel.send("**Create a logs channel to log kicks and bans!**")

  let banembed1 = new Discord.RichEmbed()
  .setTitle("Ban")
  .setColor("RANDOM")
  .addField("Banned User", `${bUser} with ID: ${bUser.id}`)
  .addField("Banned By", `${message.author} with ID: ${message.author.id}`)
  .addField("In Channel", message.channel)
  .addField("For Reason", bReason)
  .addField("Time", moment().format('Do MMMM, YYYY [at] hh:mm:ss a'));

  message.guild.member(bUser).ban(bReason);
  message.delete();
  incidentschannel.send(banembed1);
  message.channel.send(":white_check_mark: ***User has been banned!***");
}

exports.help = {
  name: 'ban',
  description: 'Ban a user!',
  usage: 'ban'
}
