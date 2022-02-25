const Discord = require("discord.js");
const config = require("./config.json");

function help(message) {
  var embed = new Discord.MessageEmbed()
    .setColor("0xd9ff00")
    .addField(
      `Bot help coming soon\n\u200b`
    );
  message.channel.send(embed).catch(console.error);
}

function invite(message) {
  message.channel.send(
    "Send this link to your friends so they can join us: https://discord.dicethrone.com"
    ).catch(console.error);
}

function welcome(member) {
  const embed = new Discord.MessageEmbed()
    .setColor("0xd9ff00")
    .setTitle("Welcome")
    .addField(
      `GLAD YOU'RE HERE!!`,
      `I'm DiceThroneBot.\n\u200b` +
      `Thank you for joining our server!!\n\u200b` +
      `Use the commands below to interact with me.\n\u200b`
    )
    .addField(
      `LIST OF COMMANDS`,
      `**!help** - There's no need to remember all of these commands. Use !help to bring up this list.\n\u200b`
    )
    .addField(
      `HERO, TOKEN, and CARD INFORMATION`,
      `**!barbarian** - information about the Barbarian... this works for all Heroes, Tokens, and Cards\n\u200b`
    )
    .addField(
      `SET YOUR GOD ROLE IN THE MEMBER LIST`,
      `**!role HeroName** - !role barbarian, for example, will add or remove the Barbarian role. You will appear in the Member List in your first role alphabetically. This command only works while in the #DiceThroneBot channel.\n\u200b`
    )
    .addField(
      `INVITE YOUR FRIENDS`,
      `**!invite** - discord server invite link\n\u200b`
    );
  member.send(embed).catch(console.error);
}

module.exports = {
  help,
  invite,
  welcome
}