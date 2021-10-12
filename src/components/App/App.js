import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "To workout",
      playlistTracks: [
        {
          id: 1,
          name: "Name of the song",
          artist: "Name of the artist",
          album: "Name of the album",
          uri: "uri example",
        },
      ],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    if (
      this.playlistTracks.filter((song) => song.id === track.id).length() === 0
    ) {
      this.setState((prevState) => {
        return {
          playlistTracks: [...prevState.playlistTracks, track],
        };
      });
    }
  }
  removeTrack(track) {
    this.setState((prevState) =>
      prevState.playlistTracks.filter((song) => song.id !== track.id)
    );
  }
  updatePlaylistName(name) {
    this.setState((prevState) => (prevState.playlistName = name));
  }
  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map((track) => track.uri);
  }
  search(term) {
    this.setState((prevState) => {
      return {
        searchResults: Spotify.search(term),
      };
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              state={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
