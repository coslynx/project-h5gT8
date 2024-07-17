```javascript
const sqlite3 = require('better-sqlite3');

class Database {
  constructor(dbPath) {
    this.db = new sqlite3(dbPath, { verbose: console.log });
    this.createTables();
  }

  createTables() {
    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS playlists (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL,
        songs TEXT NOT NULL
      )
    `).run();

    this.db.prepare(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        discordId TEXT UNIQUE NOT NULL,
        preferences TEXT NOT NULL
      )
    `).run();
  }

  getPlaylists() {
    return this.db.prepare('SELECT * FROM playlists').all();
  }

  getPlaylistByName(name) {
    return this.db.prepare('SELECT * FROM playlists WHERE name = ?').get(name);
  }

  createPlaylist(name) {
    return this.db.prepare('INSERT INTO playlists (name, songs) VALUES (?, ?)').run(name, '[]');
  }

  addSongToPlaylist(playlistName, songData) {
    const playlist = this.getPlaylistByName(playlistName);

    if (playlist) {
      const songs = JSON.parse(playlist.songs);
      songs.push(songData);
      this.db.prepare('UPDATE playlists SET songs = ? WHERE name = ?').run(JSON.stringify(songs), playlistName);
    }
  }

  removeSongFromPlaylist(playlistName, songTitleOrIndex) {
    const playlist = this.getPlaylistByName(playlistName);

    if (playlist) {
      const songs = JSON.parse(playlist.songs);
      const songIndex = typeof songTitleOrIndex === 'string' ? songs.findIndex(song => song.title === songTitleOrIndex) : songTitleOrIndex;

      if (songIndex !== -1) {
        songs.splice(songIndex, 1);
        this.db.prepare('UPDATE playlists SET songs = ? WHERE name = ?').run(JSON.stringify(songs), playlistName);
      }
    }
  }

  getUser(discordId) {
    return this.db.prepare('SELECT * FROM users WHERE discordId = ?').get(discordId);
  }

  createUser(discordId) {
    return this.db.prepare('INSERT INTO users (discordId, preferences) VALUES (?, ?)').run(discordId, '{}');
  }

  updateUserPreferences(discordId, preferences) {
    return this.db.prepare('UPDATE users SET preferences = ? WHERE discordId = ?').run(JSON.stringify(preferences), discordId);
  }
}

module.exports = Database;
```