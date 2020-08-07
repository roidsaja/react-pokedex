import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Container from 'react-bootstrap/Container';
import PokemonCard from './PokemonCard';

function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [currPage, setCurrPage] = useState('https://pokeapi.co/api/v2/pokemon');
    const [prevPage, setPrevPage] = useState('');
    const [nextPage, setNextPage] = useState('');
    const [pageNum, setPageNum] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
        let cancel;
        axios
            .get(currPage, { cancelToken: new axios.CancelToken((c) => (cancel = c)), })
            .then((res) => {
                console.log(res);
                setLoading(false);
                setPokemonList(res.data.results);
                setPrevPage(res.data.previous);
                setNextPage(res.data.next);
            })
            .catch((error) => {
                console.log(error);
            })

        return () => {
            cancel();
        };
    }, [currPage, pageNum]);

    function NextPage() {
        setCurrPage(nextPage);
        setPageNum((prevState) => prevState + 1);
    }

    function PrevPage() {
        setCurrPage(prevPage);
        setPageNum((prevState) => prevState - 1);
    }

    if (loading) return 'loading page...';

    return (
        <>
        <div>
            {pokemonList.map((pokemon, index) => {
                let name = pokemon.name;
                return <PokemonCard key={index} name={name} url={pokemon.url} />;
            })}
            <Pagination prevPage={prevPage ? PrevPage : null} nextPage={nextPage ? NextPage : null} />
        </div>
        </>
    );
}

export default React.memo(PokemonList);