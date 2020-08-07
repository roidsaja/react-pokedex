import React, { useState, useContext } from 'react';
import { AppContext } from '../AppContext';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

function NavBar() {
    const [query, setQuery] = useState('');
    const { setActive, setQueryTerm } = useContext(AppContext);

    function handleSubmit(e) {
        e.preventDefault();
        if (query) {
            setActive(false);
        } else {
            setActive(true);
        }
        setQueryTerm(query);
    }

    function handleChange(e) {
        setQuery(e.target.value);
    }

    return (
        <Navbar bg="dark" variant="dark">
            <Navbar.Brand href="#home">Pokédex ReactJS</Navbar.Brand>
            <Nav className="mr-auto">
                {/* insert Nav Links here */}
            </Nav>
            <Form inline={handleSubmit}>
                <FormControl type="text" placeholder="Catch 'em all " className="mr-sm-2"  onChange={handleChange} value={query}/>
                <Button variant="outline-info">Search</Button>
            </Form>
        </Navbar>
    )
}

export default NavBar;