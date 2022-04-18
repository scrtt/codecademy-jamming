import React from "react"
import './SearchBar.css'

export class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.state = { term: 'my playlistJ' +
                '' }
        this.search = this.search.bind(this)
        this.handleTermChange = this.handleTermChange.bind(this)
    }

    search(){
        this.props.onSearch(this.state.term)
    }

    handleTermChange(e){
        this.setState({term: e.target.value})
    }

    render(){
        return (
            <div className="SearchBar">
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange}
                    value={this.state.search}
                />
                <button className="SearchButton" onClick={this.search} disabled={!this.state.term}>SEARCH</button>
            </div>
        )
    }
}