const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "changelogo",
  category: "Information",
  description: "Change the logo of the bot!",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: true,
  execute: async (message, args, client, prefix) => {
 let logo = args[0];
 if(!logo){
  message.reply("> No valid logo link provided")
 } else {
    await client.user.setAvatar(logo);
    message.reply("> Avatar Changed Successfully!");
 }
  }
}
