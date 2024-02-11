const { MessageEmbed } = require('discord.js');
module.exports = {
  name: "shardError",
  run: async (client, error, id) => {
  client.logger.log(`Shard #${id} Errored`, "error");
  }
};