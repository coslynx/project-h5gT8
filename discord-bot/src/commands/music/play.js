```javascript
const { SlashCommandBuilder } = require('discord.js');
const ytdl = require('ytdl-core');
const { getYouTubeVideo } = require('../../utils/youtube');
const { getSpotifyTrack } = require('../../utils/spotify');
const { getSoundCloudTrack } = require('../../utils/soundcloud');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('play')
    .setDescription('Plays music in the current voice channel.')
    .addStringOption(option =>
      option.setName('query')
        .setDescription('The song name or URL to play')
        .setRequired(true)
    ),
  async execute(interaction) {
    const query = interaction.options.getString('query');

    if (!interaction.member.voice.channel) {
      return interaction.reply({ content: 'You must be in a voice channel to use this command!', ephemeral: true });
    }

    let songInfo;
    let stream;

    try {
      // Check if query is a YouTube URL
      if (query.includes('youtube.com')) {
        songInfo = await getYouTubeVideo(query);
        stream = ytdl(songInfo.videoUrl, { filter: 'audioonly' });
      } else if (query.includes('open.spotify.com')) {
        // Check if query is a Spotify URL
        songInfo = await getSpotifyTrack(query);
        stream = ytdl(songInfo.previewUrl, { filter: 'audioonly' });
      } else if (query.includes('soundcloud.com')) {
        // Check if query is a SoundCloud URL
        songInfo = await getSoundCloudTrack(query);
        stream = ytdl(songInfo.streamUrl, { filter: 'audioonly' });
      } else {
        // If no valid URL, assume it's a search query
        // You'll need to implement search functionality for each platform
        // For example, use YouTube search API
        // songInfo = await searchYouTube(query);
      }

      if (!songInfo || !stream) {
        return interaction.reply({ content: 'No song found with that query.', ephemeral: true });
      }

      const connection = await interaction.member.voice.channel.join();
      const dispatcher = connection.play(stream);

      dispatcher.on('finish', () => {
        // Handle song ending
        // You could implement queue logic here
      });

      dispatcher.on('error', error => {
        console.error('Error playing song:', error);
        interaction.reply({ content: 'An error occurred while playing the song.', ephemeral: true });
      });

      interaction.reply({ content: `Now playing: ${songInfo.title}`, ephemeral: true });
    } catch (error) {
      console.error('Error executing play command:', error);
      interaction.reply({ content: 'An error occurred while playing the song.', ephemeral: true });
    }
  },
};

```