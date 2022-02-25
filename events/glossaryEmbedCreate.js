const { Client, CommandInteraction } = require("discord.js");
// const index = require("../handler/index.js");
Client.dataIndex = require("../dataIndex.js");
const definitionIndex = Client.dataIndex.definitionIndex;
// const eris = require("../eris.js");
Client.definitionData = require("../definitionData.json");
// const customEmoji = require("./customEmoji.js")
const { MessageAttachment, MessageEmbed } = require("discord.js");
const client = require("../eris.js");
const { get } = require("lodash");

async function embedCreate(client, interaction, args) {
  try {

    const definitionNumber = definitionIndex.indexOf(`${args}`);

    // console.log(`ARGS = ${args}`);
    // console.log(`Card from index = ${slashIndex[cardIndex]}`);
    // console.log(`INTERACTION= ${JSON.stringify(interaction.commandName)}`);
    // console.log(`cardIndex = ${cardIndex}`);
    // console.log(`embedType = ${embedType}`);

    definitionEmbed(client, interaction, args, definitionNumber);
  
  } catch (err) {
    console.log(err);
  }
}

async function definitionEmbed(user, interaction, args, definitionNumber) {
  try {
    const embed = new MessageEmbed()
      .setTitle(`Glossary Definition:`)
      // .setDescription(`${Client.godData[cardIndex].title} \n\u200b`)
      .addFields({
        name: `${Client.definitionData[definitionNumber].title}`,
        value: `${Client.definitionData[definitionNumber].definition}`,
        inline: false,
      })
    await interaction.followUp({
      embeds: [embed]
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
  embedCreate,
};
