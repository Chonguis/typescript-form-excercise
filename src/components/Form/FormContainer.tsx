import React, { Component, ChangeEvent } from 'react';

interface State {
  cars: {year: number; make: string; model: string}[],
  inputValues: {id: string; label: string, type?: string}[],
  
  firstName: string | null,
  lastName: string | null,
  phone: string | null,
  year: string | null,
  make: string | null,
  model: string | null,
  color: string | null,
  plate: string | null,
}

const selectors: string[] = ['make', 'model', 'year'];

class Form extends Component<{}, State> {
  constructor(props: any){
    super(props);

    this.state = {
      cars: [
        {year:2020, make:'Acura', model:'TLX'},
        {year:2020, make:'Acura', model:'RDX'},
        {year:2020, make:'Toyota', model:'Yaris'},
        {year:2020, make:'Toyota', model:'Corolla'},
        {year:2019, make:'Toyota', model:'Camry'},
        {year:2019, make:'BMW', model:'2 SERIES'},
        {year:2019, make:'BMW', model:'3 SERIES'},
      ],
      inputValues: [
        {id: 'firstName', label: 'First Name', type: 'text'},
        {id: 'lastName', label: 'Last Name', type: 'text'},
        {id: 'phone', label: 'Phone' , type: 'phonenumber'},
        {id: 'year', label: 'Year' , type: 'number'},
        {id: 'make', label: 'Make'},
        {id: 'model', label: 'Model'},
        {id: 'color', label: 'Color', type: 'text'},
        {id: 'plate', label: 'Plate', type: 'number'},      
      ],
      firstName: '',
      lastName: '',
      phone: '',
      year: '',
      make: '',
      model: '',
      plate: '',
      color: '',
    }
  }

  onChangeHandler = (event: ChangeEvent<HTMLInputElement>, id: string):void => {
    console.log(event.target.value, id, typeof event.target.value, typeof id);
    let stateObj = this.state;
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
  }

  render() {

    let inputs: JSX.Element[] = [];
    
    let inputHTML = this.state.inputValues.map(inputValue => {
      !selectors.includes(inputValue.id) ? 
        inputs.push(
          <div>
              <label htmlFor={inputValue.id}>{inputValue.label}</label>
              {/* <span>{...this.state[inputValue.id]}</span> */}
              <br />
              <input type={inputValue.type} id={inputValue.id} onChange={(e) => this.onChangeHandler(e, inputValue.id)} /><br /><br />
          </div>
        ) : 
        inputs.push(
          <div>
            <label htmlFor={inputValue.id}>{inputValue.label}</label><br />
            <select id={inputValue.id} >
              
            </select>
          </div>)
      })
    console.log('inputArray', inputs);

      return (
          <div>
              <p>Hello</p>

              {inputs}
          </div>
      );
  }
}

export default Form;
