
const Discord = require('discord.js');
const cot = new Discord.Client();

//bot.login(token);

client.on('ready', () => {

    console.log('I am ready!');

});


client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});





client.login(process.env.BOT_TOKEN);