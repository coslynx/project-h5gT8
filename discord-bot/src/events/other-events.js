```javascript
const { Client, Intents } = require('discord.js');

module.exports = {
  name: 'guildCreate',
  once: true,
  execute(guild) {
    console.log(`Joined new guild: ${guild.name} (${guild.id})`);
    // You can add logic here for when the bot joins a new guild.
    // For example, you could send a welcome message to the guild's general channel.
  },
};
```