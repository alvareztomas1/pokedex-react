import { Button, Col, Container, Row } from "react-bootstrap";
import TotalPages from "./pagination/TotalPages";
import PageSelector from "./pagination/PageSelector";

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
                            <PageSelector page={page} onChange={onChange} />                            
                        </Col>
                        <Col xs={1} sm={1} md={1} lg={1}>
                            <TotalPages totalPages={totalPages} />
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