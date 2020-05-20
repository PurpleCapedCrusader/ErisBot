const Discord = require('discord.js');
// const express = require('express');
const config = require("./config.json");
var dbCreds = require('./dbCreds.js');
var lowerCase = require('lower-case');
var check = require('check-types');
const databaseCheck = require('./databaseBuilder.js');
const fs = require("fs");
const bot = new Discord.Client();
const PREFIX = config.prefix;
// const { Client } = require('pg');
// const client = new Client (dbCreds);
const {Pool} = require('pg');
const pool = new Pool(dbCreds);

let godArray = [
    "apollo", "artemis", "athena", "atlas", "demeter",
    "hephaestus", "hermes", "minotaur", "pan", "prometheus",
    "aphrodite", "ares", "bia", "chaos", "charon", "chronus",
    "circe", "dionysus", "eros", "hera", "hestia", "hypnus",
    "limus", "medusa", "morpheus", "persephone", "poseidon",
    "selene", "triton", "zeus", "aeolus", "charybdis", "clio",
    "europaandtalus", "gaea", "graeae", "hades", "harpies",
    "hecate", "moerae", "nemesis", "siren", "tartarus",
    "terpsichore", "urania", "achilles", "adonis", "atalanta",
    "bellerophon", "heracles", "jason", "medea", "odysseus",
    "polyphemus", "theseus", "asteria", "castorandpollux",
    "eris", "hippolyta", "iris", "maenads", "pegasus",
    "proteus", "scylla", "tyche", "hydra", "nyx"];

// Ready statement
bot.on('ready', () => {
    console.log(`${GetTimeStamp()} :: ErisBot is ready to serve on ${bot.guilds.cache.size} servers, for ${bot.users.cache.size} users.`)
    updateStatus()
    databaseCheck.createDatabaseTablesIfNotExist;
});

// error catch-all
bot.on("error", (e) => console.error(`${GetTimeStamp()} :: ${e}`));
bot.on("warn", (e) => console.warn(`${GetTimeStamp()} :: ${e}`));
bot.on("debug", (e) => console.info(`${GetTimeStamp()} :: ${e}`));

// Link to God data
bot.godData = require("./godData.json");

// JOIN ME ONLINE Interval check
setInterval(function () {
    removeTempOnlineRole()
}, 60000);// 60000 = 1min

setInterval(function () {
    updateStatus()
}, 900000);// 60000 = 1min

bot.on('guildMemberAdd', member => {
    const embed = new Discord.MessageEmbed()
        .setColor("0xd9ff00")
        .setTitle('Welcome')
        .addField(`GLAD YOU'RE HERE!!`,
        `I'm ErisBot, the God of discord... srsly, I am.\n\u200b` +
        `Thank you for joining our Santorini server!!\n\u200b` +
        `Use the commands below to interact with me.`)
        .addField(`GOD INFORMATION`,
        `**!apollo** - information about Apollo... this works for all Gods and Heroes`)
        .addField(`FIND ONLINE OPPONENTS`,
        `**!online 20** - Enables NotifyOn for you and sends a DM to everyone with NotifyOn enabled, explaining that you're available to play for the number of minutes you specify (up to 60).\n\u200b` +
        `**!NotifyOn** - Use this to get notified when someone uses the !Online command.\n\u200b` +
        `**!NotifyOff** - Use this to stop getting notified when someone uses the !Online command.`)
        .addField(`SET YOUR GOD ROLE IN THE MEMBER LIST`,
        `**!iamGodName** - !iamApollo, for example, will add or remove the Apollo role. You will appear in the Member List in your first role alphabetically. This command only works while in the #eris-bot channel.\n\u200b` +
        `**!**❤️ - Give some love to ErisBot`)
        .addField(`GOD LISTS`,
        `**!update-list** list of powers updated for the app\n\u200b` +
        `**!order** - Power Order Aid for 2-Player Games\n\u200b` +
        `**!NotInApp** - list of Gods that aren't currently supported in the app`)
        .addField(`GAME RULES & DEFINITIONS`,
        `**!rules** - game rules\n\u200b` +
        `**!force** - definition of force from rulebook\n\u200b` +
        `**!move** - definition of move from rulebook\n\u200b` +
        `**!build** - definition of build from rulebook\n\u200b` +
        `**!win** - definition of win from rulebook\n\u200b` +
        `**!dome** - definition of dome from rulebook\n\u200b` +
        `**!tournament** - basic guidelines for our tournaments\n\u200b` +
        `**!board** - image of the board with space notation`)
        .addField(`INVITE YOUR FRIENDS`,
        `**!invite** - discord server invite link\n\u200b` +
        `**!app** - links to the Santorini app on the Apple App store and the Google Play store`)
        .addField(`GAME LOGS`,
        `**!log** - location of log files on Android devices`);
    member.send(embed).catch(console.error);
});

