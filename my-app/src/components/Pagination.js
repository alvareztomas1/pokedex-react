import { Button, Col, Container, Row } from "react-bootstrap";

const Pagination = ({ page, totalPages, onChange, goButtonOnClick, backButtonOnClick, selectedPokemon }) => {
    return (
        <>
            {!selectedPokemon &&
                <Container id="pagination">
                    <Row className="justify-content-center justify-content-md-center align-items-center">
                        <Col xs={2} sm={2} md={2} lg={1}>
                            <Button onClick={backButtonOnClick} variant="outline-dark" id="back-button">Back</Button>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={2}>
                            <input type="number" value={page} onChange={onChange} className='form-control text-center' id="page-number"></input>
                        </Col>
                        <Col xs={1} sm={1} md={1} lg={1}>
                            <h4 id="total-pages" className='title'>{totalPages}</h4>
                        </Col>
                        <Col xs={2} sm={2} md={2} lg={1}>
                            <Button variant="outline-dark" onClick={goButtonOnClick} id="next-button">Go </Button>
                        </Col>
                    </Row>
                </Container>
            }
        </>


    );
};

export default Pagination;