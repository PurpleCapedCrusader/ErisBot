const { Client, CommandInteraction } = require('discord.js')
const index = require("../handler/index.js")
Client.dataIndex = require("../dataIndex.js")
const slashIndex = Client.dataIndex.slashIndex;
const eris = require("../eris.js")
Client.godData = require("../godData.json")
// const customEmoji = require("./customEmoji.js")
const { MessageAttachment, MessageEmbed } = require('discord.js');
const client = require('../eris.js');
const { get } = require('lodash');

async function embedCreate(client, interaction, args) {
  // const response = JSON.parse(args);
  console.log(`ARGS = ${args}`)
  const cardIndex = slashIndex.indexOf(`${args}`);
  console.log(`Card from index = ${slashIndex[cardIndex]}`)
  const embedType = Client.godData[cardIndex].embedType;

  // console.log(`CLIENT = ${JSON.stringify(client)}`);
  console.log(`INTERACTION= ${JSON.stringify(interaction.commandName)}`);
  console.log(`cardIndex = ${cardIndex}`);
  // console.log(`card = ${Client.godData[cardIndex].cardId}`);
  console.log(`embedType = ${embedType}`);
  // console.log(`array_number = ${cardIndex}`);
  if ( embedType === 1 ) {
    cardEmbed1(client, interaction, args, cardIndex)
  } else if ( embedType === 2 ) {
    cardEmbed2(client, interaction, args, cardIndex)
  }
}

async function cardEmbed1(user, interaction, args, cardIndex) {
  try {
    // const response = JSON.pa1rse(args)
    const cardImage = new MessageAttachment(`./images/${Client.godData[cardIndex].imageName}_card.jpg`);
    const cardThumbnail = new MessageAttachment(`./images/${Client.godData[cardIndex].imageName}.jpg`);
    const embed = new MessageEmbed()
    .setColor(`0x${Client.godData[cardIndex].borderColor}`)
    .setTitle(`${Client.godData[cardIndex].name}`)
    .setDescription(`${Client.godData[cardIndex].title} \n\u200b`)
    .addFields({
      name: 'Ability:',
      value: `${Client.godData[cardIndex].originalAbilityFormatted} \n\u200b`,
      inline: false
    })
    .addFields({
      name:'Character Category:', 
      value: `${Client.godData[cardIndex].group}`,
      inline: true 
    }, {
      name:'App Availability:',
      value: `${Client.godData[cardIndex].inAppPurchase}`,
      inline: true
    }, {
      name: '\u200B',
      value: '\u200B'
    }, {
      name:'Banned Opponents:',
      value: `${Client.godData[cardIndex].banned}`,
      inline: true
    }, {
      name:'Compatible with:',
      value:  `${Client.godData[cardIndex].compatability}`,
      inline: true
    },
    )
      .setImage(`attachment://${Client.godData[cardIndex].imageName}_card.jpg`)
      .setThumbnail(`attachment://${Client.godData[cardIndex].imageName}.jpg`)
    await interaction.followUp({
      embeds: [embed],
      files: [cardImage, cardThumbnail]
    });
  } catch (err) {
    console.log(err);
  }
}

async function cardEmbed2(user, interaction, args, cardIndex) {
  try {
    // const response = JSON.pa1rse(args)
    const cardImage = new MessageAttachment(`./images/${Client.godData[cardIndex].imageName}_card.jpg`);
    const cardThumbnail = new MessageAttachment(`./images/${Client.godData[cardIndex].imageName}.jpg`);
    const embed = new MessageEmbed()
    .setColor(`0x${Client.godData[cardIndex].borderColor}`)
    .setTitle(`${Client.godData[cardIndex].name}`)
    .setDescription(`${Client.godData[cardIndex].title} \n\u200b`)
    .addFields({
      name: 'Ability(updated):',
      value: `${Client.godData[cardIndex].updatedAbilityFormatted} \n\u200b`,
      inline: false
    })
    .addFields({
      name: 'Ability(original):',
      value: `${Client.godData[cardIndex].originalAbilityFormatted} \n\u200b`,
      inline: false
    })
    .addFields({
      name:'Character Category:', 
      value: `${Client.godData[cardIndex].group}`,
      inline: true 
    }, {
      name:'App Availability:',
      value: `${Client.godData[cardIndex].inAppPurchase}`,
      inline: true
    }, {
      name: '\u200B',
      value: '\u200B'
    }, {
      name:'Banned Opponents:',
      value: `${Client.godData[cardIndex].banned}`,
      inline: true
    }, {
      name:'Compatible with:',
      value:  `${Client.godData[cardIndex].compatability}`,
      inline: true
    },
    )
      .setImage(`attachment://${Client.godData[cardIndex].imageName}_card.jpg`)
      .setThumbnail(`attachment://${Client.godData[cardIndex].imageName}.jpg`)
    await interaction.followUp({
      embeds: [embed],
      files: [cardImage, cardThumbnail]
    });
  } catch (err) {
    console.log(err);
  }
}

module.exports = {
 embedCreate
}

