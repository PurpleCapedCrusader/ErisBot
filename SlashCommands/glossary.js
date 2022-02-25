const { Client, CommandInteraction } = require("discord.js");
const embedCreate = require("../events/glossaryEmbedCreate.js");

module.exports = {
    name: "glossary",
    description: "Official definitions from the rulebook.",
    options: [{
        name: "select_term",
        type: "STRING",
        description: 'select an option',
        required: true,
        choices: [
          {
            name: "Block",
            value: "block"
          },
          {
            name: "Build",
            value: "build"
          },
          {
            name: "Complete Tower",
            value: "complete_tower"
          },
          {
            name: "Dome",
            value: "dome"
          },
          {
            name: "Force",
            value: "force"
          },
          {
            name: "Move",
            value: "move"
          },
          {
            name: "Neighboring",
            value: "neighboring"
          },
          {
            name: "Occupied Space",
            value: "occupied_space"
          },
          {
            name: "Perimeter Space",
            value: "perimeter_space"
          },
          {
            name: "Token",
            value: "token"
          },
          {
            name: "Unmoved Worker",
            value: "unmoved_worker"
          },
          {
            name: "Unoccupied Space",
            value: "unoccupied_space"
          },
          {
            name: "Win",
            value: "win"
          }
        ]
    }],

    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction, args) => {
      embedCreate.embedCreate(client, interaction, args);
    },
};