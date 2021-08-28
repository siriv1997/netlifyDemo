import React, { Component } from 'react'
import ReactTable from "react-table";  
import Datatable from "react-bs-datatable";
import EditPopUP from '../model/model';
// import Pagination from "react-js-pagination";

export default class Userdaata extends Component {
    componentDidMount(){
      this.fetchAll();
    }
    constructor(props){
        super(props)
        this.header = [];
        this.state = { 
          data:[],
          activePage:1,
          showRelatePopup:false,
          selectedFiles:[]
        }
        this.fetchAll = this.fetchAll.bind(this);
        this.items = this.items.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.onDelete = this.onDelete.bind(this);
    }
    fetchAll(){
        fetch('/.netlify/functions/fetchAll')
        .then(response => response.json())
        .then(data => {
           this.setState({data:data})
        });
    }

    items(e,item)
    {
      this.setState({ showRelatePopup: true,selectedFiles:item });
    }

    onDelete(e,item)
    {
      console.log(item.ref['@ref'].id,'id')
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id:`${item.ref['@ref'].id}` })
      };
      fetch('/.netlify/functions/delete',requestOptions)
      .then(response => response.json())
      .then(data => {
        alert("Successfully Deleted")
        window.location.reload();
      });
    }
    
    handleClose = (event) => {
      this.setState({
        showRelatePopup:false
      });
    }

  render() {
    const customLabels = {
      first: "<<",
      last: ">>",
      prev: "prev",
      next: "next",
      show: "Display",
      entries: "rows",
      noResults: "There is no data available"
    };
    const header = [
        { title: "Name", prop: "name" },
        { title: "Email", prop: "email" },
        { title: "Actions", prop: "actions" }
    ];
    let userData;
    let name='';
    let Email = '';
    let Actions=[];
    userData = this.state.data.length>0
    ? 
      this.state.data.map((item, i) => {
        // console.log(item,'item')
      if(item.data['name'])
      {
        name=item.data['name'];
      }
      if(item.data['email'])
      {
        Email=item.data['email']
      }
      Actions=[
        <button value={item.data['email']} className='btn btn-danger' onClick={e => this.items(e, item)}>Edit</button>,
        <button value={item.data['email']} className='btn btn-danger m-2' onClick={e => this.onDelete(e, item)}>Delete</button>
      ]
      return {
        name:name,
        email:Email,
        actions:Actions
      };
      }):"";

    return (
          <div className={"table table-responsive"}>
            {this.state.showRelatePopup && (
              <EditPopUP
                show={this.state.showRelatePopup}
                onHide={this.handleClose}
                selectedFiles={this.state.selectedFiles}
              />
            )}
            {this.state.data.length > 0 && (
              <Datatable
                tableHeaders={header}
                tableBody={userData}
                keyName="crudtable"
                rowsPerPageOption={10}
                tableClass="striped hover responsive tablecolor relateAlign"
                initialSort={{ prop: "name", isAscending: true }}
                labels={customLabels}
              />
            )}
          </div>
    )
  }
}
