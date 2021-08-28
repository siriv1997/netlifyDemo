import React, { Component } from 'react';
import axios from "axios";
import Userdaata from '../read/read';




export default class AddUser extends Component {
    constructor(props){
        super(props)
        this.state ={
            name:"",
            email:""
        }
        this.userInput = this.userInput.bind(this);
        this.SignUp  = this.SignUp.bind(this);
    }

    userInput(e){
        if(e.target.name === 'name')
        {
            this.setState({ name:e.target.value})
        }
        else if(e.target.name === 'email')
        {
            this.setState({ email:e.target.value})
        }
    }
    
    SignUp(event){
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name: `${this.state.name}`,email:`${this.state.email}` })
        };
        fetch('/.netlify/functions/create', requestOptions)
            .then(response => response.json(
                console.log(response)
            ))
            .then(data =>{
                alert("Successfully Created")
                window.location.reload();
            })
        }

    render() {
      return(
          <div>
              <h3>React CRUD using FAUNA</h3>
              <center>
                <div className="form-group col-md-4">
                    <input type="text" className="form-control"  value={this.state.name} placeholder="Enter Name" onChange={e=>this.userInput(e)} name='name' />
                </div>
                <div className="form-group col-md-4 mt-3">
                    <input type="email" className="form-control"  value={this.state.email} placeholder="Enter Email" onChange={e=>this.userInput(e)} name='email' />
                </div>
                    <button type="submit" className="btn btn-primary mt-5" onClick={ e=>this.SignUp(e)}>Submit</button>
                </center>
          </div>
      )
    }
  }