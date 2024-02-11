const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "test",
  category: "Information",
  description: "Check Ping Bot",
  args: false,
  usage: "",
  userPrams: [],
  botPrams: ['EMBED_LINKS'],
  owner: false,
  execute: async (message, args, client, prefix) => {

    await client.user.setAvatar("https://media1.tenor.com/m/6ZhzHHYyNxoAAAAC/luffy.gif");
    message.reply("> Avatar Changed Successfully!")
  }
}