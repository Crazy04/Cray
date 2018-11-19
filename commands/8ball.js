const Discord = require('discord.js');
const config = require("../botconfig.json");
let prefix = config.prefix;

exports.run = async (bot, message, args) => {
  let ballHelp = new Discord.RichEmbed()
  .setTitle("Command Help: 8Ball")
  .setDescription("Ask a question and get a response!")
  .setColor("RANDOM")
  .setThumbnail("https://images.emojiterra.com/twitter/v11/512px/1f52e.png")
  .addField("Usage:", `${prefix}8ball [question]`);


  if(!args[0]) return message.channel.send(ballHelp);
  let replies = ["Yes", "It is certain", "Outlook good", "Most likely", "Without a doubt", "Maybe", "Ask again later", "Reply hazy, try again", "Better not tell you now", "Concentrate and ask again", "No", "Very doubtful", "Outlook not so good", "Don't count on it", "Unlikely", "Yeah and I'm the Pope", "As if I care", "Whatever", "In your dreams", "сука блять"];
  let result = Math.floor((Math.random() * replies.length));
  let question = args.slice(0).join(" ");

  let ballembed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("RANDOM")
  .setThumbnail("https://cdn.discordapp.com/attachments/498709917180624917/499392349957259274/8-Ball_Pool.svg.png")
  .addField(":8ball: Question:", question)
  .addField(":8ball: Answer:", replies[result]);

  message.channel.send(ballembed);
}

exports.help = {
  name: '8ball',
  description: 'Ask and ye shall receive',
  usage: '8ball'
};
