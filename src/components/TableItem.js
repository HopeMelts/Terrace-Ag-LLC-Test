import React, { Component } from 'react';

class TableItem extends Component {
  	constructor(props) {
	    super(props);
	    this.state = {
	      name: this.props.item.name,
	      cost: this.props.item.cost,
	      edit: false
	    };
	}
	saveItem = (e) => {
		var data = {
			name: e.target.closest('.item').querySelector('.item-name').value,
			cost: e.target.closest('.item').querySelector('.item-value').value
		}
		this.props.updateRow(data);
		this.setState({
	        edit: false
	    })
	}
	deleteItem = (e) => {
		this.props.deleteRow();
	}
	editItem = (e) => {
		this.setState({
	        edit: true
		})
	}
	sendClick = (e) => {
		this.props.pushValue(this.props.item.id);
	}

  	render() {
    	return (
	      	<tr className="item">
	      		{this.props.rebuildIsActive
				    ? <td><input type="checkbox" onChange={this.sendClick} /></td>
				    : ""
				}
	      		{this.state.edit
			  		? <td><input className="item-name" defaultValue={this.props.item.name} autoFocus={true} /></td>
			      	: <td>{this.props.item.name}</td>
			     }
		    	{this.state.edit
			  		? <td><input className="item-value" defaultValue={this.props.item.cost} /></td>
			      	: <td>{this.props.item.cost}</td>
			     }
		    	<td>
			    	{this.state.edit
					  	? <button onClick={this.saveItem}>Save</button>
					  	: <button onClick={this.editItem}>Edit</button>
					}
					<button onClick={this.deleteItem}>Delete</button>
				</td>
	      	</tr>
    	);
  	}
}

export default TableItem;
