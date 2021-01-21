import React from 'react';
import Form from './form';

export default function Contact() {
  return (
    <>
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-4 text-center">Contact Register</h1>
        </div>
      </div>
      <div className="row">
        <div className="col-md-5">
          <Form />
        </div>
        <div className="col-md-7">
          <div>list of contacts</div>
        </div>
      </div>
    </>
  );
}
