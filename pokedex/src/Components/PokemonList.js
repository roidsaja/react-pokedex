import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import CardDeck from 'react-bootstrap/CardDeck';
import Container from 'react-bootstrap/Container';
import Spinner from 'react-bootstrap/Spinner';
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

    if (loading) return (
        <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
        </Spinner>
    );

    return (
        <>
            <Pagination prevPage={prevPage ? PrevPage : null} nextPage={nextPage ? NextPage : null} />
            <Container fluid="sm">
                <CardDeck>
                    {pokemonList.map((pokemon, index) => {
                        let name = pokemon.name;
                        return <PokemonCard key={index} name={name} url={pokemon.url} />;
                    })}
                </CardDeck>
            </Container>
            <Pagination prevPage={prevPage ? PrevPage : null} nextPage={nextPage ? NextPage : null} />
        </>
    );
}

// React.memo() is a higher order function, here it is wrapping around the function PokemonList
// It will export and create a version that only renders upon any changes to PokemonList useStates
export default React.memo(PokemonList);