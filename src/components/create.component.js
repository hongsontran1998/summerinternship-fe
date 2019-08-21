import React, {Component} from 'react';
import axios from 'axios';

export default class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
    }
  }

  onChange = (e) => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
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
        console.log(res);
        let category = res.data.data;
        let {message} = res.data;
        if (category) {
          this.setState({
            name: category.name
          });
        } else {
          console.log(this.state);
          console.log(message);
          this.setState({
            message: message,
          });
        }
      })
      .catch(err => {
        console.log(err)
      })
    //browserHistory.push('/index');
    //this.props.history.push("/index")


  };

  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Add New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Category Name *</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={this.state.name}
              onChange={this.onChange}
            />
          </div>
          <div className="form-group">
            <input type="submit" value="Create" className="btn btn-primary"/>
          </div>
        </form>
      </div>
    )
  }
}