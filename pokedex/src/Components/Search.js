import React, {useContext} from 'react';
import PokemonCard from './PokemonCard';
import {AppContext} from '../AppContext';

function Search(){
    const {queryTerm} = useContext(AppContext);
    const name = queryTerm.toLowerCase();
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`;
    return <PokemonCard name={name} url={url} />;
}

export default Search;