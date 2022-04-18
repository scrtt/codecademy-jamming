import React from "react"
import './TrackList.css'
import {Track} from "../Track/Track"

export class TrackList extends React.Component {
    render() {
        const renderTracks = (tracks) => tracks && tracks.map(t =>{
            return (
                <Track
                    key={t.id}
                    isRemoval={this.props.isRemoval}
                    onAdd={this.props.onAdd}
                    onRemove={this.props.onRemove}
                    track={t}
                />
            )
        })

        return (
            <div className="TrackList">
                {renderTracks(this.props.tracks)}
            </div>
        )

    }
}
