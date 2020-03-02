const Discord = require('discord.js');
const config = require("./config.json");
var lowerCase = require('lower-case');
const getDateStamp = require('./timeStamp.js')
const fs = require("fs");
const bot = new Discord.Client();
const PREFIX = config.prefix;
let godArray = ["apollo", "artemis", "athena", "atlas", "demeter", "hephaestus", "hermes", "minotaur", "pan", "prometheus", "aphrodite", "ares", "bia", "chaos", "charon", "chronus", "circe", "dionysus", "eros", "hera", "hestia", "hypnus", "limus", "medusa", "morpheus", "persephone", "poseidon", "selene", "triton", "zeus", "aeolus", "charybdis", "clio", "europaandtalus", "gaea", "graeae", "hades", "harpies", "hecate", "moerae", "nemesis", "siren", "tartarus", "terpsichore", "urania", "achilles", "adonis", "atalanta", "bellerophon", "heracles", "jason", "medea", "odysseus", "polyphemus", "theseus", "asteria", "castorandpollux", "eris", "hippolyta", "iris", "maenads", "pegasus", "proteus", "scylla", "tyche", "hydra", "nyx"];

bot.on('ready', () => {
    console.log('Eris is ready!');
});

bot.godData = require("../ErisBot/godData.json");

bot.on('message', message => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;

    if (message.content === '!react') {
        message.react('521813888392626216');
    }

    let args = (message.content.substring(PREFIX.length).split(" "));
    console.log (args);
    let messageAuthorUsername = (message.author.username);
    let messageAuthorDiscriminator = (message.author.discriminator);

    console.log(messageAuthorUsername + messageAuthorDiscriminator + " looked up " + args + " # "+ godArray.indexOf(lowerCase(args[0])) + " at " + getDateStamp.time() + " on " + getDateStamp.date());

    if (godArray.indexOf(lowerCase(args[0])) >= 0 || godArray.indexOf(lowerCase(args[0])) <= 66) {
        args[0] = lowerCase(args[0]);
        console.log (args[0]);

        switch (args[0]) {
            case 'rules':
                var embed = new Discord.RichEmbed()
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

            case 'dome':
                var embed = new Discord.RichEmbed()
                    .addField('**Domes are not blocks.**', 'If the God Power description states it affects blocks, it does not affect domes. \n\u200b')
                message.channel.send(embed).catch(console.error);
                break;

            case 'move':
                var embed = new Discord.RichEmbed()
                    .addField('**Move**', 'your selected Worker into one of the (up to) eight neighboring spaces. \n\u200b \n\u200b A Worker may move up a maximum of one level higher, move down any number of levels lower, or move along the samelevel. A Worker may not move up more than one level.')
                message.channel.send(embed).catch(console.error);
                break;

            case 'build':
                var embed = new Discord.RichEmbed()
                    .addField('**Build**', 'a block or dome on an unoccupied space neighboring the moved Worker. \n\u200b \n\u200bYou can build onto a level of any height, but you must choose the correct shape of block or dome for the level being built. A tower with 3 blocks and a dome is considered a “Complete Tower”.')
                message.channel.send(embed).catch(console.error);
                break;

            case 'domes':
                var embed = new Discord.RichEmbed()
                    .addField('**Domes are not blocks.**', 'If the God Power description states it affects blocks, it does not affect domes. \n\u200b')
                message.channel.send(embed).catch(console.error);
                break;

            case 'force':
                var embed = new Discord.RichEmbed()
                    .addField('**“Forced” is not “moved”.**', 'Some God Powers may cause Workers to be “forced” into another space. A Worker that is forced, is not considered to have moved. Remember: to win the game by moving onto the third level, your Worker must move up during your turn. Therefore, if your Worker is Forced onto the third level, you do not win the game. Moving from one third level space to another also does not trigger a win. \n\u200b')
                message.channel.send(embed).catch(console.error);
                break;

            case 'win':
                var embed = new Discord.RichEmbed()
                    .addField('**Winning the Game**', 'If one of your Workers moves up on top of level 3 during your turn, you instantly win! \n\u200b \n\u200b You must always perform a move then build on your turn. If you are unable to, you lose.')
                message.channel.send(embed).catch(console.error);
                break;

            case 'joke':
                message.channel.send('Hmmm... I\'m thinking... I\'ll have to get back to you.')
                break;

            case 'log':
                message.channel.send('Game logs are stored in this folder: **Settings > Storage > Files > Android > Data > com.Roxley.SantoriniGame > Files >** Then find the one with the right date and time.')
                break;

            case 'invite':
                message.channel.send('Share this link to invite someone here: https://discordapp.com/invite/9PKUp7C')
                break;

            case 'test': //repeat after interval
                var myInt = setInterval(function () {
                    message.channel.send('Hello');
                }, 3000);
                break;

            case 'time':
                let ts = Date.now();
                let date_ob = new Date(ts);
                let seconds= date_ob.getSeconds();
                let minutes= date_ob.getMinutes();
                let hours = date_ob.getHours();
                let date = date_ob.getDate();
                let month = date_ob.getMonth() + 1;
                let year = date_ob.getFullYear();
                message.channel.send('The time is ' + hours + ':' + minutes + ':' + seconds + ' on ' + month + "-" + date + "-" + year)
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
                    )
                break;
                    
            case 'avatar':
                if (!message.mentions.users.size) {
                    return message.channel.send(`Your avatar: <${message.author.displayAvatarURL}> ${message.author.username}`);
                }
                const avatarList = message.mentions.users.map(user => {
                    return `${user.username}'s avatar: <${user.displayAvatarURL}>`;
                });
                // send the entire array of strings as a message
                // by default, discord.js will `.join()` the array with `\n`
                message.channel.send(avatarList);
                break;

            case 'erisbot':
            case 'help':
                message.channel.send('Send a message where the first word starts with "!" and then, with no space, the name of a character in the game or one of her pre-programmed trigger words.\n\u200b' + 
                ' \n\u200b' +
                'She\'ll respond to:\n\u200b' +
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
                ' \n\u200b' +
                'If you don\'t want to message her in a public channel, you can DM her and she\'ll respond to you privately.')
                break;
                
            case 'board':
                const file = new Discord.Attachment('../ErisBot/images/santoriniBoard.jpg');
                const exampleEmbed = {
                    title: 'Santorini Board Notation',
                    image: {
                        url: 'attachment://santoriniBoard.jpg',
                    },
                };
                message.channel.send({ files: [file], embed: exampleEmbed });
                break;

            case 'update-list':
                var embed = new Discord.RichEmbed()
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

            case 'update-info': // todo: make this response a DM back to the author
                var arrayLength = godArray.length;
                for (var i = 0; i < arrayLength; i++) {
                    console.log(bot.godData[i].update);
                    if (bot.godData[i].update == "Updated") {
                        const embed = new Discord.RichEmbed()
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

            case (args[0]):
                var arrayLength = godArray.length;
                for (var i = 0; i < arrayLength; i++) {
                    //console.log(godArray[i]);
                    if (godArray[i] == (lowerCase(args[0]))) {
                        var godSearched = godArray.indexOf(lowerCase(args[0]));
                        console.log("godSearched = " + godSearched);
                        console.log("args[0] = " + args[0]);
                        // console.log("args[1] = " + args[1]);
                        if (bot.godData[godSearched].update == "Updated") {
                            const embed = new Discord.RichEmbed()
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
                        } else if (bot.godData[godSearched].update == "Same") {
                            const embed = new Discord.RichEmbed()
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
bot.login(config.token);