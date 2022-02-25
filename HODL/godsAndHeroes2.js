const {
  Client,
  CommandInteraction
} = require("discord.js");
const embedCreate = require("../events/embedCreate.js");

module.exports = {
  name: "gods_and_heroes",
  description: "Info for Gods and Heroes",
  options: [{
    name: "a_thru_c",
    description: "Info for Gods and Heroes A thru C",
    type: 2, // 2 is type SUB_COMMAND_GROUP
    options: [{
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
      }
    ],
    name: "edit",
    description: "Edit permissions for a user",
    type: 1,
    options: [{
        name: "user",
        description: "The user to edit",
        type: 6,
        required: true
      },
      {
        name: "channel",
        description: "The channel permissions to edit. If omitted, the guild permissions will be edited",
        type: 7,
        required: false
      }
    ]
  }],

  name: "role",
  description: "Get or edit permissions for a role",
  type: 2,
  options: [{
      name: "get",
      description: "Get permissions for a role",
      type: 1,
      options: [{
          name: "role",
          description: "The role to get",
          type: 8, // 8 is type ROLE
          required: true
        },
        {
          name: "channel",
          description: "The channel permissions to get. If omitted, the guild permissions will be returned",
          type: 7,
          required: false
        }
      ]
    },
    {
      name: "edit",
      description: "Edit permissions for a role",
      type: 1,
      options: [{
          name: "role",
          description: "The role to edit",
          type: 8,
          required: true
        },
        {
          name: "channel",
          description: "The channel permissions to edit. If omitted, the guild permissions will be edited",
          type: 7,
          required: false
        }
      ]
    }
  ],




  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction, args) => {
    embedCreate.embedCreate(client, interaction, args);

  },
}