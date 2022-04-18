import React from "react"
import './Track.css'

export class Track extends React.Component {
    constructor(props) {
        super(props)
        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
    }

    addTrack(){
        this.props.onAdd(this.props.track)
    }

    removeTrack(){
        this.props.onRemove(this.props.track)
    }

    render() {
        const mode = {
            handlerMethod: this.props.isRemoval ? this.removeTrack : this.addTrack,
            icon: this.props.isRemoval ? '-' : '+'
        }

        const {name, artist, album} = this.props.track
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{name}</h3>
                    <p>{artist} | {album}</p>
                </div>
                <button onClick={mode.handlerMethod} className="Track-action">{mode.icon}</button>
            </div>
        )
    }
}