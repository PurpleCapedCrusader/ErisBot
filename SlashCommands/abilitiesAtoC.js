const { Client, CommandInteraction } = require("discord.js");
const embedCreate = require("../events/embedCreate.js");

module.exports = {
    name: "abilities_a_to_c",
    description: "Info for Gods and Heroes from A to C",
    options: [{
        name: "select_card",
        type: "STRING",
        description: 'choose a card',
        required: true,
        choices: [
          {
            name: "Achilles",
            value: "achilles"
          },
          {
            name: "Adonis",
            value: "adonis"
          },
          {
            name: "Aeolus",
            value: "aeolus"
          },
          {
            name: "Aphrodite",
            value: "aphrodite"
          },
          {
            name: "Apollo",
            value: "apollo"
          },
          {
            name: "Ares",
            value: "ares"
          },
          {
            name: "Artemis",
            value: "artemis"
          },
          {
            name: "Asteria",
            value: "asteria"
          },
          {
            name: "Atalanta",
            value: "atalanta"
          },
          {
            name: "Athena",
            value: "athena"
          },
          {
            name: "Atlas",
            value: "atlas"
          },
          {
            name: "Bellerophon",
            value: "bellerophon"
          },
          {
            name: "Bia",
            value: "bia"
          },
          {
            name: "Castor and Pollux",
            value: "castor_and_pollux"
          },
          {
            name: "Chaos",
            value: "chaos"
          },
          {
            name: "Charon",
            value: "charon"
          },
          {
            name: "Charybdis",
            value: "charybdis"
          },
          {
            name: "Chronus",
            value: "chronus"
          },
          {
            name: "Circe",
            value: "circe"
          },
          {
            name: "Clio",
            value: "clio"
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