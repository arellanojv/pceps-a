import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import { useData } from './data-contex';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Form } from '../elements/form';
import { Input } from '../elements/input';

const schema = yup.object().shape({
  firstName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'First name should not contain numbers')
    .required('First name is required field'),
  lastName: yup
    .string()
    .matches(/^([^0-9]*)$/, 'Last name should not contain numbers')
    .required('Last name is required field'),
});

export default function Step1() {
  const {setValues, data} = useData();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: { firstName: data.firstName, lastName: data.lastName },
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const onSubmit = (data) => {
    history.push('./step2');
    setValues(data)
  };

  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1>The Ultimate Form Challenge</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2> 👺 Step 1 👺 </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            ref={register}
            id="firstName"
            name="firstName"
            type="text"
            label="First Name"
            error={!!errors.firstName}
            helperText={errors?.firstName?.message}
          />
          <Input
            ref={register}
            id="lastName"
            name="lastName"
            type="text"
            label="Last Name"
            error={!!errors.lastName}
            helperText={errors?.lastName?.message}
          />
          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Container>
    </>
  );
}
