```javascript
const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Shows the list of available commands'),
  async execute(interaction) {
    await interaction.reply('Here are the available commands:\n\n' +
      '/play: Play a song from YouTube, Spotify, or SoundCloud.\n' +
      '/pause: Pause the currently playing song.\n' +
      '/stop: Stop the currently playing song and clear the queue.\n' +
      '/create: Create a new playlist.\n' +
      '/add: Add a song to a playlist.\n' +
      '/remove: Remove a song from a playlist.\n');
  },
};
```