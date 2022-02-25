const {
    Message,
    Client,
    GuildEmoji
} = require("discord.js");

module.exports = {
    name: "token",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        console.log(message.guild.emojis.cache)
        // new Collection.Collection(message.guild.emojis.cache);
        // collection
        //     .each(GuildEmoji => console.log(GuildEmoji.name))
        //     // .filter(user => user.bot)
        //     // .each(user => console.log(user.username));
    }
};