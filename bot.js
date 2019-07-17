
const Discord = require('discord.js');
const bot = new Discord.Client();

bot.login(process.env.BOT_TOKEN);

bot.on('ready', () => {

    console.log('I am ready!');

});


bot.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});





