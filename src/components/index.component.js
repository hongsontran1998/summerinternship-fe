import React, {Component} from 'react';
import axios from 'axios';
import TableRow from './TableRow';
import 'react-awesome-slider/dist/styles.css';
import {Link} from 'react-router-dom';

export default class Index extends Component {

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      totalPages: 0,
      totalElements: 0,
      numberOfElements: 0,
      pageNumber: 0,
    };
  }

  componentDidMount() {
    const params = new URLSearchParams(this.props.location.search);
    let page = params.get('page');
    if (page == null) page = 1;
    const offset = (page - 1) * 4;
    axios
      .get('http://localhost:8081/api/category', {
        params: {
          sort_by: 'id',
          direction: 'desc',
          offset: offset,
          limit: 4,
        }
      })
      .then(response => {
        let data = response.data.data;
        console.log(data);
        this.setState({
          categories: data.content,
          totalPages: data.totalPages,  //tổng số trang
          totalElements: data.totalElements,  //tổng số phần tử của tất cả trang
          numberOfElements: data.numberOfElements,  //tổng số phần tử trang hiện tại
          pageNumber: data.pageable.pageNumber
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  onDelete = (categoryId) => {
    axios
      .delete('http://localhost:8081/api/category/' + categoryId)
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
  };


  render() {
    let list = this.state.categories.map((category, i) => {
      return <TableRow obj={category} ordinalNumber={i + 1} key={i} onDelete={this.onDelete}/>;
    });
    // const slider = (
    //   <AwesomeSlider cssModule={AwsSliderStyles}>
    //     <div><img src="https://media.gettyimages.com/photos/lionel-messi-of-barcelona-celebrates-scoring-
    //       his-sides-first-goal-picture-id846141966?s=2048x2048" alt=""/></div>
    //     <div><img
    //       src="https://media.gettyimages.com/photos/lionel-messi-of-barcelona-celebrates-scoring-his-sides-first-goal-picture-id846141966?s=2048x2048"
    //       alt=""/></div>
    //     <div><img
    //       src="https://media.gettyimages.com/photos/lionel-messi-of-barcelona-celebrates-scoring-his-sides-first-goal-picture-id846141966?s=2048x2048"
    //       alt=""/></div>
    //   </AwesomeSlider>
    // );

    let pageItems = [];
    for (let i = 0; i < this.state.totalPages; i++) {
      pageItems.push(i);
    }
    let pageNumberItems = pageItems.map((value, index) => {
      return (
        <li className={'page-item ' + (this.state.pageNumber === value ? 'active' : '')} key={index}>
          {/*<a className="page-link" href="#">{value + 1}</a>*/}
          <Link to={'/index?page=' + (value + 1)} className="page-link" id={value}
                onClick={this.onSwitchPage}>{value + 1}</Link>
        </li>
      );
    });
    return (
      <div className="container">
        {/*{slider}*/}
        <div className="row">
          <div className="col-sm-12">
            <table className="table table-striped" style={{marginTop: 20}}>
              <thead>
              <tr>
                <th>#</th>
                <th>Id</th>
                <th>Name</th>
                <th className="text-right">Action</th>
              </tr>
              </thead>
              <tbody>
              {list}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            Showing {this.state.pageNumber * 4 + 1} to {this.state.pageNumber * 4 + this.state.numberOfElements} of {this.state.totalElements} entries
          </div>
          <div className="col-sm-6">
            <nav aria-label="Page navigation" className="d-flex justify-content-end">
              <ul className="pagination">
                <li className={'page-item ' + (this.state.pageNumber === 0 ? 'disabled' : '')}>
                  <Link to={'/index?page=' + (this.state.pageNumber)}
                        className="page-link" aria-label="Previous"
                        id={this.state.pageNumber - 1}
                        onClick={this.onSwitchPage}>
                    <span aria-hidden="true">&laquo;</span>
                    <span className="sr-only">Previous</span>
                  </Link>
                </li>
                {pageNumberItems}
                <li className={'page-item ' + (this.state.pageNumber + 1 === this.state.totalPages ? 'disabled' : '')}>
                  <Link to={'/index?page=' + (this.state.pageNumber + 2)}
                        className="page-link" aria-label="Next"
                        id={this.state.pageNumber + 1}
                        onClick={this.onSwitchPage}>
                    <span aria-hidden="true">&raquo;</span>
                    <span className="sr-only">Next</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }

  onSwitchPage = (event) => {
    let pageNumber = event.target.id;
    const offset = pageNumber * 4;
    axios
      .get('http://localhost:8081/api/category', {
        params: {
          sort_by: 'id',
          direction: 'desc',
          offset: offset,
          limit: 4,
        }
      })
      .then(response => {
        let data = response.data.data;
        this.setState({
          categories: data.content,
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          numberOfElements: data.numberOfElements,
          pageNumber: data.pageable.pageNumber,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}