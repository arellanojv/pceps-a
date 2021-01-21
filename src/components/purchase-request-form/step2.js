import React from 'react';
import { Jumbotron, Container, Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useData } from './data-contex';
import { Form } from '../elements/form';
import { Input } from '../elements/input';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { parsePhoneNumberFromString } from 'libphonenumber-js'

const normalizePhoneNumber = (value) => {
  const phoneNumber = parsePhoneNumberFromString(value)
  if(!phoneNumber){
    return value
  }

  return phoneNumber.formatInternational()
}

const schema = yup.object().shape({
  email: yup
  .string()
  .email("Email should have correct format")
  .required("Email is a required field")
})

export default function Step2() {
  const {setValues, data} = useData();
  const history = useHistory();
  const {register, handleSubmit, watch, errors} = useForm({
    defaultValues: {
      email: data.email,
      hasPhone: data.hasPhone,
      phoneNumber: data.phoneNumber
    },
    mode: "onBlur",
    resolver: yupResolver(schema)
  });
  
  const hasPhone = watch("hasPhone")

  const onSubmit = (data) => {
    history.push("./step3")
    setValues(data)
  }

  console.log(data)

  return (
    <>
      <Jumbotron fluid>
        <Container>
          <h1>The Ultimate Form Challenge</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2> 👺 Step 2 👺 </h2>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input 
            ref={register} 
            type="email" 
            label="Email" 
            name="email" 
            required 
            error={!!errors.email}
            helperText={errors?.email?.message}
          />
          
          <FormControlLabel 
            control={
              <Checkbox defaultValue={data.hasPhone} defaultChecked={data.hasPhone} color="primary" inputRef={register} name="hasPhone" />
            } 
            label="Do you have a phone?" 
          /> <br/>
          
          {hasPhone && (
            <Input ref={register} 
              id="phoneNumber" 
              type="tel" 
              label="Phone Number"
              name="phoneNumber" 
              onChange={
                (event) =>  {
                  event.target.value = normalizePhoneNumber(event.target.value)
                }
              }
            />
          )}

          <Button variant="primary" type="submit">
            Next
          </Button>
        </Form>
      </Container>
    </>
  );
}
