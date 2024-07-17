```javascript
const SpotifyWebApi = require('node-spotify-api');
const dotenv = require('dotenv');

dotenv.config();

const spotify = new SpotifyWebApi({
  id: process.env.SPOTIFY_CLIENT_ID,
  secret: process.env.SPOTIFY_CLIENT_SECRET,
});

/**
 * Searches for a Spotify track based on the provided query.
 *
 * @param {string} query The search query for the track.
 * @returns {Promise<any>} A Promise that resolves with the search results or rejects with an error.
 */
const searchTrack = async (query) => {
  try {
    const data = await spotify.searchTracks(query);
    return data.tracks.items;
  } catch (error) {
    console.error('Error searching for Spotify track:', error);
    throw error;
  }
};

/**
 * Fetches details of a specific Spotify track based on its ID.
 *
 * @param {string} trackId The ID of the Spotify track.
 * @returns {Promise<any>} A Promise that resolves with the track details or rejects with an error.
 */
const getTrackDetails = async (trackId) => {
  try {
    const data = await spotify.getTrack(trackId);
    return data;
  } catch (error) {
    console.error('Error fetching Spotify track details:', error);
    throw error;
  }
};

module.exports = {
  searchTrack,
  getTrackDetails,
};

```