const { Client,CommandInteraction } = require("discord.js");
const embedCreate = require("../events/embedCreate.js");

module.exports = {
    name: "abilities_p_to_z",
    description: "Info for Gods and Heroes from P to Z",
    options: [{
        name: "select_card",
        type: "STRING",
        description: 'choose a card',
        required: true,
        choices: [
          {
            name: "Pan",
            value: "pan"
          },
          {
            name: "Pegasus",
            value: "pegasus"
          },
          {
            name: "Persephone",
            value: "persephone"
          },
          {
            name: "Polyphemus",
            value: "polyphemus"
          },
          {
            name: "Poseidon",
            value: "poseidon"
          },
          {
            name: "Prometheus",
            value: "prometheus"
          },
          {
            name: "Proteus",
            value: "proteus"
          },
          {
            name: "Scylla",
            value: "scylla"
          },
          {
            name: "Selene",
            value: "selene"
          },
          {
            name: "Siren",
            value: "siren"
          },
          {
            name: "Tartarus",
            value: "tartarus"
          },
          {
            name: "Terpsichore",
            value: "terpsichore"
          },
          {
            name: "Theseus",
            value: "theseus"
          },
          {
            name: "Triton",
            value: "triton"
          },
          {
            name: "Tyche",
            value: "tyche"
          },
          {
            name: "Urania",
            value: "urania"
          },
          {
            name: "Zeus",
            value: "zeus"
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