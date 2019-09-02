import React, { Component } from 'react';
import axios from 'axios';
import { Alert } from 'reactstrap';

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      message: '',
    }
  }
  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  };
  componentDidMount() {
    let id = this.props.match.params.id;
    axios
      .get(`http://localhost:8081/api/category/${id}`)
      .then(response => {
        this.setState({
          name: response.data.data.name
        });
      })
      .catch(function (error) {
        console.log(error);
      })
  }
  onSubmit = (e) => {
    e.preventDefault();
    const obj = {
      id: this.props.match.params.id,
      name: this.state.name,
    };
    axios
      .put('http://localhost:8081/api/category', obj)
      .then(res => {
        let message = res.data.message;
        let category = res.data.data;
        if (category) {
          this.setState({
            name: category.name
          });
          this.props.history.goBack();
        } else {
          this.setState({
            message: message
          });
        }
      });
  };

  render = () => {
    return (
      <div style={{ marginTop: 10 }}>
        <h3>Edit Category</h3>
          <Alert color="danger" isOpen={this.state.message !== ''}>
            Please enter correct input
          </Alert>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">n

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
            <input type="submit" value="Edit" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}