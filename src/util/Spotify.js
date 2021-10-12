let accessToken = null;
let expiresIn = null;
const clientID = "e1ec99d416694690bd9e517b2b513abc";
const redirectURI = "http://localhost:3000/";
const authorizeURI = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    accessToken = window.location.href.match(/access_token=([^&]*)/);
    expiresIn = window.location.href.match(/expires_in=([^&]*)/);
    if (accessToken && expiresIn) {
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
    }
    if (!accessToken) {
      window.location(authorizeURI);
    }
  },
  search(term) {
    const url = `https://api.spotify.com/v1/search?type=track&q=${term}`;
    fetch(url, {
      headers: { Authorization: `Bearer ${accessToken}` },
    })
      .then((response) => response.json())
      .then((response) => {
        return response.map((track) => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        }));
      });
  },
};

export default Spotify;
