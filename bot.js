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

let godArray = ["apollo", "artemis", "athena", "atlas", "demeter", "hephaestus", "hermes", "minotaur", "pan", "prometheus", "aphrodite", "ares", "bia", "chaos", "charon", "chronus", "circe", "dionysus", "eros", "hera", "hestia", "hypnus", "limus", "medusa", "morpheus", "persephone", "poseidon", "selene", "triton", "zeus", "aeolus", "charybdis", "clio", "europaandtalus", "gaea", "graeae", "hades", "harpies", "hecate", "moerae", "nemesis", "siren", "tartarus", "terpsichore", "urania", "achilles", "adonis", "atalanta", "bellerophon", "heracles", "jason", "medea", "odysseus", "polyphemus", "theseus", "asteria", "castorandpollux", "eris", "hippolyta", "iris", "maenads", "pegasus", "proteus", "scylla", "tyche", "hydra", "nyx"];

// Ready statement
bot.on('ready', () => {
    console.log(`${GetTimeStamp()} :: ErisBot is ready to serve on ${bot.guilds.cache.size} servers, for ${bot.users.cache.size} users.`)
    bot.user.setActivity("Santorini", {
        type: "Playing"
    });
    databaseCheck.createDatabaseTablesIfNotExist;
});

// New member message
// bot.on('guildMemberAdd', (member) => {
//     console.log(`New User "${member.user.username}" has joined "${member.guild.name}"` );
//     //member.guild.channels.find(c => c.name === "new_members").send(`Hi ${member.user.username}, thanks for joining us.`);
// });

// error catch-all
bot.on("error", (e) => console.error(`${GetTimeStamp()} :: ${e}`));
bot.on("warn", (e) => console.warn(`${GetTimeStamp()} :: ${e}`));
bot.on("debug", (e) => console.info(`${GetTimeStamp()} :: ${e}`));

// Link to God data
bot.godData = require("./godData.json");

// JOIN ME ONLINE Interval check
setInterval(function () {
    // console.log("running removeTempOnlineRole at " + GetTimeStamp());
    removeTempOnlineRole()
}, 60000);
// 86400000 = 1day
// 3600000 = 1hr
// 60000 = 1min

