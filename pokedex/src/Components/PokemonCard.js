import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

function PokemonCard({ name, url }) {
    const [img, setImg] = useState('');
    const [backimg, setBackimg] = useState('');
    const [weight, setWeight] = useState('');
    const [height, setHeight] = useState('');
    const [stats, setStats] = useState([]);
    const [types, setTypes] = useState([]);
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
            })
    }, [url]);

    return (
        <>
            {/* <div>
                <Card className="text-center" bg="dark" text='white'>
                    <Card.Img variant="top" src={img} style={{ width: '17rem', margin: 'auto' }} alt='Pokemon' />
                    <Card.text> {types.map((typeName, index) => (
                        <h5 key={index} style={{ margin: '10px' }}>{typeName}</h5>
                    ))}
                    </Card.text>
                    <Card.text>{name}</Card.text>
                    <Card.Img variant="top" src={backimg} style={{ width: '17rem', margin: 'auto' }} alt='Pokemon' />
                    <Card.text>Weight: {weight}</Card.text>
                    <Card.text>Height: {height}</Card.text>
                    <Card.text> {stats.map((stat, index) => (
                        <p key={index} style={{ margin: '10px' }}>{stat.stat.name} : {stat.base_stat}{' '} <span style={{ fontSize: '20px' }}>|</span></p>
                    ))}
                    </Card.text>
                    <Card.text>{name}</Card.text>
                </Card>
            </div> */}
            <Card className="text-center" bg="dark" text="white">
                <Card.Img variant="top" src={img} alt='Pokemon' style={{width:"17rem", margin:"auto"}} />
            </Card>
        </>
    )
}

export default React.memo(PokemonCard);