import {Component} from "react";
import {Link} from "react-router-dom";

import Spinner from "../spinner/Spinner";

import './charactersList.css';

class CharactersList extends Component {
    renderItems = (arr) => {
        const items = arr.map(item => {
            return (
                <li key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
                    <Link className="characters-list__item" to="/character">
                        <img src={item.image} alt="character-ico"/>
                        <div className="character-info">
                            <span className="character-name">{item.name}</span>
                            <span className="character-race">{item.species}</span>
                        </div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="characters-list">
                {items}
            </ul>
        )
    }

    render() {
        const {charList, loading} = this.props;
        const renderedChars = this.renderItems(charList);

        return (
            <>
                {loading ? <Spinner/> : renderedChars}
            </>
        );
    }
}

export default CharactersList;