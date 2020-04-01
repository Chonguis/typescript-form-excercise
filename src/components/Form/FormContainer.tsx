import React, { Component, ChangeEvent } from 'react';
import './FormContainer.css';

const cars = [
  {year:"2020", make:'Acura', model:'TLX'},
  {year:"2020", make:'Acura', model:'RDX'},
  {year:"2020", make:'Toyota', model:'Yaris'},
  {year:"2020", make:'Toyota', model:'Corolla'},
  {year:"2019", make:'Toyota', model:'Camry'},
  {year:"2019", make:'BMW', model:'2 SERIES'},
  {year:"2019", make:'BMW', model:'3 SERIES'},
];
const carsCascading: {
  [key: string]: {
    [key: string]: string[];
  };
} = {
  "2020": {
    "Acura": ["TLX", "RDX"],
    "Toyota": ["Yaris", "Corolla"],
  },
  "2019": {
    "BMW": ["2 SERIES", "3 SERIES"],
    "Toyota": ["Camry"],
  },
};
const inputsData = [
  {id: 'firstName', label: 'First Name', type: 'text'},
  {id: 'lastName', label: 'Last Name', type: 'text'},
  {id: 'phone', label: 'Phone' , type: 'phonenumber'},
  {id: 'year', label: 'Year' , type: 'number'},
  {id: 'make', label: 'Make'},
  {id: 'model', label: 'Model'},
  {id: 'color', label: 'Color', type: 'text'},
  {id: 'plate', label: 'Plate', type: 'number'},      
];

interface State {
  firstName: string;
  lastName: string;
  phone: string;
  year: string;
  make: string,
  model: string,
  color: string,
  plate: string,
  [key: string]: string,
}

const selects: string[] = ['make', 'model', 'year'];

class Form extends Component<{}, State> {
  constructor(props: any){
    super(props);

    this.state = {
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

  onChangeInput = (event: ChangeEvent<HTMLInputElement>, id: string):void => {
    this.setState({
      ...this.state,
      [id]: event.target.value,
    });
  }

  onChangeSelect = (event: ChangeEvent<HTMLSelectElement>, id: string):void => {
    if (id == "year") {
      this.setState({
        ...this.state,
        [id]: event.target.value,
        make: carsCascading[event.target.value][this.state.make] ? this.state.make : Object.keys(carsCascading[event.target.value])[0],
      });
    } else {
      this.setState({
        ...this.state,
        [id]: event.target.value,
      });
    }
  }

  getOptions = (id: string): JSX.Element[] | undefined => {
    let options: JSX.Element[] = [];
    if (id === "year"){
      options.push(<option disabled value=''></option>);
      let years: string[] = Object.keys(carsCascading);
      years.map((year, i) => options.push(<option key={i} value={year}>{year}</option>));
      if (options) return options;
    }
    if (id === "make" && this.state.year) {
      let makers: string[] = Object.keys(carsCascading[this.state.year]);
      makers.map((make, i) => options.push(<option key={i} value={make}>{make}</option>));
      if (options) return options;
    }
    if (id === "model" && this.state.make) {
      let models: string[] = carsCascading[this.state.year][this.state.make];
      models.map((model, i) => options.push(<option key={i} value={model}>{model}</option>));
      if (options) return options;
    }
  }

  render() {

    let inputsHTML: JSX.Element[] = [];
    
    inputsData.forEach(data => {
      if(!selects.includes(data.id)) {
        inputsHTML.push(
          <div>
            <label htmlFor={data.id}>{data.label}</label>
            <br />
            <input type={data.type} id={data.id} onChange={(e) => this.onChangeInput(e, data.id)} />
            <span>{this.state[data.id]}</span>
            <br /><br />
          </div>
        )
      } else {
        inputsHTML.push(
          <div>
            <label htmlFor={data.id}>{data.label}</label>
            <br />
            <select id={data.id} onChange={(e) => this.onChangeSelect(e, data.id)} value={this.state[data.id]}>
              {this.getOptions(data.id)}
            </select>
          </div>)
      }
      })

      return (
          <div className="container">
              <p>Hello</p>

              {inputsHTML}
          </div>
      );
  }
}

export default Form;
