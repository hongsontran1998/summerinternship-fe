import React, { Component } from 'react';
import axios from 'axios';
import TableRow from './TableRow';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: []
    };
  }
  componentDidMount() {
    axios.get('http://localhost:8081/api/category')
      .then(response => {
        this.setState({ categories: response.data.data });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onDelete = (categoryId) => {
    axios.delete('http://localhost:8081/api/category/' + categoryId)
      .then(() => {
        let idx = -1;
        let {categories} = this.state;
        categories.forEach((item, i) => {
          if (item.id === categoryId) {
            idx = i;
          }
        });
        if (idx !== -1) {
          categories.splice(idx, 1);
        }
        this.setState({
          categories: categories
        })
      })
      .catch(err => console.log(err))
  }
  render() {
    let list = this.state.categories.map((category, i) => {
      return <TableRow obj={category} key={i} onDelete={this.onDelete} />;
    });
    return (
      <div>
        <h3 align="center">Category List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Name</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}