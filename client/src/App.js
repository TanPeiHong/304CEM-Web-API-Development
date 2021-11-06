import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import ReactTable from 'react-table-6';
import 'react-table-6/react-table.css';
import {
  Button,
  Form,
  FormGroup,
  InputGroup,
} from 'reactstrap';

class App extends Component {
  constructor() {
    super();
    this.state = {
      foods: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //For display all the foods
  getAllFoods = () => {
    axios.get('/getAllFoods').then((result) => {
      this.setState({ foods: result.data });
      console.log(this.state.foods);
    })
    
    .catch((error) => {
      console.log(error);
    });
  };
  
  componentDidMount() {
    this.getAllFoods();
  }

  //For add the food (Form)
  handleSubmit(e) {
    e.preventDefault();
    
    const query = `/addFood?title=${this.input.value}`;
    
    console.log(query);

    axios.get(query).then((result) => {
      console.log(result);
      if (result.data === "Not found"){
        //Display the alert message
        alert("Food Not Found!");
      }
      this.getAllFoods();
    })

    .catch((error) => {
      //Display the alert message
      alert("Please enter the Food title!");
    });
  }

  //For delete the food
  deleteFood = (value) => {
    const query = `/deleteFood?title=${value}`;
    
    axios.get(query).then((result) => {
      this.getAllFoods();
    })
    
    .catch((error) => {
      //Display the alert message
      alert("Error: ", error);
    });
  };

  render() {
    var data = this.state.foods;
    data = data.reverse();
    
    return (
      <div className="App">
        <div className="container-fluid py-2 search">
          <div className="col-sm-12">
            <h1 className="m-5 mb-0 text-center">
              Food Recipes
            </h1>
            <h3 className="m-5 mt-2 text-center">
              Let's discover some of the amazing food recipes at here!
            </h3>
            <Form className="m-5 px-5" onSubmit={this.handleSubmit}>
              <FormGroup>
                <InputGroup>
                  <input
                    type="text"
                    class="form-control"
                    placeholder="Search for food name..."
                    ref={(input) => (this.input = input)}
                  />
                  <Button type="submit" color="primary">
                    Search
                  </Button>
                </InputGroup>
              </FormGroup>
            </Form>
          </div>
        </div>
        
        <div className="container-fluid table">
          <div className="col-sm-12">
            <p />
            <ReactTable
              data={data}
              columns={[
                {
                  Header: "Food Title",
                  accessor: "title",
                  //Cell: (row) => {
                    //return (
                      //<div>
                        //<p>{row.original.title}</p>
                      //</div>
                    //);
                  //},
                },
                {
                  Header: "Food Image",
                  accessor: "image",
                  Cell: (row) => {
                    return (
                      <div>
                        <img height={150} src={row.original.image} alt="" />
                      </div>
                    );
                  },
                },
                {
                  Header: "Food Category",
                  accessor: "category",
                  //Cell: (row) => {
                    //return (
                      //<div>
                        //<p>{row.original.category}</p>
                      //</div>
                    //);
                  //},
                },
                {
                  Header: "Food Area",
                  accessor: "area",
                  //Cell: (row) => {
                    //return (
                      //<div>
                        //<p>{row.original.area}</p>
                      //</div>
                    //);
                  //},
                },
                {
                  Header: "Food Instructions",
                  accessor: "instructions",
                  style: { "white-space": "unset" },
                  //Cell: (row) => {
                    //return (
                      //<div>
                        //<p>{row.original.instructions}</p>
                      //</div>
                    //);
                  //},
                },
                {
                  Header: "Delete",
                  accessor: "title",
                  Cell: ({ value }) => (
                    <Button
                      color="danger"
                      onClick={() => {
                        this.deleteFood(value);
                      }}
                    >
                      Delete
                    </Button>
                  ),
                },
              ]}
              defaultPageSize={10}
              className="-striped -highlight"
            />
          </div>
        </div>
  
        {/*
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
        */}
      </div>
    );
  }
}

export default App;
