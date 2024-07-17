# Discord Music Bot

This repository contains the source code for a Discord music bot built with Node.js and Discord.js. The bot allows users to play music, manage playlists, control playback, and enjoy a seamless music experience within their Discord servers.

## Features

* **Music Playback:** Play music from YouTube, Spotify, and SoundCloud.
* **Playlist Management:** Create, edit, and save playlists.
* **Queue System:** Manage the order of songs to be played.
* **Volume Control:** Adjust music volume to your liking.
* **Lyrics Display:** Display real-time lyrics for the currently playing song.
* **Crossfade:** Enjoy smooth transitions between songs.
* **Custom Commands:** Define your own commands for music actions.
* **User-Friendly Interface:** Intuitive commands and clear feedback.

## Getting Started

1. **Prerequisites:**
   * Node.js and npm installed on your system.
   * A Discord bot account with permissions to access voice channels and manage messages.

2. **Setup:**
   * Clone this repository: `git clone <repository URL>`
   * Navigate to the project directory: `cd discord-bot`
   * Install dependencies: `npm install`
   * Create a `.env` file in the project root and add the following environment variables:
      ```
      DISCORD_TOKEN=<your bot token>
      YOUTUBE_API_KEY=<your YouTube API key>
      SPOTIFY_CLIENT_ID=<your Spotify Client ID>
      SPOTIFY_CLIENT_SECRET=<your Spotify Client Secret>
      SOUNDCLOUD_CLIENT_ID=<your SoundCloud Client ID>
      SOUNDCLOUD_CLIENT_SECRET=<your SoundCloud Client Secret>
      GENIUS_API_KEY=<your Genius API key>
      ```
   * Replace the placeholder values with your actual API keys and bot token.

3. **Running the Bot:**
   * Start the bot using: `npm start`

## Contributing

Contributions are welcome! If you find a bug, have a feature request, or want to improve the code, please follow these steps:

1. Fork the repository.
2. Create a new branch for your changes.
3. Make your changes and commit them with a clear message.
4. Push your changes to your fork.
5. Create a pull request to the main repository.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

## Credits

This project utilizes several external libraries and APIs:

* Discord.js: For interacting with the Discord API.
* ytdl-core: For YouTube music streaming.
* node-spotify-api: For Spotify music streaming.
* soundcloud: For SoundCloud music streaming.
* genius-lyrics: For fetching lyrics from Genius.
* dotenv: For managing environment variables.
* other packages: Refer to `package.json` for a complete list.

## Disclaimer

This bot is provided as-is and without warranty. Use it at your own risk. I am not responsible for any damage or loss caused by using this bot.