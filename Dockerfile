```dockerfile
# Use Node.js as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Expose the port for the Discord bot
EXPOSE 3000

# Set environment variables
ENV DISCORD_TOKEN=${DISCORD_TOKEN} \
    YOUTUBE_API_KEY=${YOUTUBE_API_KEY} \
    SPOTIFY_CLIENT_ID=${SPOTIFY_CLIENT_ID} \
    SPOTIFY_CLIENT_SECRET=${SPOTIFY_CLIENT_SECRET} \
    SOUNDCLOUD_CLIENT_ID=${SOUNDCLOUD_CLIENT_ID} \
    SOUNDCLOUD_CLIENT_SECRET=${SOUNDCLOUD_CLIENT_SECRET} \
    GENIUS_API_KEY=${GENIUS_API_KEY} \
    DATABASE_URL=${DATABASE_URL}

# Start the bot
CMD ["npm", "start"]
```