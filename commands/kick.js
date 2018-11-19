const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const moment = require('moment');
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let kReason = args.join(" ").slice(22);
  if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send(":negative_squared_cross_mark: **Insufficient permissions!**");

  let kickHelp = new Discord.RichEmbed()
  .setTitle("Command Help: Kick")
  .setDescription("Kick a member from the server.")
  .setThumbnail("https://cdn.discordapp.com/attachments/498663430798966795/499418754732654612/heavy-exclamation-mark-symbol_2757.png")
  .setColor("RANDOM")
  .addField("Usage:", `${prefix}kick [user] [reason]`)
  .addFooter(`Requested by ${message.author.username}`, message.author.avatarURL);

  if (!kReason) {
    return message.channel.send(kickHelp);
  } else if (!kUser) {
    return message.channel.send(kickHelp);
  } else if (kUser.hasPermission("KICK_MEMBERS")) {
    return message.channel.send(":negative_squared_cross_mark: **That user can't be kicked!**");
  } else {
    let incidentschannel = message.guild.channels.find(`name`, "logs");
    if(!incidentschannel) return message.channel.send("**Create a logs channel to log kicks and bans!**");

    let kickembed1 = new Discord.RichEmbed()
    .setTitle("Kick")
    .setColor("RANDOM")
    .addField("Kicked User", `${kUser} with ID: ${kUser.id}`)
    .addField("Kicked By", `${message.author} with ID: ${message.author.id}`)
    .addField("In Channel", message.channel)
    .addField("For Reason", kReason)
    .addField("Time", moment().format('Do MMMM, YYYY [at] hh:mm:ss a'));

    message.guild.member(kUser).kick(kReason);
    message.delete(500).catch(console.error);
    incidentschannel.send(kickembed1);
    message.channel.send(":white_check_mark: ***User has been kicked!***");
  }
}

exports.help = {
  name: 'kick',
  description: 'Kick a user!',
  usage: 'kick [mention] [reason]'
}
