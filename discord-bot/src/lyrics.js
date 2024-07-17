```javascript
const { Client } = require('genius-lyrics');

const GENIUS_ACCESS_TOKEN = process.env.GENIUS_ACCESS_TOKEN;

const genius = new Client(GENIUS_ACCESS_TOKEN);

async function getLyrics(songTitle, artistName) {
  try {
    const song = await genius.songs.search(songTitle, { artist: artistName });

    if (!song) {
      return null;
    }

    const lyrics = await song.lyrics();
    return lyrics;
  } catch (error) {
    console.error(`Error fetching lyrics for ${songTitle} by ${artistName}:`, error);
    return null;
  }
}

module.exports = {
  getLyrics,
};

```