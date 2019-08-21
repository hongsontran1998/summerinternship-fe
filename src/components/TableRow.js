import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class TableRow extends Component {

  onDelete = () => {
    this.props.onDelete(this.props.obj.id);
  }

  render() {
    return (
      <tr>
        <td>
          {this.props.ordinalNumber}
        </td>
        <td>
          {this.props.obj.id}
        </td>
        <td>
          {this.props.obj.name}
        </td>
        <td className="text-right">
          <Link to={"/edit/" + this.props.obj.id} className="btn btn-primary btn-sm">Edit</Link>
          <button onClick={this.onDelete} className="btn btn-danger btn-sm ml-2">Delete</button>
        </td>
      </tr>
    );
  }
}

export default TableRow;