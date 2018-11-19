const Discord = require('discord.js');

exports.run = async (bot, message, args) => {
  let aUser = message.mentions.users.first() || message.guild.members.get(args[0]);
  let author = message.author;

  if (!aUser) {
    let avatarEmbed1 = new Discord.RichEmbed()
    .setAuthor(author.username, author.avatarURL)
    .setTitle(`${author.username}'s Avatar`)
    .setURL(author.avatarURL)
    .setImage(author.avatarURL);

    return message.channel.send(avatarEmbed1);
  } else {
    let avatarEmbed = new Discord.RichEmbed()
    .setAuthor(aUser.username, aUser.avatarURL)
    .setTitle(`${aUser.username}'s Avatar`)
    .setURL(aUser.avatarURL)
    .setImage(aUser.avatarURL);

    return message.channel.send(avatarEmbed);
  }
};

exports.help = {
  name: 'avatar',
  description: 'Displays a user\'s avatar',
  usage: 'avatar'
}
