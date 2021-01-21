import React from 'react';
import Steps from './steps';

export default function PRForm() {
  return (
    <>
      {/* <Jumbotron fluid>
        <Container>
          <h1>Contact Register</h1>
        </Container>
      </Jumbotron> */}
      {/* <Container>
        <Form>
          <Form.Group id="formGridCheckbox">
            <Form.Label>Contact Person </Form.Label>
            <Form.Check type="checkbox" label="Hide" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridFirstName">
              <Form.Label>First Name</Form.Label>
              <Form.Control type="firstname" placeholder="Juan" />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridLastName">
              <Form.Label>Last Name</Form.Label>
              <Form.Control type="lastname" placeholder="De La Cruz" />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="your@mail.com" />
          </Form.Group>

          <Form.Group controlId="formGridCompanyName">
            <Form.Label>Company Name</Form.Label>
            <Form.Control placeholder="ABC Company" />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label>City</Form.Label>
              <Form.Control />
            </Form.Group>

            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>State</Form.Label>
              <Form.Control as="select" defaultValue="Choose...">
                <option>Choose...</option>
                <option>...</option>
              </Form.Control>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control />
            </Form.Group>
          </Form.Row>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container> */}

      <Steps />
    </>
  );
}
