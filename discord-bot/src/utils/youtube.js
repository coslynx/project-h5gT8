```javascript
const fetch = require('node-fetch');
const dotenv = require('dotenv');

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

/**
 * Searches for YouTube videos based on a query.
 *
 * @param {string} query The search query.
 * @returns {Promise<Array<Object>>} An array of YouTube video objects.
 */
async function searchVideos(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(
    query
  )}&key=${YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.items.map((item) => ({
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
    }));
  } catch (error) {
    console.error('Error searching YouTube videos:', error);
    return [];
  }
}

/**
 * Fetches details of a specific YouTube video.
 *
 * @param {string} videoId The YouTube video ID.
 * @returns {Promise<Object>} A YouTube video object with details.
 */
async function getVideoDetails(videoId) {
  const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${YOUTUBE_API_KEY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    const item = data.items[0];
    return {
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.default.url,
      duration: item.contentDetails.duration,
      url: `https://www.youtube.com/watch?v=${videoId}`,
    };
  } catch (error) {
    console.error('Error fetching YouTube video details:', error);
    return null;
  }
}

module.exports = {
  searchVideos,
  getVideoDetails,
};
```