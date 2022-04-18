

let accessToken = ''
const redirectUri = 'http://localhost:3000/'
const clientId = 'b65e89ab0eec461eb9e662b548346ee1'

const apiBase = 'https://api.spotify.com/v1/'

const Spotify = {
    getAccessToken(){
        if(accessToken){
            return accessToken
        }

        const matches = {
            accessToken: window.location.href.match(/access_token=([^&]*)/),
            expiresIn: window.location.href.match(/expires_in=([^&]*)/)
        }

        if(matches.accessToken && matches.expiresIn) {
            accessToken = matches.accessToken[1]
            const expiresIn = Number(matches.expiresIn[1])
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/');
            return accessToken
        } else {
            window.location = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`
        }

    },

    async search(usersTerm){
        const headers = { Authorization: `Bearer ${Spotify.getAccessToken()}` }
        const endpoint = `search?type=track&q=${usersTerm}`
        const urlToFetch = apiBase + endpoint
        return fetch(urlToFetch, {headers})
            .then(response => response.json())
            .then(jsonResponse => {
                if(!jsonResponse.tracks){
                    return []
                }
                return jsonResponse.tracks.items.map(track => {
                    return {
                        id: track.id,
                        artist: track.artists[0].name,
                        album: track.album.name,
                        name: track.name,
                        uri: track.uri
                    }
                })
            })
            .catch(e => 'Search failed!')
    },


    async savePlaylist(playlistName, trackUris){
        if(!playlistName || !trackUris){
            return
        }
        const token = `Bearer ${Spotify.getAccessToken()}`
        const contentType = "application/json"

        let userId = await fetch(apiBase + 'me', {
            headers: {Authorization: token}
        })
            .then(response => response.json())
            .then(jsonResponse => jsonResponse.id)
            .catch(e => console.log('Failed to get user Id'))

        let playlistId = await fetch(apiBase + `users/${userId}/playlists`, {
            headers: {
                Authorization: token,
                'Content-Type': contentType
            },
            method: 'POST',
            body: JSON.stringify({name: playlistName})
        })
            .then(response => response.json())
            .then(jsonResponse => jsonResponse.id)
            .catch(e => console.log('Failed to create a new playlist'))

        await fetch(apiBase + `playlists/${playlistId}/tracks`, {
            headers: {
                Authorization: token,
                'Content-Type': contentType
            },
            method: 'POST',
            body: JSON.stringify({uris: trackUris})
        })
            .then((response) => {
                console.log("Tracks successfully added to playlist");
            })
            .catch(e => console.log('Failed to add tracks to playlist'))
    }
}

export default Spotify