```javascript
const { SlashCommandBuilder } = require('discord.js');
const { createPlaylist } = require('../../utils/database');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('create')
    .setDescription('Creates a new playlist')
    .addStringOption((option) =>
      option
        .setName('name')
        .setDescription('The name of the playlist')
        .setRequired(true)
    ),
  async execute(interaction) {
    const playlistName = interaction.options.getString('name');

    try {
      await createPlaylist(playlistName);
      await interaction.reply(`Playlist "${playlistName}" created successfully!`);
    } catch (error) {
      if (error.message.includes('already exists')) {
        await interaction.reply(`A playlist with the name "${playlistName}" already exists.`);
      } else {
        console.error(error);
        await interaction.reply('An error occurred while creating the playlist.');
      }
    }
  },
};

```