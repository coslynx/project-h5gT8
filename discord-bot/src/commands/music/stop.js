```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('stop')
    .setDescription('Stops the currently playing song.'),
  async execute(interaction) {
    const queue = interaction.client.player.getQueue(interaction.guildId);

    if (!queue) {
      return interaction.reply({ content: 'There is no music playing!', ephemeral: true });
    }

    try {
      await queue.stop();
      interaction.reply({ content: 'Music stopped! ⏹️' });
    } catch (error) {
      console.error(error);
      interaction.reply({ content: 'An error occurred while stopping the music.', ephemeral: true });
    }
  },
};

```