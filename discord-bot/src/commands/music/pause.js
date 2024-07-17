```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('pause')
    .setDescription('Pauses the current song'),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guildId);
    if (!queue) {
      return interaction.reply({ content: 'There is no music playing!' });
    }

    try {
      await queue.pause();
      return interaction.reply({ content: 'Music paused!' });
    } catch (error) {
      console.error(`Error pausing music: ${error}`);
      return interaction.reply({ content: 'There was an error pausing the music!' });
    }
  },
};
```