// Main Args/Response 
bot.on('message', (message) => {

    if (!message.author.bot) {
        if (message.channel.type === "dm") {
            dmArchive(message)
        } else {
            messageArchive(message)
        }
    }

    if (!message.content.startsWith(PREFIX) || message.author.bot) {
        return;
    }

    if (message.content === '!react') {
        message.react('521813888392626216');
    }

    // Add God Role (remove old god role if exists)
    if (message.content.slice(0, 4).toLowerCase() === '!iam') {
        if (message.channel.name === 'eris-bot') {
            let lastLetter = message.content.length;
            let roleRequested = message.content.slice(4, lastLetter).toLowerCase();

            if (roleRequested.slice(0, 6) === 'castor') {
                roleRequested = 'castor & pollux';
            };

            if (roleRequested.slice(0, 6) === 'europa') {
                roleRequested = 'europa & talus';
            };

            if (message.guild.roles.cache.some(r => roleRequested.includes(r.name))) {
                if (message.member.roles.cache.some(r => roleRequested.includes(r.name))) { // has one of the roles
                    let member = message.member;
                    const getGodRole = member.roles.cache.find(role => roleRequested.includes(role.name)); //get name of current God Role
                    member.roles.remove(getGodRole).catch(console.error);
                    message.channel.send(message.author.username + " has left the " + roleRequested + " role group.")
                } else {
                    let member = message.member;
                    const getGodRole = message.guild.roles.cache.find(role => roleRequested.includes(role.name));
                    member.roles.add(getGodRole).catch(console.error);
                    message.channel.send(message.author.username + " has joined the " + roleRequested + " role group.")
                }
            } else {
                message.channel.send(roleRequested + " isn\'t a role. Please check the spelling and try again.")
            }
        } else {
            message.channel.send("Head over to the #eris-bot channel for role updates.")
        }
    };

    // Add Online Role and remove after a time
    if (message.content.slice(0, 7).toLowerCase() === '!online') {
        if (message.channel.name === 'eris-bot') {
            const args = message.content.slice(PREFIX.length).toLowerCase().trim().split(/ +/g);
            var roleRequested = "Join Me Online";
            var durationRequested = Number(args[1]);
            if ((check.integer(Number(durationRequested))) && (check.between(Number(durationRequested), 0, 61))) {
                setTempOnlineRole(durationRequested, message, roleRequested)
            } else {
                message.channel.send(`${args[1]} is not a valid input. You must use a number between 1 and 60. "!online 15" means you're avaialble to play online for the next 15 minutes.`)
                return;
            }
        } else {
            message.channel.send(`That command only works in the #eris-bot channel.`)
        }
    };

    let args = message.content.substring(PREFIX.length).split(/ +/g);

    if (godArray.indexOf(lowerCase(args[0])) >= 0 || godArray.indexOf(lowerCase(args[0])) <= 66) {
        args[0] = lowerCase(args[0]);
        if (args[0].slice(0, 6) === 'castor') {
                args[0] = 'castorandpollux';
        };

        if (args[0].slice(0, 6) === 'europa') {
            args[0] = 'europaandtalus';
        };
        
        switch (args[0]) {

            case 'app':
                message.channel.send(
                    'Apple App Store: https://apps.apple.com/us/app/santorini-board-game/id1456647343\n\u200b' +
                    'Google Play Store: https://play.google.com/store/apps/details?id=com.Roxley.SantoriniGame').catch(console.error);
                break;

            case 'board':
                const boardImage = new Discord.MessageAttachment('../ErisBot/images/santoriniBoard.jpg');
                const boardImageEmbed = {
                    title: 'Santorini Board Notation',
                    image: {
                        url: 'attachment://santoriniBoard.jpg',
                    },
                };
                message.channel.send({
                    files: [boardImage],
                    embed: boardImageEmbed
                }).catch(console.error);
                break;

            case 'build':
                var embed = new Discord.MessageEmbed()
                    .addField('**Build**', 'a block or dome on an unoccupied space neighboring the moved Worker. \n\u200b \n\u200bYou can build onto a level of any height, but you must choose the correct shape of block or dome for the level being built. A tower with 3 blocks and a dome is considered a “Complete Tower”.')
                message.channel.send(embed).catch(console.error);
                break;

            case 'dome':
            case 'domes':
                var embed = new Discord.MessageEmbed()
                    .addField('**Domes are not blocks.**', 'If the God Power description states it affects blocks, it does not affect domes. \n\u200b')
                message.channel.send(embed).catch(console.error);
                break;

            case 'erisbot':
            case 'help':
                var embed = new Discord.MessageEmbed()
                        .setColor("0xd9ff00")
                        .addField(`GOD INFORMATION`,
                        `**!apollo** - information about Apollo... this works for all Gods and Heroes`)
                        .addField(`FIND ONLINE OPPONENTS`,
                        `**!online 20** - Enables NotifyOn for you and sends a DM to everyone with NotifyOn enabled, explaining that you're available to play for the number of minutes you specify (up to 60).\n\u200b` +
                        `**!NotifyOn** - Use this to get notified when someone uses the !Online command.\n\u200b` +
                        `**!NotifyOff** - Use this to stop getting notified when someone uses the !Online command.`)
                        .addField(`SET YOUR GOD ROLE IN THE MEMBER LIST`,
                        `**!iamGodName** - !iamApollo, for example, will add or remove the Apollo role. You will appear in the Member List in your first role alphabetically. This command only works while in the #eris-bot channel.\n\u200b` +
                        `**!**❤️ - Give some love to ErisBot`)
                        .addField(`GOD LISTS`,
                        `**!update-list** list of powers updated for the app\n\u200b` +
                        `**!order** - Power Order Aid for 2-Player Games\n\u200b` +
                        `**!NotInApp** - list of Gods that aren't currently supported in the app`)
                        .addField(`GAME RULES & DEFINITIONS`,
                        `**!rules** - game rules\n\u200b` +
                        `**!force** - definition of force from rulebook\n\u200b` +
                        `**!move** - definition of move from rulebook\n\u200b` +
                        `**!build** - definition of build from rulebook\n\u200b` +
                        `**!win** - definition of win from rulebook\n\u200b` +
                        `**!dome** - definition of dome from rulebook\n\u200b` +
                        `**!tournament** - basic guidelines for our tournaments\n\u200b` +
                        `**!board** - image of the board with space notation`)
                        .addField(`INVITE YOUR FRIENDS`,
                        `**!invite** - discord server invite link\n\u200b` +
                        `**!app** - links to the Santorini app on the Apple App store and the Google Play store`)
                        .addField(`GAME LOGS`,
                        `**!log** - location of log files on Android devices`);
                    message.channel.send(embed).catch(console.error);
                break;

            case 'force':
                var embed = new Discord.MessageEmbed()
                    .addField('**“Forced” is not “moved”.**', 'Some God Powers may cause Workers to be “forced” into another space. A Worker that is forced, is not considered to have moved. Remember: to win the game by moving onto the third level, your Worker must move up during your turn. Therefore, if your Worker is Forced onto the third level, you do not win the game. Moving from one third level space to another also does not trigger a win. \n\u200b')
                message.channel.send(embed).catch(console.error);
                break;

            case '❤️':
                if (message.channel.name === 'eris-bot') {
                    const args = message.content.slice(PREFIX.length).toLowerCase().trim().split(/ +/g);
                    var roleRequested = "eris loves";
                    var durationRequested = 60;
                    setTempOnlineRole(durationRequested, message, roleRequested)
                }
                message.channel.send('Awww, a ❤️. How sweet!!').catch(console.error);
                break;

            case 'invite':
                message.channel.send('Share this link to invite someone here: https://discordapp.com/invite/9PKUp7C').catch(console.error);
                break;

            case 'log':
                message.channel.send('Game logs are stored in this folder: **Settings > Storage > Files > Android > Data > com.Roxley.SantoriniGame > Files >** Then find the one with the right date and time.').catch(console.error);
                break;

            case 'move':
                var embed = new Discord.MessageEmbed()
                    .addField('**Move**', 'your selected Worker into one of the (up to) eight neighboring spaces. \n\u200b \n\u200b A Worker may move up a maximum of one level higher, move down any number of levels lower, or move along the samelevel. A Worker may not move up more than one level.')
                message.channel.send(embed).catch(console.error);
                break;

            case 'notifyoff':
                if (message.channel.name === 'eris-bot') {
                    var role = message.guild.roles.cache.find(r => r.name === "Online Notify");
                    message.member.roles.remove(role).catch(console.error);
                } else {
                    message.channel.send(`That command only works in the #eris-bot channel.`);
                }
                break;

            case 'notifyon':
                if (message.channel.name === 'eris-bot') {
                    var role = message.guild.roles.cache.find(r => r.name === "Online Notify");
                    message.member.roles.add(role).catch(console.error);
                } else {
                    message.channel.send(`That command only works in the #eris-bot channel.`);
                }
                break;

            case 'notinapp':
                message.channel.send(
                    'These Gods are not in the app.\n\u200b' +
                    ' \n\u200b' +
                    'Chaos\n\u200b' +
                    'Circe\n\u200b' +
                    'Hecate\n\u200b' +
                    'Hydra\n\u200b' +
                    'Moerae\n\u200b' +
                    'Nyx\n\u200b' +
                    'Tartarus\n\u200b' +
                    'Tyche\n\u200b'
                ).catch(console.error);
                break;

            case 'order':
                message.channel.send(
                    'The lower number goes first.\n\u200b' +
                    ' \n\u200b' +
                    'Achilles 10\n\u200b' +
                    'Adonis 25\n\u200b' +
                    'Aeolus	56\n\u200b' +
                    'Aphrodite	57\n\u200b' +
                    'Apollo	18\n\u200b' +
                    'Ares 62\n\u200b' +
                    'Artemis 53\n\u200b' +
                    'Asteria 45\n\u200b' +
                    'Atalanta 28\n\u200b' +
                    'Athena 63\n\u200b' +
                    'Atlas 40\n\u200b' +
                    'Bellerophon 14\n\u200b' +
                    'Bia 0\n\u200b' +
                    'Castor & Pollux 13\n\u200b' +
                    'Chaos 34\n\u200b' +
                    'Charon 11\n\u200b' +
                    'Charybdis 6\n\u200b' +
                    'Chronus 2\n\u200b' +
                    'Circe 17\n\u200b' +
                    'Clio 39\n\u200b' +
                    'Demeter 55\n\u200b' +
                    'Dionysus 24\n\u200b' +
                    'Eris 50\n\u200b' +
                    'Eros 21\n\u200b' +
                    'Europa & Talus 9\n\u200b' +
                    'Gaea 32\n\u200b' +
                    'Graeae 26\n\u200b' +
                    'Hades 3\n\u200b' +
                    'Harpies 20\n\u200b' +
                    'Hecate 64\n\u200b' +
                    'Hephaestus 27\n\u200b' +
                    'Hera 5\n\u200b' +
                    'Heracles 15\n\u200b' +
                    'Hermes 12\n\u200b' +
                    'Hestia 60\n\u200b' +
                    'Hippolyta 47\n\u200b' +
                    'Hydra 43\n\u200b' +
                    'Hypnus 23\n\u200b' +
                    'Iris 37\n\u200b' +
                    'Jason 58\n\u200b' +
                    'Limus 16\n\u200b' +
                    'Maenads 41\n\u200b' +
                    'Medea 19\n\u200b' +
                    'Medusa 22\n\u200b' +
                    'Minotaur 59\n\u200b' +
                    'Morpheus 1\n\u200b' +
                    'Nemesis 42\n\u200b' +
                    'Nyx (Artemis) 51\n\u200b' +
                    'Odysseus 29\n\u200b' +
                    'Pan 38\n\u200b' +
                    'Pegasus 54\n\u200b' +
                    'Persephone 4\n\u200b' +
                    'Polyphemus 61\n\u200b' +
                    'Poseidon 35\n\u200b' +
                    'Prometheus 46\n\u200b' +
                    'Proteus 30\n\u200b' +
                    'Scylla 36\n\u200b' +
                    'Selene 8\n\u200b' +
                    'Siren 44\n\u200b' +
                    'Tartarus 0\n\u200b' +
                    'Terpsichore 33\n\u200b' +
                    'Theseus 7\n\u200b' +
                    'Triton 52\n\u200b' +
                    'Tyche 48\n\u200b' +
                    'Urania 49\n\u200b' +
                    'Zeus 31\n\u200b' +
                    ' \n\u200b' +
                    'From mlvanbie\'s Santorini Power Order Aid for 2-Player Games: https://boardgamegeek.com/filepage/176006/santorini-power-order-aid-2-player-games'
                ).catch(console.error);
                break;

            case 'rules':
                var embed = new Discord.MessageEmbed()
                    .addField('**Normal Rules**', 'and conditions still apply to you when using a God Power, with the exception of the specific changes described by the God Power. \n\u200b')
                    .addField('**You must obey**', 'all God Power text that says you “cannot” or “must”, otherwise you lose the game. \n\u200b')
                    .addField('**Domes are not blocks.**', 'If the God Power description states it affects blocks, it does not affect domes. \n\u200b')
                    .addField('**“Forced” is not “moved”.**', 'Some God Powers may cause Workers to be “forced” into another space. A Worker that is forced, is not considered to have moved. Remember: to win the game by moving onto the third level, your Worker must move up during your turn. Therefore, if your Worker is Forced onto the third level, you do not win the game. Moving from one third level space to another also does not trigger a win. \n\u200b')
                    .addField('**God Powers apply**', 'or are triggered at a specific time, according to what is stated at the start in the God Power’s description. For example, Apollo’s God Power description starts with “Your Move”. This means if you possess Apollo’s God Power, it can only be used by you during the “move” phase of your turn. When using a God Power, all text in its description is written from the perspective of the player possessing the God Power. Any time an “opponent” is mentioned in a God Power description, it is referring an opponent of the player possessing the God Power. \n\u200b')
                    .addField('**Additional Setup**', 'must be performed when using some God Powers. If your selected God Power features “Setup” text in the description, execute these special instructions during the game Setup. If the order players perform additional setup gives either player an advantage, execute them in turn order. \n\u200b')
                    .addField('**Additional Win Conditions**', 'are specified by some God Powers. In addition to being able to win by moving up onto the third level during your turn, you can also win by fulfilling the “Win Condition” described. \n\u200b')
                    .addField('**Rules PDF Download**', 'https://roxley.com/wp-content/uploads/2016/08/Santorini-Rulebook-Web-2016.08.14.pdf');
                message.channel.send(embed).catch(console.error);
                break;

            case 'tourney':
            case 'tournament':
                message.channel.send("**Santorini Tournaments Guide**\n\u200b \n\u200b" +
                            "**Tournament Prep:**\n\u200b" +
                            "**1.** Register: https://challonge.com/communities/santorini\n\u200b" +
                            "**2.** Update either your Discord nickname or Challonge name so they match.\n\u200b" +
                            "**3.** Check for updates to make sure you have the most recent version of the app.\n\u200b" +
                            "**4.** Make sure you know how to set your phone/device to Do Not Disturb.\n\u200b" +
                            "     - Calls or notifications may cause you to get kicked from the game.\n\u200b" +
                            "**5.** Screen-recording is encouraged. Please share your videos with the community.\n\u200b")
                            
                message.channel.send("**Pre-Tournament:**\n\u200b" +
                            "**1.** Remember that we're here to have fun playing a game we all love!\n\u200b" +
                            "**2.** **Set your phone/device to Do Not Disturb.**\n\u200b" +
                            "**3.** Join the #general channel on Discord.\n\u200b" +
                            "**4.** Login to Challonge.com\n\u200b" +
                            "     - Check-in opens 30 min before start time.\n\u200b" +
                            "     - **Please check in at least 15 min before the scheduled start time.**\n\u200b" +
                            "     - **The tournament will start on time**.\n\u200b")

                message.channel.send("**Tournament:**\n\u200b" +
                            "**1.** When the tournament starts\n\u200b" +
                            "     - **Registrants that have not checked in will be disqualified**.\n\u200b" +
                            "     - An updated bracket will be created with the remaining players.\n\u200b" +
                            "     - Games played before the official start of the tournament will not be counted.\n\u200b" +
                            "**2.** Each match will show two players, one above the other. The player on top is the Host and is responsible for sending their opponent the Private Match Code.\n\u200b" +
                            "**3.** Host player: start a Private Match and **send the Private Match Code to your opponent via Discord DM**.\n\u200b" +
                            "**4.** Both players join the match.\n\u200b" +
                            "**5.** The app will guide you through game setup:\n\u200b" +
                            "     - Player order is randomized.\n\u200b" +
                            "     - Player 1 chooses 2 **DIFFERENT** gods/heroes. **NO MIRROR MATCHES**.\n\u200b" +
                            "     - Player 2 picks the one they want to use.\n\u200b" +
                            "**6.** Once the match starts, **DO NOT leave the app until the game ends** and you see the Victory/Defeat screen.\n\u200b" +
                            "**7.** If you experience disconnection/opponent leaving/freeze/bug:\n\u200b" +
                            "     - Notify the tournament coordinator of the issue.\n\u200b" +
                            "     - You will be allowed to restart the match 1 time.\n\u200b" +
                            "     - If the rematch ends without a winner then the match will be counted as a tie.\n\u200b" +
                            "     - Players experiencing tech issues in more than 1 round may be asked to bow out of the tournament.\n\u200b" +
                            "**8.** After the match, go to Challonge.com and report the results.\n\u200b \n\u200b" +
                            "Remember that **we're all here to have fun!** Please give each other the benefit of any doubt and **be positive and encouraging**.");
                break;

            case 'update-info': // todo: make this response a DM back to the author
                var arrayLength = godArray.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (bot.godData[i].update == "Updated") {
                        const embed = new Discord.MessageEmbed()
                            .attachFiles(['../ErisBot/images/' + (bot.godData[i].imageName) + '.jpg'])
                            .setColor("0x" + bot.godData[i].borderColor)
                            .addField(bot.godData[i].name, bot.godData[i].title + "\n\u200b")
                            .addField('Ability(updated):', bot.godData[i].updatedAbilityFormatted + "\n\u200b")
                            .addField('Ability(original):', bot.godData[i].originalAbilityFormatted + "\n\u200b")
                            .addField('Banned Opponents:', bot.godData[i].banned + "\n\u200b")
                            .addField('Character Category:', bot.godData[i].group + "\n\u200b")
                            .addField('App Availability:', bot.godData[i].inAppPurchase + "\n\u200b")
                            .addField('Compatible with', bot.godData[i].compatability)
                            .setThumbnail('attachment://' + (bot.godData[i].imageName) + '.jpg');
                        message.channel.send(embed).catch(console.error);
                    }
                }
                break;

            case 'update-list':
                var embed = new Discord.MessageEmbed()
                    .addField('**Ability text changes.**', 'There are several characters with updated ability text. ' +
                        'This list only includes characters with an ability text change that affects gameplay. \n\u200b' +
                        '1. Adonis \n\u200b' +
                        '2. Aeolus \n\u200b' +
                        '3. Bia \n\u200b' +
                        '4. Charybdis \n\u200b' +
                        '5. Graeae \n\u200b' +
                        '6. Heracles \n\u200b' +
                        '7. Jason \n\u200b' +
                        '8. Limus \n\u200b' +
                        '9. Medea \n\u200b' +
                        '10. Nemesis \n\u200b' +
                        '11. Proteus \n\u200b' +
                        '12. Siren \n\u200b \n\u200b' +
                        'To see all of the information for each of these characters, send me a direct message that says "!update-info"')
                message.channel.send(embed).catch(console.error);
                break;

            case 'win':
                var embed = new Discord.MessageEmbed()
                    .addField('**Winning the Game**', 'If one of your Workers moves up on top of level 3 during your turn, you instantly win! \n\u200b \n\u200b You must always perform a move then build on your turn. If you are unable to, you lose.')
                message.channel.send(embed).catch(console.error);
                break;

                // NON-LISTED COMMANDS
            case 'avatar':
                if (!message.mentions.users.size) {
                    return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}> ${message.author.username}`);
                }
                const avatarList = message.mentions.users.map(user => {
                    return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
                });
                message.channel.send(avatarList).catch(console.error);
                break;

            case 'joke':
                message.channel.send(`Hmmm... I'm thinking... I'll have to get back to you.`).catch(console.error);
                break;

                // GOD INFO - MUST GO LAST BECAUSE IT TAKES ALL CASES
            case (args[0]):
                var arrayLength = godArray.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (godArray[i] == (lowerCase(args[0]))) {
                        var godSearched = godArray.indexOf(lowerCase(args[0]));
                        if (bot.godData[godSearched].update == "Updated") {
                            const embed = new Discord.MessageEmbed()
                                .attachFiles(['../ErisBot/images/' + (bot.godData[godSearched].imageName) + '.jpg'])
                                .setColor("0x" + bot.godData[godSearched].borderColor)
                                .addField(bot.godData[godSearched].name, bot.godData[godSearched].title + "\n\u200b")
                                .addField('Ability(updated):', bot.godData[godSearched].updatedAbilityFormatted + "\n\u200b")
                                .addField('Ability(original):', bot.godData[godSearched].originalAbilityFormatted + "\n\u200b")
                                .addField('Banned Opponents:', bot.godData[godSearched].banned + "\n\u200b")
                                .addField('Character Category:', bot.godData[godSearched].group + "\n\u200b")
                                .addField('App Availability:', bot.godData[godSearched].inAppPurchase + "\n\u200b")
                                .addField('Compatible with', bot.godData[godSearched].compatability)
                                .setThumbnail('attachment://' + (bot.godData[godSearched].imageName) + '.jpg');
                            message.channel.send(embed).catch(console.error);
                            break;
                        } else if (bot.godData[godSearched].update == "Same") {
                            const embed = new Discord.MessageEmbed()
                                .attachFiles(['../ErisBot/images/' + (bot.godData[godSearched].imageName) + '.jpg'])
                                .setColor("0x" + bot.godData[godSearched].borderColor)
                                .addField(bot.godData[godSearched].name, bot.godData[godSearched].title + "\n\u200b")
                                .addField('Ability:', bot.godData[godSearched].originalAbilityFormatted + "\n\u200b")
                                .addField('Banned Opponents:', bot.godData[godSearched].banned + "\n\u200b")
                                .addField('Character Category:', bot.godData[godSearched].group + "\n\u200b")
                                .addField('App Availability:', bot.godData[godSearched].inAppPurchase + "\n\u200b")
                                .addField('Compatible with', bot.godData[godSearched].compatability)
                                .setThumbnail('attachment://' + (bot.godData[godSearched].imageName) + '.jpg');
                            message.channel.send(embed).catch(console.error);
                            break;
                        } else {
                            break;

                        }
                    }
                }
        }
    } else {
        return;
    }
})

function GetTimeStamp() {
    let now = new Date();
    return "[" + now.toLocaleString() + "]";
}

async function removeTempOnlineRole() {
    ;
    (async () => {
        const client = await pool.connect()
        try {
            let currentTime = Date.now()
            const query = await client.query(`SELECT * FROM public.online_role_tracking WHERE remove_time < ${currentTime} AND status = true`)
            query.rows.forEach(row => { 
                let member = bot.guilds.cache.get(row.guild_id).member(row.author_id);
                let role_id = bot.guilds.cache.get(row.guild_id).roles.cache.find(rName => rName.id === row.temp_role_id);
                member.roles.remove(role_id).catch(console.error);
                client.query(`UPDATE public.online_role_tracking SET status = false WHERE onlineroletracking_id = ${row.onlineroletracking_id}`)
                console.log(`${row.author_username} was removed from the ${row.temp_role} role group in the ${row.guild_name} channel.`);
            })
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    })().catch(err => console.log(err.stack))
}

async function setTempOnlineRole(durationRequested, message, roleRequested) {
    ;
    (async () => {
        const client = await pool.connect()
        try {
            let temp_role_id = await message.guild.roles.cache.find(role => role.name === roleRequested).id;
            let timeOfRequest = Date.now()
            const onlineRequest = {
                'guild_name': message.guild.name,
                'guild_id': message.guild.id,
                'channel_name': message.channel.name,
                'channel_id': message.channel.id,
                'message_id': message.id,
                'author_username': message.author.username,
                'author_id': message.author.id,
                'member_nickname': message.member.nickname,
                'readable_timestamp': GetTimeStamp(),
                'start_time': timeOfRequest,
                'duration_requested': durationRequested,
                'remove_time': timeOfRequest + (durationRequested * 60000),
                'status': 1
            }
            await client.query('BEGIN')
            const insertTempRoleRequestText = 'INSERT INTO public.online_role_tracking(guild_name, guild_id, channel_name, channel_id, message_id, author_username, author_id, member_nickname, temp_role, temp_role_id, readable_timestamp, start_time, duration_requested, remove_time, status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)'
            const insertTempRoleRequestValues = [onlineRequest.guild_name, onlineRequest.guild_id, onlineRequest.channel_name, onlineRequest.channel_id, onlineRequest.message_id, onlineRequest.author_username, onlineRequest.author_id, onlineRequest.member_nickname, roleRequested, temp_role_id, onlineRequest.readable_timestamp, onlineRequest.start_time, onlineRequest.duration_requested, onlineRequest.remove_time, onlineRequest.status]
            await client.query(insertTempRoleRequestText, insertTempRoleRequestValues)
            await client.query('COMMIT')
            const getGodRole = message.guild.roles.cache.find(role => roleRequested.includes(role.name));
            message.member.roles.add(getGodRole).catch(console.error);
            // TODO update online time if not false
            if (roleRequested == "Join Me Online") {
                let online_notify_role_id = await message.guild.roles.cache.find(role => role.name === "Online Notify").id;
                let membersWithRole = message.guild.roles.cache.get(online_notify_role_id).members.map(m => m.user);
                await membersWithRole.forEach((member) => {
                    console.log(`member.username = ${member.username}`)
                    if (member.id == message.author.id) {
                            member.send(`I told everyone in the Online Notify group that you are available for the next ${onlineRequest.duration_requested} min.`)
                    }
                    if (member.id != message.author.id) {
                        if (message.member.nickname != null) {
                            member.send(`${message.member.nickname} is playing Santorini online for the next ${onlineRequest.duration_requested} min. If you want me to stop sending you these updates, use the !notifyOFF command.`)
                        } else {
                            member.send(`${onlineRequest.author_username} is playing Santorini online for the next ${onlineRequest.duration_requested} min. If you want me to stop sending you these updates, use the !notifyOFF command.`)
                        }
                    }
                });
                let role = await message.guild.roles.cache.find(r => r.name === "Online Notify");
                await message.member.roles.add(role).catch(console.error);
            }
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    })().catch(err => console.log(err.stack))
}

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue,
        randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

async function messageArchive(message) {
    ;
    (async () => {
        const client = await pool.connect()
        try {
            const prepMessageArchive = {
                'readable_timestamp': GetTimeStamp(),
                'guild_name': message.guild.name,
                'guild_id': message.guild.id,
                'channel_name': message.channel.name,
                'channel_id': message.channel.id,
                'message_id': message.id,
                'author_id': message.author.id,
                'author_username': message.author.username,
                'member_nickname': message.member.nickname,
                'message_timestamp': message.createdTimestamp,
                'message_content': message.mentions._content
            }
            await client.query('BEGIN')
            const insertMessageArchiveText = 'INSERT INTO public.message_archive(readable_timestamp, guild_name, guild_id, channel_name, channel_id, message_id, author_id, author_username, member_nickname, message_timestamp, message_content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)'
            const insertMessageArchiveValues = [prepMessageArchive.readable_timestamp, prepMessageArchive.guild_name, prepMessageArchive.guild_id, prepMessageArchive.channel_name, prepMessageArchive.channel_id, prepMessageArchive.message_id, prepMessageArchive.author_id, prepMessageArchive.author_username, prepMessageArchive.member_nickname, prepMessageArchive.message_timestamp, prepMessageArchive.message_content]
            await client.query(insertMessageArchiveText, insertMessageArchiveValues)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    })().catch(err => console.log(err.stack))
}

async function dmArchive(message) {
    ;
    (async () => {
        const client = await pool.connect()
        try {
            const prepDmArchive = {
                'readable_timestamp': GetTimeStamp(),
                'author_username': message.author.username,
                'author_id': message.author.id,
                'message_timestamp': message.createdTimestamp,
                'message_content': message.content
            }
            await client.query('BEGIN')
            const insertDmArchiveText = 'INSERT INTO public.dm_archive(readable_timestamp, author_username, author_id, message_timestamp, message_content) VALUES ($1, $2, $3, $4, $5)'
            const insertDmArchiveValues = [prepDmArchive.readable_timestamp, prepDmArchive.author_username, prepDmArchive.author_id, prepDmArchive.message_timestamp, prepDmArchive.message_content]
            await client.query(insertDmArchiveText, insertDmArchiveValues)
            await client.query('COMMIT')
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            client.release()
        }
    })().catch(err => console.log(err.stack))
}

async function updateStatus() {
    var watchPlay = [0, 1]
    shuffle(watchPlay);
    if (watchPlay[0] == 0) {
        var statusArray = [
            "Santorini",
            "Dice Throne",
            "Dice Throne Adventures",
            "Steampunk Rally",
            "Steampunk Rally Fusion",
            "Super Motherload",
            "Brass: Birmingham",
            "Brass: Lancashire",
            "SKYRISE",
            "Santorini App",
            "The Royal Game of Ur",
            "7 Wonders",
            "7 Wonders Duel",
            "Acropolis of Athens",
            "Agamemnon",
            "Elysium",
            "Corinth",
            "Lords of Hellas",
            "Oracle of Delphi",
            "Cyclades ",
            "Hoplite",
            "Poseidon's Kingdom",
            "Sid Meier's Civilization",
            "Sparta",
            "Through the Ages",
            "Zeus on the Loose",
            "Mythic Battles: Pantheon",
            "Deus",
            "Olympos",
            "Mythtopia",
            "Helios",
            "Poseidon",
            "Ancient Terrible Things",
            "Pantheon",
            "Hera And Zeus",
            "Fate Of The Elder Gods",
            "Risk: Godstorm",
            "Chez Greek",
            "Archipelago",
            "Forbidden Island",
            "Akrotiri",
            "Islebound",
            "Sleeping Gods",
            "History Of The World",
            "Peleppones",
            "Perikles",
            "Iliad",
            "Dixit: Odyssey",
            "Apples To Apples",
            "Gorilla Marketing"
        ];
        shuffle(statusArray);
        bot.user.setActivity(statusArray[0], {
                type: 'PLAYING'
            })
            .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
            .catch(console.error);
    } else if (watchPlay[0] == 1) {
        var statusArray = [
            "Rahdo Runs Through",
            "The Undead Viking",
            "Watch It Played",
            "Tantrum House",
            "Man Vs. Meeple",
            "The Cardboard Kid",
            "Gaming With Edo",
            "Shut Up & Sit Down",
            "LoadingReadyRun",
            "Actualol",
            "No Pun Included",
            "Drive Thru Review",
            "The Game Boy Geek",
            "The Dice Tower",
            "Jon Gets Games",
            "Heavy Cardboard",
            "Roxley's YouTube Channel",
            "Board Game Revolution",
            "Geek & Sundry",
            "Meeple University",
            "Jason and the Argonauts",
            "Troy",
            "300",
            "Atlantis",
            "Clash of the Titans",
            "Wrath of the Titans",
            "The Odyssey",
            "Hercules",
            "Odissea",
            "Fury of Achilles",
            "My Big Fat Greek Wedding",
            "Grease"
        ];
        shuffle(statusArray);
        bot.user.setActivity(statusArray[0], {
                type: 'WATCHING'
            })
            .then(presence => console.log(`Activity set to ${presence.activities[0].name}`))
            .catch(console.error);
    }
}
// Super Secret Token!!!
bot.login(config.token);
