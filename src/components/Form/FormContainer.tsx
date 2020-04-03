import React, { Component, ChangeEvent, FormEvent } from 'react';
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
  make: string;
  model: string;
  color: string;
  plate: string;
  [key: string]: string;
}

interface Props {
  onSubmitForm: (e: FormEvent<HTMLFormElement>, filterState: {}) => void;
}

const selects: string[] = ['make', 'model', 'year'];

class Form extends Component<Props, State> {
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
    if (event.target.value) {
      if (id === "year") {
        this.setState({
          ...this.state,
          [id]: event.target.value,
          make: "",
          model: "",
        });
      } else if (id === "make") {
        this.setState({
          ...this.state,
          [id]: event.target.value,
          model: "",
        });
      } else {
        this.setState({
          ...this.state,
          [id]: event.target.value,
        });
      }
    }
  }

  getOptions = (id: string): JSX.Element[] | undefined => {
    if (id === "year"){
      let options: JSX.Element[] = [<option value="" disabled>Year</option>];
      let years: string[] = Object.keys(carsCascading);
      years.map((year, i) => options.push(<option key={i + 1} value={year}>{year}</option>));
      options.push(<option value="other">Other</option>);
      if (options) return options;
    }
    if (id === "make") {
      if (this.state.year && this.state.year !== "other") {
        let options: JSX.Element[] = [<option value="">Make</option>];
        let makers: string[] = Object.keys(carsCascading[this.state.year]);
        makers.map((make, i) => options.push(<option key={i + 1} value={make}>{make}</option>));
        options.push(<option value="other">Other</option>);
        if (options) return options;
      } else {
        let options: JSX.Element[] = [<option value="" disabled>Make</option>];
        if (options) return options;
      }
    }
    if (id === "model") {
      if (this.state.make && this.state.make !== "other" && this.state.year && this.state.year !== "other"){
        let options: JSX.Element[] = [<option value="">Model</option>];
        console.log(this.state.year, this.state.make);
        let models: string[] = carsCascading[this.state.year][this.state.make];
        models.map((model, i) => options.push(<option key={i + 1} value={model}>{model}</option>));
        options.push(<option value="other">Other</option>);
        if (options) return options;
      } else {
        let options: JSX.Element[] = [<option value="" disabled>Model</option>];
        if (options) return options;
      }
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

              <form onSubmit={(e) => this.props.onSubmitForm(e, this.state)}>
                {inputsHTML}
                <button type="submit">Submit</button>
              </form>
          </div>
      );
  }
}

export default Form;
