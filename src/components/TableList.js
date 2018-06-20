import React, { Component, PropTypes } from 'react';
import TableItem from "./TableItem";
import {connect} from 'react-redux';
import {addRow, deleteRow, updateRow, undo, redo, rebuildTable} from "../actions/Action";


class TableList extends Component {
	constructor(props) {
	    super(props);
	    this.state = {
	    	rebuildIsActive: false,
	    	marked: []
	    }
	}
	rebuild = () => {
		this.setState({
	      rebuildIsActive: !this.state.rebuildIsActive,
	      marked: []
	    });
	}
	save = () => {
    	this.props.rebuildTable(this.state.marked);
		this.setState({
	      rebuildIsActive: !this.state.rebuildIsActive,
	      marked: []
	    });
	}
	pushValue = (id) => {
		if (this.state.marked.includes(id)) {
			this.setState({
          		marked: this.state.marked.filter(item => item !== id)
        	});
		}
		else {
			this.setState({
          		marked: [...this.state.marked, id]
        	});
		}
	}
  	render() {
	var renderItemList = this.props.listItems.map(item =>
		<TableItem
		    item={item}
		    key={item.id}
		    deleteRow={this.props.deleteRow(item.id)}
		    updateRow={this.props.updateRow(item.id)}
		    rebuildIsActive={this.state.rebuildIsActive}
		    pushValue={this.pushValue}
		/>
	);
	
    return (
      <div>
        <table>
          	<thead>
          		<tr>
          			{this.state.rebuildIsActive ? <th id="id">id</th> : ""}
	            	<th>Item</th>
	            	<th>Cost per lb/kg</th>
          		</tr>
          		</thead>
          	<tbody>
          		{renderItemList}
         	 </tbody>
        </table>
        <div>
          	<button onClick={this.props.addRow}>Add new row</button>
          	<button onClick={this.props.undo} disabled={this.props.ifExistUndo <= 1}>Undo</button>
          	<button onClick={this.props.redo} disabled={this.props.ifExistRedo == 0}>Redo</button>
          	<button onClick={this.rebuild} disabled={this.state.rebuildIsActive || this.props.ifExistNow == 0}>Rebuild</button>
          	<button onClick={this.save} disabled={!this.state.rebuildIsActive}>Save</button>
        </div>
      </div>	
    );
  	}
}

const mapStateToProps = state => ({
	listItems: state.tableItemList.nowItemList,
	ifExistUndo: state.tableItemList.prevItemList.length,
	ifExistRedo: state.tableItemList.nextItemList.length,
	ifExistNow: state.tableItemList.nowItemList.length

});

const mapDispatchToProps = dispatch => ({
  addRow: () => dispatch(addRow()),
  deleteRow: (id) => () => dispatch(deleteRow(id)),
  updateRow: (id) => (item) => dispatch(updateRow(id, item)),
  undo: () => dispatch(undo()),
  redo: () => dispatch(redo()),
  rebuildTable: (marked) => dispatch(rebuildTable(marked))
});

export default connect(mapStateToProps, mapDispatchToProps)(TableList)