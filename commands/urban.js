const Discord = require("discord.js");
const urban = require("relevant-urban");

exports.run = async (bot, message, args) => {
  if(!args[0]) return message.channel.send("**Please tell me what to search for!**");

  let result = await urban(args.join(" ")).catch(e => {
    return message.channel.send("**I could not find that word!**");
  });

  let dictionary = new Discord.RichEmbed()
  .setColor("#36393E")
  .setTitle(result.word)
  .setURL(result.urbanURL)
  .setDescription(`**Definition:**\n${result.definition}\n\n**Example:**\n${result.example}\n\n${result.thumbsUp} Likes | ${result.thumbsDown} Dislikes`)
  .setFooter(`Requested by ${message.author.username}`, message.author.avatarURL)
  .setTimestamp();

  message.channel.send(dictionary);
};

exports.help = {
  name: 'ud',
  description: 'Searches the urban dictionary.',
  usage: 'ud [search term]'
};
