import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

class TableRow extends Component {

  onDelete = () => {
    this.props.onDelete(this.props.obj.id);
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.obj.name}
        </td>
        <td>
          <Link to={"/edit/" + this.props.obj.id} className="btn btn-primary btn-sm">Edit</Link>
        </td>
        <td>
          <button onClick={this.onDelete} className="btn btn-danger btn-sm">Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;