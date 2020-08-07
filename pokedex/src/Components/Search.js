import React, {useContext} from 'react';
import PokemonCard from './PokemonCard';
import {AppContext} from '../AppContext';

function Search(){
    const {query} = useContext(AppContext);
    const name = query.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return <PokemonCard name={name} url={url} />;
}

export default Search;