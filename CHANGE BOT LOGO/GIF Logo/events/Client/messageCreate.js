const { MessageEmbed, Permissions, MessageActionRow, MessageButton } = require('discord.js');


module.exports = {
  name: 'messageCreate',
  run: async (client, message) => {
    if (message.author.bot) return;
    if (!message.guild) return;
    let prefix = client.prefix;
    const channel = message?.channel;
    const mention = new RegExp(`^<@!?${client.user.id}>( |)$`);
    if (message.content.match(mention)) {
    return;
    };
    const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|${escapeRegex(prefix)})\\s*`);
    if (!prefixRegex.test(message.content)) return;
    const [matchedPrefix] = message.content.match(prefixRegex);
    const args = message.content.slice(matchedPrefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
      client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    if (!message.guild.members.me.permissions.has(Permissions.FLAGS.SEND_MESSAGES))
      return await message.author.dmChannel
        .send({
          content: `I don't have **\`SEND_MESSAGES\`** permission in <#${message.channelId}> to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => { });

    if (!message.guild.members.me.permissions.has(Permissions.FLAGS.VIEW_CHANNEL)) return;

    if (!message.guild.members.me.permissions.has(Permissions.FLAGS.EMBED_LINKS))
      return await message.channel
        .send({
          content: `I don't have **\`EMBED_LINKS\`** permission to execute this **\`${command.name}\`** command.`,
        })
        .catch(() => { });

    const embed = new MessageEmbed().setColor('RED');

    // args: true,
    if (command.args && !args.length) {
      let reply = `You didn't provide any arguments, ${message.author}!`;

      // usage: '',
      if (command.usage) {
        reply += `\nUsage: \`${prefix}${command.name} ${command.usage}\``;
      }

      embed.setDescription(reply);
      return message.reply({ embeds: [embed] });
    }

    if (command.userPrams && !message.member.permissions.has(command.userPrams)) {
      embed.setDescription(
        `You need to this \`${command.userPrams.join(', ')}\` permission use this command.`,
      );
      return message.reply({ embeds: [embed] });
    }
    if (command.botPrams && !message.guild.members.me.permissions.has(command.botPrams)) {
      embed.setDescription(
        `I need this \`${command.userPrams.join(', ')}\` permission use this command.`,
      );
      return message.reply({ embeds: [embed] });
    }
    if (
      !channel.permissionsFor(message.guild.members.me)?.has(Permissions.FLAGS.EMBED_LINKS) &&
      client.user.id !== userId
    ) {
      return reply({ content: `Error: I need \`EMBED_LINKS\` permission to work.` });
    }

    if (command.owner) {
      if (client.owner) {
        const devs = client.owner.find((x) => x === message.author.id);
        if (!devs)
          return message.reply({
            embeds: [embed.setDescription(`**Sorry, this command can be used by only owner!**`)],
          });
      }
    }

    try {
      command.execute(message, args, client, prefix);
    } catch (error) {
      console.log(error);
      embed.setDescription(
        'There was an error executing that command.\nI have contacted the owner of the bot to fix it immediately.',
      );
      return message.reply({ embeds: [embed] });
    }
  },
};
