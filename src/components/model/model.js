import React, { lazy } from "react";
import { Modal, Button } from 'react-bootstrap'

class EditPopUP extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      name:this.props.selectedFiles.data['name'],
      email:this.props.selectedFiles.data['email'],
      id:this.props.selectedFiles.ref['@ref'].id
    };
    this.onChange=this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e){
    if(e.target.name == 'userName')
    {
      this.setState({name:e.target.value})
    }
    else
    {
      this.setState({email:e.target.value})
    }
  }

  onSubmit(e)
  {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: `${this.state.name}`,email:`${this.state.email}`,id:`${this.state.id}` })
    };
    fetch('/.netlify/functions/update',requestOptions)
    .then(response => response.json())
    .then(data => {
       alert("Successfully updated")
       this.props.onHide();
       window.location.reload();
    });
  }

  render() {
    const handleClose = () => {
      this.props.onHide();
    };
    return (
      <div>
        <Modal
          backdrop="static"
          show={this.props.show}
          onHide={handleClose}
          className="PopUp"
        >
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <div className="form-group">
              <label>Name</label>
                <input 
                  type='text'
                  name='userName'
                  value={this.state.name}
                  className="form-control"
                  onChange={this.onChange}
                />
            </div>
            <div className="form-group">
              <label>Email</label>
                <input 
                  type='email'
                  name='email'
                  value={this.state.email}
                  className="form-control"
                  onChange={this.onChange}
                />
            </div>
            <button className="btn btn-primary mt-3" onClick={e => this.onSubmit(e)}>Update</button>
          </Modal.Body>
          <Modal.Footer />
        </Modal>
      </div>
    );
  }
}

export default EditPopUP;
