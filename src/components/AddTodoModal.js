import React, { Component } from 'react';

class AddTodoForm extends Component {

	componentDidUpdate(){
		if(this.props.showModal)
		{
			this.textInput.value = "";
			this.textInput.focus();
		}
	}
	
	render() {
		let modalContainerClassNames = "modal-container";

		if(this.props.showModal)
			modalContainerClassNames += " show-modal";
		
		return (
			<div className={modalContainerClassNames} onClick={(e)=>{
				if(e.target.classList[0] === "modal-container" || e.target.classList[0] === "far")
					this.props.onClick();
				}
			}
			>
				<div className="modal-form">
					<div className="modal-head">
						<span className="modal-close"><i className="far fa-times-circle"></i></span>
						<h4>Add a task</h4>
					</div>
					<hr/>
					<div className="modal-input clearfix">
						<input type="text" ref={elem=>this.textInput = elem} className="form-control input-title" id="todoTitle" autoComplete="off"></input>
						<button className="btn btn-primary btn-add" onClick={()=>this.props.addNewTodo()}>Add</button>
					</div>
				</div>
			</div>
		)
	}
}

export default AddTodoForm;
