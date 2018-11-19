const config = require("./botconfig.json");
const token = require("./token.json");
const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const fs = require('fs');
let prefix = config.prefix;
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {
  if(err) console.log(err);
  console.log(`Loading ${files.length} commands...`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers, serving ${bot.users.size} users.`);
  bot.user.setActivity(`${bot.users.size} users. | Prefix: ${prefix}`, {type: "WATCHING"});
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let content = message.content.split(" ");
  let cmd = content[0];
  let args = content.slice(1);

  if (cmd.startsWith(prefix)) {
    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(bot, message, args);
  }
});

bot.login(token.token);
