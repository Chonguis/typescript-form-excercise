import React, { FormEvent } from 'react';
import './App.css';
import Form from './components/Form/FormContainer';
import SubmittedFormPanel from './components/SubmittedFormPanel/SubmittedFormPanel';

interface State {
  submitted: boolean;
  formState: {};
}

class App extends React.Component<{}, State> {
  constructor(props: any){
    super(props);

    this.state = {
      submitted: false,
      formState: {},
    }
  }

  onSubmitForm = (e: FormEvent<HTMLFormElement>, formState: {}) => {
    e.preventDefault();
    this.setState({
      submitted: true,
      formState: formState,
    });
    console.log(formState, 'formState');
  } 
  render(){
    return (
      <div className="App">
        <header className="App-header">
            Learn React
        </header>
  
        <Form onSubmitForm={this.onSubmitForm} />
        <SubmittedFormPanel formState={this.state.formState} />
      </div>
    );
  }
}

export default App;
