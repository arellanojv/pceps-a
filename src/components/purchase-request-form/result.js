import React from 'react';
import { Jumbotron, Container, Table } from 'react-bootstrap';
import { useData } from './data-contex';

export default function Result() {
  const { data } = useData();
  
  const entries = Object.entries(data).filter((entry) => entry[0] !== "files");
  const { files } = data;

  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1>The Ultimate Form Challenge</h1>
        </Container>
      </Jumbotron>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr key={entry[0]}>
                {console.log(entries)}
                <td>{entry[0]}</td>
                <td>{entry[1].toString()}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>  
    </>
  )
}
