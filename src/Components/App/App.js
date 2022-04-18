import React from "react"
import './App.css';
import {SearchBar} from "../SearchBar/SearchBar"
import {SearchResults} from "../SearchResults/SearchResults"
import {Playlist} from "../Playlist/Playlist"

import Spotify from "../../util/Spotify"

 class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            searchResults: [],
            playlistName: 'my playlist',
            playlistTracks: []
        }
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.updatePlaylistName = this.updatePlaylistName.bind(this)
        this.savePlaylist = this.savePlaylist.bind(this)
        this.search = this.search.bind(this)
    }

    addTrack(newTrack){
        if(this.state.playlistTracks.find(track => track.id === newTrack.id)){
            return
        }
        this.setState({playlistTracks: [...this.state.playlistTracks, newTrack]})
    }

    removeTrack(trackToRemove){
        const cleanedPlaylist =  this.state.playlistTracks.filter(track => track.id !== trackToRemove.id)
        this.setState({playlistTracks: cleanedPlaylist})
    }

    updatePlaylistName(newName){
        this.setState({playlistName: newName})
    }

    async savePlaylist(){
        const uri = this.state.playlistTracks.map(track => track.uri)
        await Spotify.savePlaylist(this.state.playlistName, uri)
        this.setState(
            {
                playlistName: '',
                playlistTracks: []
            }
        )
    }

    async search(searchTerm){
        const searchResults = await Spotify.search(searchTerm)
        this.setState({searchResults: searchResults})
    }

    render(){
        return (
            <div>

                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                            onSearch={this.search}
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
        )
    }
}

export default App;
