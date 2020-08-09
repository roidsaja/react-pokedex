import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function PokemonCard({ name, url }) {
    const [img, setImg] = useState('');
    const [backimg, setBackimg] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [stats, setStats] = useState([]);
    const [types, setTypes] = useState([]);
    const [errorcheck, setErrorCheck] = useState(false);
    let typesList = [];

    useEffect(() => {
        axios.get(url)
            .then((res) => {
                setImg(res.data.sprites.front_default);
                setBackimg(res.data.sprites.back_default);
                setWeight(res.data.weight);
                setHeight(res.data.height);
                setStats(res.data.stats);
                const TypesArray = res.data.types;
                TypesArray.map((type) => {
                    typesList.push(type.type.name);
                    return type;
                });
                setTypes(typesList);
            })
            .catch((error) => {
                console.log(error);
                setErrorCheck(true);
            })
    }, [url]);

    return (
        <>
            <div>
                {errorcheck ?
                    (
                        <Card className="text-center" bg="dark" text="white">
                            <Card.Text>Can't Find Pokemon :(</Card.Text>
                        </Card>
                    ) : (
                        <Card className="text-center" bg="dark" text="white" style={{ width: "18rem" }}>
                            <Card.Header>{name.toUpperCase()}</Card.Header>
                            <Card.Body>
                                <span>
                                    <Card.Img variant="top" src={img} alt={name} style={{ width: "12rem", margin: "auto" }} />
                                    <Card.Img variant="top" src={backimg} alt={name} style={{ width: "12rem", margin: "auto" }} />
                                </span>
                                {types.map((typeName, index) => (
                                    <Card.Text key={index} style={{ margin: '10px' }}>{typeName}</Card.Text>
                                ))}
                                <Card.Text>Height: {height}</Card.Text>
                                <Card.Text>Weight: {weight}</Card.Text>
                                {stats.map((stat, index) => (
                                    <Card.Text key={index} style={{ margin: '10px' }}>{stat.stat.name}: {stat.base_stat}</Card.Text>
                                ))}
                            </Card.Body>
                        </Card>
                    )
                }
            </div>
        </>
    )
}

// React.memo() is a higher order function, here it is wrapping around the function PokemonCard
// It will export and create a version that only renders upon any changes to the prop {name, url} and useStates
export default React.memo(PokemonCard);