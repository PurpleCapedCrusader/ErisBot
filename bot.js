
const Discord = require('discord.js');
const bot = new Discord.Client();
const PREFIX = '!';

bot.on('ready', () => {
    console.log('Eris is ready!');
});

bot.on('message', message => {

    let args = message.content.substring(PREFIX.length).split(" ");

    switch (args[0]) {
        case 'ping':
            message.channel.send('pong')
            break;
        case 'eris':
            message.channel.send('https://en.wikipedia.org/wiki/Eris_(mythology)')
            break;
        default:

    }

})
    bot.login(process.env.BOT_TOKEN);





