import React, { Component } from 'react';

class AddTodoForm extends Component {

	render() {
		let modalContainerClassNames = "modal-container";

		if(this.props.showModal)
			modalContainerClassNames += " show-modal";
		
		return (
			<div className={modalContainerClassNames} onClick={(e)=>{if(e.target.classList[0] === "modal-container")this.props.onClick();}}>
				<div className="modal-form">
					<div className="modal-head">
						<span className="modal-close"><i className="far fa-times-circle"></i></span>
						<h4>Add a task</h4>
					</div>
					<hr/>
					<div className="modal-input clearfix">
						<input type="text" className="form-control input-title" id="todoTitle"></input>
						<button className="btn btn-primary btn-add">Add</button>
					</div>
				</div>
			</div>
		)
	}
}

export default AddTodoForm;
