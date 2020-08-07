import React, { useState, useMemo } from 'react';
import './App.css';
import PokemonList from './Components/PokemonList';
import {AppContext} from './AppContext';
import Search from './Components/Search';
import NavBar from './Components/NavBar';

function App() {
  const [active, setActive] = useState(true);
  const [query, setQuery] = useState('');
  const ProviderValue = useMemo(() => ({
    active, setActive, query, setQuery
  }),
  [active, setActive, query, setQuery]);

  return(
    <div className='App'>
      <AppContext.Provider value ={ProviderValue}>
        <title>Pokedex ReactJS</title>
        <NavBar />
        {active ? <PokemonList /> : <Search />}
      </AppContext.Provider>
    </div>
  );
}

export default App;
