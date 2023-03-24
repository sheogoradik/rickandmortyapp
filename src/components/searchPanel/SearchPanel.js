import {Component} from 'react';

import './searchPanel.css';

class SearchPanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: JSON.parse(localStorage.getItem('term'))
        }
    }

    onUpdateSearch = (e) => {
        const term = e.target.value;

        this.setState({
            term: term
        })

        this.props.onUpdateSearch(term);
    }

    render() {
        return (
            <div className="search-character">
                <input
                    type="text"
                    name="search-character"
                    placeholder="Filter by name..."
                    value={this.state.term}
                    onChange={this.onUpdateSearch}
                />
            </div>
        );
    }
}

export default SearchPanel;