import {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";

import Banner from '../banner/Banner';
import SearchPanel from '../searchPanel/SearchPanel';
import CharactersList from "../charactersList/CharactersList";
import SingleCharacter from "../singleCharacter/SingleCharacter";
import RickAndMortyService from "../../services/RickAndMortyService";

class App extends Component {
    state = {
        charList: [],
        term: JSON.parse(localStorage.getItem('term')) || '',
        loading: true,
        selectedChar: null
    };

    rickAndMortyService = new RickAndMortyService();

    componentDidMount() {
        this.onRequest();
    }

    onCharSelected = (id) => {
        this.setState({
            selectedChar: id
        })
    }

    onRequest = () => {
        this.rickAndMortyService
            .getAllCharacters()
            .then(this.onCharListLoaded)
    }

    onCharListLoaded = (charList) => {
        charList.sort(function (a, b) {
            if (a.name > b.name) {
                return 1;
            }

            if (a.name < b.name) {
                return -1;
            }

            return 0;
        });

        this.setState({
            charList: charList,
            loading: false
        });
    };

    searchChar = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.toLowerCase().indexOf(term.toLowerCase()) > -1;
        })
    }

    onUpdateSearch = (term) => {
        this.setState({
            term: term
        })

        localStorage.setItem('term', JSON.stringify(term));
    }

    render() {
        const {charList, term, loading, selectedChar} = this.state;
        const visibleChars = this.searchChar(charList, term);

        return (
            <div className="app">
                <div className="container">
                    <Router>
                        <Switch>
                            <Route exact path="/">
                                <Banner/>
                                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                                <CharactersList onCharSelected={this.onCharSelected}
                                                loading={loading}
                                                charList={visibleChars}/>
                            </Route>
                            <Route exact path="/character">
                                <SingleCharacter loading={loading} charId={selectedChar}/>
                            </Route>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

export default App;