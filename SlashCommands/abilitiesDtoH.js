const { Client,CommandInteraction } = require("discord.js");
const embedCreate = require("../events/embedCreate.js");

module.exports = {
    name: "abilities_d_to_h",
    description: "Info for Gods and Heroes from D to H",
    options: [{
        name: "select_card",
        type: "STRING",
        description: 'choose a card',
        required: true,
        choices: [
          {
            name: "Demeter",
            value: "demeter"
          },
          {
            name: "Dionysus",
            value: "dionysus"
          },
          {
            name: "Eris",
            value: "eris"
          },
          {
            name: "Eros",
            value: "eros"
          },
          {
            name: "Europa and Talus",
            value: "europa_and_talus"
          },
          {
            name: "Gaea",
            value: "gaea"
          },
          {
            name: "Graeae",
            value: "graeae"
          },
          {
            name: "Hades",
            value: "hades"
          },
          {
            name: "Harpies",
            value: "harpies"
          },
          {
            name: "Hecate",
            value: "hecate"
          },
          {
            name: "Hephaestus",
            value: "hephaestus"
          },
          {
            name: "Hera",
            value: "hera"
          },
          {
            name: "Heracles",
            value: "heracles"
          },
          {
            name: "Hermes",
            value: "hermes"
          },
          {
            name: "Hestia",
            value: "hestia"
          },
          {
            name: "Hippolyta",
            value: "hippolyta"
          },
          {
            name: "Hydra",
            value: "hydra"
          },
          {
            name: "Hypnus",
            value: "hypnus"
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