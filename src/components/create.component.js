import React, { Component } from 'react';
import axios from 'axios';

export default class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }
  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name]: value
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      name: this.state.name,
    };
    axios.post('http://localhost:8081/api/category', obj)
      .then(res => {
        let message = res.data.message;
        let category = res.data.data;
        if (category) {
          this.setState({
            name: category.name
          });
        } else {
          console.log(message); 
        }
      });
  }

  render() {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Add New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Category Name:  </label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}