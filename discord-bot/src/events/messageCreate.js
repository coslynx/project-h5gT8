```javascript
const { Client, Intents } = require('discord.js');
const { prefix } = require('../../config.json');
const { parseCommand } = require('../utils/commandParser');

module.exports = {
  name: 'messageCreate',
  once: false,
  execute(message) {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {
      const { command, args } = parseCommand(message.content, prefix);

      if (command) {
        // Handle command execution
        const commandFile = require(`../commands/${command}.js`);
        try {
          commandFile.execute(message, args);
        } catch (error) {
          console.error(`Error executing command ${command}: ${error}`);
          message.reply('There was an error trying to execute that command!');
        }
      }
    }
  },
};

```