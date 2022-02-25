const {
  Client,
  CommandInteraction
} = require("discord.js");
const embedCreate = require("../events/embedCreate.js");

module.exports = {
  name: "gods_and_heroes",
  description: "Gods and Heroes sorted alphabetically",
  options: [{
    name: "a_thru_c",
    description: "Gods and Heroes A thru C",
    type: "STRING",
    required: false,
    choices: [{
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
  }, {
    name: "d_thru_h",
    description: "Gods and Heroes D thru H",
    type: "STRING",
    required: false,
    choices: [{
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
  }, {
    name: "i_thru_o",
    description: "Gods and Heroes I thru O",
    type: "STRING",
    required: false,
    choices: [{
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
  }, {
    name: "p_thru_z",
    description: "Gods and Heroes P thru Z",
    type: "STRING",
    required: false,
    choices: [{
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