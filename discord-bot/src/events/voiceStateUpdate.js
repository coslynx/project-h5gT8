```javascript
const { Client, Intents } = require('discord.js');

module.exports = {
  name: 'voiceStateUpdate',
  once: false,
  execute(oldState, newState) {
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;

    // Check if the user joined or left a voice channel
    if (oldChannel !== newChannel) {
      const member = newState.member;
      const guild = member.guild;

      // Handle user joining a voice channel
      if (newChannel) {
        // Get the voice connection for the guild
        const connection = guild.voiceAdapterCreator.connections.get(guild.id);

        // Check if the bot is already in a voice channel
        if (connection) {
          // Check if the bot is in the same voice channel as the user
          if (connection.channel.id !== newChannel.id) {
            // Join the user's voice channel
            connection.join(newChannel);
          }
        } else {
          // Join the user's voice channel
          guild.voiceAdapterCreator.join(newChannel);
        }
      }

      // Handle user leaving a voice channel
      if (oldChannel) {
        // Get the voice connection for the guild
        const connection = guild.voiceAdapterCreator.connections.get(guild.id);

        // Check if the bot is in the same voice channel as the user
        if (connection && connection.channel.id === oldChannel.id && connection.channel.members.size === 1) {
          // Disconnect the bot from the voice channel
          connection.disconnect();
        }
      }
    }
  },
};
```