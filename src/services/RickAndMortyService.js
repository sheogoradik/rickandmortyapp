class RickAndMortyServices {
    getResource = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource('https://rickandmortyapi.com/api/character');
        return res.results.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const res = await this.getResource(`https://rickandmortyapi.com/api/character/${id}`);
        return this._transformCharacter(res);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            image: char.image,
            name: char.name,
            species: char.species,
            gender: char.gender,
            status: char.status,
            origin: char.origin.name,
            type: char.type
        }
    }
}

export default RickAndMortyServices;