```javascript
const { Client, Intents } = require('discord.js');
const { token, youtubeApiKey } = require('dotenv').config().parsed;
const { joinVoiceChannel, createAudioPlayer, createAudioResource, StreamType } = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_MESSAGES] });

const queue = [];
let currentGuild;
let connection;
let player;

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'play') {
    const song = args.join(' ');
    try {
      const songInfo = await getSongInfo(song);
      queue.push(songInfo);
      if (!player) {
        playNext();
      } else {
        message.reply(`Added ${songInfo.title} to the queue.`);
      }
    } catch (error) {
      console.error('Error playing song:', error);
      message.reply('Invalid song URL or search query.');
    }
  } else if (command === 'pause') {
    if (!player) {
      message.reply('No song is currently playing.');
    } else if (player.state.status === 'playing') {
      player.pause();
      message.reply('Music paused.');
    } else {
      message.reply('Music is already paused.');
    }
  } else if (command === 'resume') {
    if (!player) {
      message.reply('No song is currently playing.');
    } else if (player.state.status === 'paused') {
      player.unpause();
      message.reply('Music resumed.');
    } else {
      message.reply('Music is already playing.');
    }
  } else if (command === 'stop') {
    if (!player) {
      message.reply('No song is currently playing.');
    } else {
      player.stop();
      queue.length = 0;
      connection.destroy();
      connection = null;
      player = null;
      message.reply('Music stopped.');
    }
  } else if (command === 'skip') {
    if (!player) {
      message.reply('No song is currently playing.');
    } else {
      playNext();
      message.reply('Skipping to the next song.');
    }
  } else if (command === 'queue') {
    if (queue.length === 0) {
      message.reply('The queue is empty.');
    } else {
      const queueList = queue.map((song, index) => `${index + 1}. ${song.title}`);
      message.reply(`Current queue:\n${queueList.join('\n')}`);
    }
  }
});

client.on('voiceStateUpdate', (oldState, newState) => {
  if (newState.member.id === client.user.id) {
    // Bot joined a new channel
    if (newState.channel) {
      currentGuild = newState.guild;
      connection = joinVoiceChannel({
        channelId: newState.channel.id,
        guildId: newState.guild.id,
        adapterCreator: newState.guild.voiceAdapterCreator,
      });
    } else {
      // Bot left a channel
      connection.destroy();
      connection = null;
      player = null;
      queue.length = 0;
    }
  }
});

async function playNext() {
  if (queue.length === 0) {
    if (connection) {
      connection.destroy();
      connection = null;
      player = null;
    }
    return;
  }

  const songInfo = queue.shift();
  if (!connection) {
    message.reply('Join a voice channel first!');
    return;
  }

  const stream = ytdl(songInfo.url, { filter: 'audioonly', quality: 'highestaudio' });
  const resource = createAudioResource(stream, { inlineVolume: true, inputType: StreamType.Opus });
  player = createAudioPlayer();

  player.on('error', (error) => {
    console.error('Error playing song:', error);
    message.reply('There was an error playing the song.');
    playNext();
  });

  player.on('idle', () => {
    playNext();
  });

  connection.subscribe(player);
  player.play(resource);
  message.reply(`Now playing: ${songInfo.title}`);
}

async function getSongInfo(query) {
  let songInfo;
  if (ytdl.validateURL(query)) {
    songInfo = await getYouTubeSongInfo(query);
  } else {
    songInfo = await searchYouTube(query);
  }
  return songInfo;
}

async function getYouTubeSongInfo(url) {
  const info = await ytdl.getInfo(url);
  return {
    title: info.videoDetails.title,
    url: url,
  };
}

async function searchYouTube(query) {
  const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${query}&key=${youtubeApiKey}`;
  const response = await fetch(searchUrl);
  const data = await response.json();
  return {
    title: data.items[0].snippet.title,
    url: `https://www.youtube.com/watch?v=${data.items[0].id.videoId}`,
  };
}

client.login(token);
```