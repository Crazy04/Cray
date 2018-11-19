const Discord = require('discord.js');
const botconfig = require('../botconfig.json');
const ms = require("ms");
const moment = require('moment');
let prefix = botconfig.prefix;

exports.run = async (bot, message, args) => {
  let muteHelp = new Discord.RichEmbed()
  .setTitle("Command Help: Mute")
  .setColor("RANDOM")
  .setDescription("Mutes a user of specified time.")
  .addField("Usage:", `${prefix}mute [user] [time] [reason]`)
  .setFooter("Created by Crazy", bot.user.avatarURL);

  let mReason = args.slice(2).join(" ");
  let mUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  let incidentschannel = message.guild.channels.find(`name`, "logs");
  let muteRole = message.guild.roles.find('name', 'Muted');
  let muteTime = args[1];
  if(!incidentschannel) return message.channel.send("**Create a logs channel to log moderator commands!**");
  if(!mReason) return message.channel.send(muteHelp);
  if(!mUser) return message.channel.send(muteHelp);
  if(!muteTime) return message.channel.send(muteHelp);

  if(mUser.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.channel.send(":negative_squared_cross_mark: **That user can't be muted!**")
  if(!message.member.hasPermission("MANAGE_ROLES_OR_PERMISSIONS")) return message.channel.send(":negative_squared_cross_mark: **Insufficient permissions!**");

  if(!muteRole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false,
          SPEAK: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }

  let muteEmbed = new Discord.RichEmbed()
  .setTitle("Mute")
  .setColor("#FF0000")
  .addField("Muted User", `${mUser} with ID: ${mUser.id}`)
  .addField("Moderator", `${message.author}`)
  .addField("In Channel", message.channel)
  .addField("Reason", mReason)
  .addField("Length", muteTime)
  .addField("Time", moment().format('Do MMMM, YYYY [at] hh:mm:ss a'))
  .setFooter("Created by Crazy");

  let unmuteEmbed = new Discord.RichEmbed()
  .setTitle("Unmute")
  .setColor("#FF0000")
  .addField("Unmuted User", `${mUser}`)
  .addField("Moderator", "Auto")
  .addField("Reason", "Auto")
  .addField("Time", moment().format('Do MMMM, YYYY [at] hh:mm:ss a'))
  .setFooter("Created by Crazy");

  await(mUser.addRole(muteRole.id));
  message.delete(500).catch(console.error);
  message.channel.send(":white_check_mark: ***User has been muted!***");
  incidentschannel.send(muteEmbed);

  setTimeout(function(){
    mUser.removeRole(muteRole.id);
    message.channel.send(`**${mUser}, You have been unmuted!**`);
    incidentschannel.send(unmuteEmbed);
  }, ms(muteTime));

  return;
}

exports.help = {
  name: 'mute',
  description: 'Mute a user!',
  usage: 'mute [mention] [time] [reason]'
}