// Main Args/Response 
bot.on('message', (message) => {

    if (!message.author.bot) {
        // console.log(message)
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
            // console.log(roleRequested + " " + GetTimeStamp());

            if (roleRequested.slice(0, 6) === 'castor') {
                roleRequested = 'castor & pollux';
            };

            if (roleRequested.slice(0, 6) === 'europa') {
                roleRequested = 'europa & talus';
            };

            if (message.guild.roles.cache.some(r => roleRequested.includes(r.name))) {
                if (message.member.roles.cache.some(r => roleRequested.includes(r.name))) { // has one of the roles
                    // console.log(message.guild.roles);
                    // console.log(message.member.roles);
                    let member = message.member;
                    const getGodRole = member.roles.cache.find(role => roleRequested.includes(role.name)); //get name of current God Role
                    member.roles.remove(getGodRole).catch(console.error);
                    // console.log('role removed' + GetTimeStamp());
                    message.channel.send(message.author.username + " has left the " + roleRequested + " role group.")
                } else {
                    let member = message.member;
                    const getGodRole = message.guild.roles.cache.find(role => roleRequested.includes(role.name));
                    member.roles.add(getGodRole).catch(console.error);
                    // console.log('Role added' + GetTimeStamp());
                    message.channel.send(message.author.username + " has joined the " + roleRequested + " role group.")
                }
            } else {
                message.channel.send(roleRequested + " isn\'t a role. Please check the spelling and try again.")
            }
        } else {
            message.channel.send("Head over to the #eris-bot channel for role updates.")
            // console.log('tried to change role from wrong channel');
        }
    };

    // Add Online Role and remove after a time
    if (message.content.slice(0, 7).toLowerCase() === '!online') {
        if (message.channel.name === 'eris-bot') {
            const args = message.content.slice(PREFIX.length).toLowerCase().trim().split(/ +/g);
            var roleRequested = "Join Me Online";
            // var roleRequested_id = config.online_role_id;
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
    // console.log ("args = " + args);
    // console.log(`${message.author.username} ${message.author.discriminator} id = ${message.author.id} looked up ${args} #${godArray.indexOf(lowerCase(args[0]))} - ${GetTimeStamp()}`);

    if (godArray.indexOf(lowerCase(args[0])) >= 0 || godArray.indexOf(lowerCase(args[0])) <= 66) {
        args[0] = lowerCase(args[0]);
        //console.log ("args[0] = " + args[0]);
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
                message.channel.send('Send a message where the first word starts with "!" and then, with no space, the name of a character in the game or one of her pre-programmed trigger words.\n\u200b' +
                    ' \n\u200b' +
                    'I\'ll respond to:\n\u200b' +
                    '**!update-list** (list of powers updated for the app)\n\u200b' +
                    '**!rules** (game rules)\n\u200b' +
                    '**!force** (definition of force from rulebook)\n\u200b' +
                    '**!move** (definition of move from rulebook)\n\u200b' +
                    '**!build** (definition of build from rulebook)\n\u200b' +
                    '**!win** (definition of win from rulebook)\n\u200b' +
                    '**!dome** (definition of dome from rulebook)\n\u200b' +
                    '**!log** (location of log files on Android devices)\n\u200b' +
                    '**!board** (image of the board with space notation)\n\u200b' +
                    '**!invite** (discord invite link)\n\u200b' +
                    '**!order** (Power Order Aid for 2-Player Games)\n\u200b' +
                    '**!apollo** (information about Apollo... this works for all Gods and Heroes)\n\u200b' +
                    '**!iamGodName** (!iamApollo, for example, will add or remove the Apollo role. You will appear in the Member List in your first role alphabetically. This command only works while in the #eris-bot channel.)\n\u200b' +
                    ' \n\u200b' +
                    'If you don\'t want to message me in a public channel, you can DM me and I\'ll respond to you privately.').catch(console.error);
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
                    // var roleRequested_id = config.eris_loves_id;
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
                            "     - Calls or notification may cause you to get kicked from the game.\n\u200b" +
                            "**5.** Screen-recording is encouraged. Please share your videos with the community.\n\u200b")
                            
                message.channel.send("**Pre-Tournament:**\n\u200b" +
                            "**1.** Remember that we're here to have fun playing a game we all love!\n\u200b" +
                            "**2.** **Set your phone/device to Do Not Disturb.**\n\u200b" +
                            "**3.** Join the #general channel on Discord.\n\u200b" +
                            "**4.** Login to Challonge.com\n\u200b" +
                            "     - Check-in opens 30 min before start time.\n\u200b" +
                            "     - **Please check in at least 15 min before the scheduled start time.**\n\u200b")

                message.channel.send("**Tournament:**\n\u200b" +
                            "**1.** When the tournament starts\n\u200b" +
                            "     - Registrants that have not checked in will be disqualified.\n\u200b" +
                            "     - An updated bracket will be created with the remaining players.\n\u200b" +
                            "**2.** Each match will show two players, one above the other. The player on top is the Host and is responsible for sending their opponent the Private Match Code.\n\u200b" +
                            "**3.** Host player: start a Private Match and send a Discord DM to your opponent with the Private Match Code \n\u200b" +
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
                            "**7.** After the match, go to Challonge.com and report the results.\n\u200b \n\u200b" +
                            "Remember that **we're all here to have fun!** Please give each other the benefit of any doubt and **be positive and encouraging**.");
                break;

            case 'update-info': // todo: make this response a DM back to the author
                var arrayLength = godArray.length;
                for (var i = 0; i < arrayLength; i++) {
                    //console.log(bot.godData[i].update);
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
                // send the entire array of strings as a message
                // by default, discord.js will `.join()` the array with `\n`
                message.channel.send(avatarList).catch(console.error);
                break;

            case 'joke':
                message.channel.send(`Hmmm... I'm thinking... I'll have to get back to you.`).catch(console.error);
                break;

                // GOD INFO - MUST GO LAST BECAUSE IT TAKES ALL CASES
            case (args[0]):
                var arrayLength = godArray.length;
                for (var i = 0; i < arrayLength; i++) {
                    //console.log(godArray[i]);
                    if (godArray[i] == (lowerCase(args[0]))) {
                        var godSearched = godArray.indexOf(lowerCase(args[0]));
                        //console.log("godSearched = " + godSearched);
                        // console.log("args[1] = " + args[1]);
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
                // console.log("role_id = " + role_id);
                // console.log("member = " + member);
                member.roles.remove(role_id).catch(console.error);
                client.query(`UPDATE public.online_role_tracking SET status = false WHERE onlineroletracking_id = ${row.onlineroletracking_id}`)
                console.log(`${row.author_username} was removed from the ${row.temp_role} role group in the ${row.guild_name} channel.`);
            })
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
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
            // console.log("getGodRole = " + getGodRole);
            message.member.roles.add(getGodRole).catch(console.error);
            // TODO update online time if not false
            // console.log(`guild size = ${message.guild.members.cache.size}`)
            if (roleRequested == "Join Me Online") {
                let online_notify_role_id = await message.guild.roles.cache.find(role => role.name === "Online Notify").id;
                let membersWithRole = message.guild.roles.cache.get(online_notify_role_id).members.map(m => m.user);
                // console.log(`membersWithRole = ${membersWithRole}`)
                await membersWithRole.forEach((member) => {
                    console.log(`member.username = ${member.username}`)
                    // console.log(`member.id = ${member.id}`)
                    // console.log(`message.member.id = ${message.author.id}`)
                    // console.log(`nickname = ${message.member.nickname}`)
                    if (member.id == message.author.id) {
                            member.send(`I told everyone in the Online Notify group that you are available for the next ${onlineRequest.duration_requested} min.`)
                    }
                    if (member.id != message.author.id) {
                        if (message.member.nickname != null) {
                            // console.log(`message.member.nickname = ${message.member.nickname}`)
                            member.send(`${message.member.nickname} is playing Santorini online for the next ${onlineRequest.duration_requested} min. If you want me to stop sending you these updates, use the !notifyOFF command.`)
                        } else {
                            // console.log(`message.member.username = ${message.author.username}`)
                            member.send(`${onlineRequest.author_username} is playing Santorini online for the next ${onlineRequest.duration_requested} min. If you want me to stop sending you these updates, use the !notifyOFF command.`)
                        }
                    }
                });
                // await message.member.send(`I've added you to the Online Notify group. I'll send you a DM when someone uses the !online command.  playing Santorini online for the next ${onlineRequest.duration_requested} min.`).catch(console.error);
                let role = await message.guild.roles.cache.find(r => r.name === "Online Notify");
                await message.member.roles.add(role).catch(console.error);
            }
        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }
    })().catch(err => console.log(err.stack))
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

            // console.log('guild_name = ' + message.guild.name),
            // console.log('guild_id = ' + message.guild.id),
            // console.log('channel_name = ' + message.channel.name),
            // console.log('channel_id = ' + message.channel.id),
            // console.log('message_id = ' + message.id),
            // console.log('author_id = ' + message.author.id),
            // console.log('author_username = ' + message.author.username),
            // console.log('member_nickname = ' + message.member.nickname),
            // console.log('message_timestamp = ' + message.createdTimestamp),
            // console.log('message_content = ' + message.mentions._content)

        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
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

            // console.log('user_name = ' + message.author.username),
            // console.log('user_id = ' + message.author.id),
            // console.log('message_timestamp = ' + message.createdTimestamp),
            // console.log('message_content = ' + message.content)

        } catch (e) {
            await client.query('ROLLBACK')
            throw e
        } finally {
            // Make sure to release the client before any error handling,
            // just in case the error handling itself throws an error.
            client.release()
        }
    })().catch(err => console.log(err.stack))
}
// Super Secret Token!!!
bot.login(config.token);