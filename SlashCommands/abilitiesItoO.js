const { Client,CommandInteraction } = require("discord.js");
const embedCreate = require("../events/embedCreate.js");

module.exports = {
    name: "abilities_i_to_o",
    description: "Info for Gods and Heroes from I to O",
    options: [{
        name: "select_card",
        type: "STRING",
        description: 'choose a card',
        required: true,
        choices: [
          {
            name: "Iris",
            value: "iris"
          },
          {
            name: "Jason",
            value: "jason"
          },
          {
            name: "Limus",
            value: "limus"
          },
          {
            name: "Maenads",
            value: "maenads"
          },
          {
            name: "Medea",
            value: "medea"
          },
          {
            name: "Medusa",
            value: "medusa"
          },
          {
            name: "Minotaur",
            value: "minotaur"
          },
          {
            name: "Moerae",
            value: "moerae"
          },
          {
            name: "Morpheus",
            value: "morpheus"
          },
          {
            name: "Nemesis",
            value: "nemesis"
          },
          {
            name: "Nyx",
            value: "nyx"
          },
          {
            name: "Odysseus",
            value: "odysseus"
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