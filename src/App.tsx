import React, { FormEvent } from 'react';
import './App.css';
import Form from './components/Form/FormContainer';

class App extends React.Component {
  constructor(props: any){
    super(props);

    this.state = {
      submitted: false,
    }
  }

  onSubmitForm = (e: FormEvent<HTMLFormElement>, formState: {}) => {
    e.preventDefault();

    console.log(formState, 'formState');

  } 
  render(){
    return (
      <div className="App">
        <header className="App-header">
            Learn React
        </header>
  
        <Form onSubmitForm={this.onSubmitForm} />
  
      </div>
    );
  }
}

export default App;
