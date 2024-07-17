```javascript
const { Client } = require('discord.js');
const { token } = require('../../.env');

const client = new Client({ intents: ['Guilds', 'GuildVoiceStates', 'GuildMessages'] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  // Register slash commands if using them
  // client.application.commands.create({
  //   name: 'play',
  //   description: 'Play a song',
  // });
});

module.exports = client;
```