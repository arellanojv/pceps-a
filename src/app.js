import React from 'react';
import { Header, PurchaseRequestForm } from './components';
import 'bootswatch/dist/lux/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="row">
        <div className="col-md-12">
          <PurchaseRequestForm />
        </div>
      </div>
    </div>
  );
}

export default App;
