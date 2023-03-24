import {Component} from "react";
import {Link} from "react-router-dom";

import Spinner from "../spinner/Spinner";
import RickAndMortyService from "../../services/RickAndMortyService";

import arrow from '../../resources/img/arrow-back.png';

import './singleCharacter.css';

class SingleCharacter extends Component {
    state = {
        char: JSON.parse(localStorage.getItem('char')) || {}
    }

    rickAndMortyService = new RickAndMortyService();

    componentDidMount() {
        this.upadateChar()
    }

    upadateChar = () => {
        const {charId} = this.props;

        this.rickAndMortyService
            .getCharacter(charId)
            .then(this.onCharLoaded);
    }

    onCharLoaded = (char) => {
        this.setState({
            char: char
        });

        localStorage.setItem('char', JSON.stringify(char));
    };

    render() {
        return (
            <>
                {this.props.loading ? <Spinner/> : <View char={this.state.char}/>}
            </>
        )
    }
}

const View = ({char}) => {
    const {image, name, species, gender, status, origin, type} = char;

    return (
        <>
            <Link to="/" className="go-back"><img src={arrow} alt="arrow-ico"/>Go back</Link>
            <div className="single-character">
                <img className="single-character-img" src={image} alt="character-ico"/>
                <span className="single-character-name">{name}</span>
                <div className="informations">
                    <h4 className="informations__title">Informations</h4>
                    <ul className="informations__list">
                        <li className="informations__list-item">
                            <span className="gender">Gender</span>
                            <span className="gender-is">{gender}</span>
                        </li>
                        <li className="informations__list-item">
                            <span className="status">Status</span>
                            <span className="status-is">{status}</span>
                        </li>
                        <li className="informations__list-item">
                            <span className="specie">Specie</span>
                            <span className="specie-is">{species}</span>
                        </li>
                        <li className="informations__list-item">
                            <span className="origin">Origin</span>
                            <span className="origin-is">{origin}</span>
                        </li>
                        <li className="informations__list-item">
                            <span className="type">Type</span>
                            <span className="type-is">{type}</span>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default SingleCharacter;