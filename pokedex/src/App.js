import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './App.css';

function NavButton({ pokeid, prevPage, nextPage }) {
  return (
    <div >
      <Row>
        <Col>{(pokeid - 1) ? <Button variant="light" onClick={prevPage}>Previous</Button> : ''}</Col>
        <Col>{(pokeid < 805) && <Button variant="light" onClick={nextPage}>Next</Button>}</Col>
      </Row>
    </div>
  );
}

function App() {
  //const [pokemons, setPokemons] = useState({}); // TODO: Obtain image sprite from this json object
  const [pokeid, setPokeid] = useState(Math.floor(Math.random() * 777));
  const [pokeTypes, setPokeTypes] = useState([]);
  const [height, setHeight] = useState(0);
  const [weight, setWeight] = useState(0);
  const [baseExp, setBaseExp] = useState(0);
  const [pokeName, setPokeName] = useState('');
  const [image, setImage] = useState('');
  const [abilities, setAbilities] = useState('');
  const [evos, setEvos] = useState('');
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    hp: '',
    attack: '',
    defense: '',
    speed: '',
    specialAttack: '',
    specialDefense: '',
  })
  const endpoint = 'https://pokeapi.co/api/v2/pokemon';

  // async function getData(){
  //   const api = axios.create({
  //     baseURL: endpoint,
  //   });
  //   await api.get(`${endpoint}/${pokeid}`).then((res) => {
  //     setLoading(false);
  //     //console.log(res.data);
  //     setPokemons(res.data.sprites.front_default);
  //     setImage(res.data.sprites.front_default);
  //     setPokeName(res.data.name);
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // };

  async function getData() {
    setLoading(false);
    const api = await axios.get(`${endpoint}/${pokeid}`);
    const pokeName = api.data.name;
    const image = api.data.sprites.front_default;
    const types = api.data.types.map((type) => type.type.name);
    const height = api.data.height;
    const weight = api.data.weight;
    const baseExp = api.data.base_experience;
    let { Hp, Attack, Defense, Speed, SpecialAttack, SpecialDefense } = '';
    api.data.stats.map((stat) => {
      switch (stat.stat.name) {
        case "hp":
          Hp = stat["base_stat"];
          break;
        case "attack":
          Attack = stat["base_stat"];
          break;
        case "defense":
          Defense = stat["base_stat"];
          break;
        case "speed":
          Speed = stat["base_stat"];
          break;
        case "special-attack":
          SpecialAttack = stat["base_stat"];
          break;
        case "special-defense":
          SpecialDefense = stat["base_stat"];
          break;
        default:
          return;
      }
    });

    // map out the abilities name and manipulate array so that it's easier to work with
    const abilities = api.data.abilities.map((ability) => {
      return ability.ability.name.toLowerCase().split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ');
    });

    // map out the EVs
    const evos = api.data.stats.filter((stat) => {
      if (stat.effort > 0) return true;
      return false;
    }).map((stat) => {
      return `${stat.effort} ${stat.stat.name.toLowerCase().split('-').map((s) => s.charAt(0).toUpperCase() + s.substring(1)).join(' ')}`;
    }).join(', ');

    setImage(image);
    setPokeName(pokeName);
    setPokeTypes(types);
    setHeight(height);
    setWeight(weight);
    setBaseExp(baseExp);
    setAbilities(abilities);
    setEvos(evos);
    setStats({
      hp: Hp,
      attack: Attack,
      defense: Defense,
      speed: Speed,
      specialAttack: SpecialAttack,
      specialDefense: SpecialDefense,
    });
  }

  useEffect(() => {
    getData();
  }, [pokeid]); // useEffect hook will re-render when the pokeid state changes

  function gotoNextPage() {
    setPokeid(pokeid + 1);
  };

  function gotoPrevPage() {
    setPokeid(pokeid - 1);
  };

  if (loading) return 'loading page...';

  return (
    <Container fluid>
      {/* TODO: Implement a search and filter feature (TOP PRIORITY) 
          TODO: Clean up UI/UX and make it more pleasant to view   */}
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Pokédex ReactJS</Navbar.Brand>
        <Nav className="mr-auto">
          {/* insert Nav Links here */}
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Catch 'em all " className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>
      <Row>
        <Col>
          <h5>Featured Pokémon</h5>
          <Row xs="auto">
            <Col>
              <Card className="text-center" bg="dark" text='white'>
                <Card.Text>HP: {stats.hp}</Card.Text>
                <Card.Text>ATK: {stats.attack}</Card.Text>
                <Card.Text>DEF: {stats.defense}</Card.Text>
                <Card.Text>SPD: {stats.speed}</Card.Text>
                <Card.Text>SPATK: {stats.specialAttack}</Card.Text>
                <Card.Text>SPDEF: {stats.specialDefense}</Card.Text>
              </Card>
            </Col>
          </Row>
          <hr />
          <Row xs="auto">
            <Col>
              <Card className="text-center" bg="dark" text='white'>
                <Card.Text>EVs: {evos}</Card.Text>
              </Card>
            </Col>
          </Row>
        </Col>
        <Col>
          <Card className="text-center" bg="dark" text='white'>
            <Card.Img variant="top" src={image} style={{ width: '17rem', margin: 'auto' }} alt={pokeName} />
            <Card.Body>
              <Card.Text as="h4">{pokeid} - {pokeName.toUpperCase()}</Card.Text>
              <Card.Text>{pokeTypes}</Card.Text>
              <Card.Text>Height: {height} | Weight: {weight}</Card.Text>
              <Card.Text>Base Experience: {baseExp} </Card.Text>
              <Card.Text>{abilities} </Card.Text>
              <NavButton pokeid={pokeid} prevPage={gotoPrevPage} nextPage={gotoNextPage} />
            </Card.Body>
            <Card.Footer as="small">Created by Roid. Pokémon and Pokémon character names are trademarks of Nintendo.</Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );

}

export default App;
