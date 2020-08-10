import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

function Pagination({ prevPage, nextPage }) {
    return (
        <div >
            <Row>
                <Col>{prevPage ? <Button variant="light" onClick={prevPage}>Previous</Button> : <Button variant="light" onClick={prevPage} disabled>Previous</Button>}</Col>
                <Col>{nextPage ? <Button variant="light" onClick={nextPage}>Next</Button> : <Button variant="light" onClick={nextPage} disabled>Next</Button>}</Col>
            </Row>
        </div>
    );
}

export default Pagination;