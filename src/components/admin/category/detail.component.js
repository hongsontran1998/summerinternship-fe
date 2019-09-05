import React, {Component} from 'react';
import axios from 'axios/index';

export default class Detail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      category: {
        name: '',
        slug: '',
      },
    }
  }

  componentDidMount() {
    let slug = this.props.match.params.slug;
    axios
      .get(`http://localhost:8081/api/category/slug/${slug}`)
      .then(response => {
        this.setState({
          category: response.data.data
        });
        console.log(this.state.category)
      })
      .catch(function (error) {
        console.log(error);
      })
  }


  render() {
    return (
      <div style={{marginTop: 10}}>
        <h3>Name: {this.state.category.name}</h3>
        <h3>Name: {this.state.category.slug}</h3>
        <h3>Id: {this.state.category.id}</h3>
      </div>
    )
  }
}