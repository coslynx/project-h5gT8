```javascript
const { Client } = require('soundcloud');

const { SOUNDCLOUD_CLIENT_ID, SOUNDCLOUD_CLIENT_SECRET } = process.env;

const client = new Client(SOUNDCLOUD_CLIENT_ID, SOUNDCLOUD_CLIENT_SECRET);

async function getSoundCloudTrack(query) {
  try {
    const tracks = await client.search(query);
    return tracks.collection[0];
  } catch (error) {
    console.error('Error fetching SoundCloud track:', error);
    return null;
  }
}

async function getSoundCloudTrackById(trackId) {
  try {
    const track = await client.get('/tracks/' + trackId);
    return track;
  } catch (error) {
    console.error('Error fetching SoundCloud track by ID:', error);
    return null;
  }
}

async function getSoundCloudPlaylist(playlistId) {
  try {
    const playlist = await client.get('/playlists/' + playlistId);
    return playlist;
  } catch (error) {
    console.error('Error fetching SoundCloud playlist:', error);
    return null;
  }
}

module.exports = {
  getSoundCloudTrack,
  getSoundCloudTrackById,
  getSoundCloudPlaylist,
};
```