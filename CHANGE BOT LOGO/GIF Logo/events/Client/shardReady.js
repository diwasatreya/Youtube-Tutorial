
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "shardReady",
  run: async (client, id) => {
  client.logger.log(`Shard #${id} Ready`, "ready");
  }
};
