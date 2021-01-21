import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import { Form } from '../elements/form';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from './data-contex';
import { FileInput } from '../elements/file-input';

export default function Step3() {
  const history = useHistory()
  const { setValues, data  } = useData();
  const { control, handleSubmit } = useForm({
    defaultValues: {
      files: data.files
    }
  })

  const onSubmit = (data) => {
    history.push("./result");
    setValues(data);
  };

  console.log(data)
  
  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1>The Ultimate Form Challenge</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2> 👺 Step 3 👺 </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FileInput name="files" control={control} />
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Container>
    </>
  )
}
