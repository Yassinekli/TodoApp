import React, { Component } from 'react';
import $ from 'jquery'

import AddTodoModal from './AddTodoModal'

class AddTodo extends Component {
	constructor(){
		super();
		this.state = {
			showModal: false
		};
	}
	
	componentDidMount() {
		$('[data-toggle="tooltip"]').tooltip({
			placement:"left", 
			title:"Add TODO", 
			trigger:"hover", 
			delay: { 'show': 600 }
		});
	}
	
	showAddTodoModal(){
		this.setState({
			showModal: !this.state.showModal
		});
	}
	
	render() {
		return (
			<React.Fragment>
				<AddTodoModal 
					showModal={this.state.showModal} 
					addNewTodo={this.props.addNewTodo} 
					onClick={()=>this.showAddTodoModal()}
				/>
				<button 
					className="btn btn-primary float-right rounded-circle plus" 
					data-toggle="tooltip" 
					onClick={()=>this.showAddTodoModal()}
				>
					<i className="fas fa-plus"></i>
				</button>
			</React.Fragment>
		)
	}
}

export default AddTodo;
